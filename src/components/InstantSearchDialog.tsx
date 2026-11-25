import { useEffect, useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { records } from '../data/records';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { usePricing } from '../lib/PricingContext';
import { rankRecords } from '../lib/search';
import { readJson, writeJson } from '../lib/storage';
import Dialog from './ui/Dialog';
import RecentlyViewed from './RecentlyViewed';
import RecordArtwork from './RecordArtwork';

const recentKey = 'spindrop.recent-searches';
const genres = [...new Set(records.map((record) => record.genre))].slice(0, 6);
const isRecentSearches = (value: unknown): value is string[] => Array.isArray(value) && value.length <= 5 && value.every((item) => typeof item === 'string' && item.length <= 80);

export default function InstantSearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState(() => readJson(recentKey, isRecentSearches, []));
  const { formatPrice } = usePricing();
  const recentlyViewed = useRecentlyViewed();
  const navigate = useNavigate();
  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(query.trim().toLowerCase()), 150);
    return () => window.clearTimeout(timer);
  }, [query]);
  const results = useMemo(() => rankRecords(records, debounced).slice(0, 6).map((result) => result.record), [debounced]);
  const activeResultIndex = Math.min(activeIndex, Math.max(results.length - 1, 0));

  function updateQuery(value: string) {
    setQuery(value);
    setActiveIndex(0);
  }

  function saveSearch(value: string) {
    const term = value.trim().slice(0, 80);
    if (!term) return;
    const next = [term, ...readJson(recentKey, isRecentSearches, []).filter((item) => item.toLowerCase() !== term.toLowerCase())].slice(0, 5);
    setRecentSearches(next);
    writeJson(recentKey, next);
  }

  function submitSearch() {
    if (!debounced) return;
    saveSearch(query);
    if (results[activeResultIndex]) navigate(`/records/${results[activeResultIndex].id}`);
    else navigate(`/discover?q=${encodeURIComponent(query.trim())}`);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} labelledBy="search-title">
      <div className="flex items-center justify-between">
        <h2 id="search-title" className="text-2xl font-bold">Search records</h2>
        <button type="button" onClick={onClose} aria-label="Close search" className="grid size-11 place-items-center"><X /></button>
      </div>
      <label htmlFor="instant-search" className="sr-only">Search records</label>
      <div className="relative mt-5">
        <Search aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2" size={19} />
        <input
          id="instant-search"
          data-autofocus="true"
          type="search"
          autoComplete="off"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => Math.min(results.length - 1, index + 1)); }
            if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(0, index - 1)); }
            if (event.key === 'Enter') { event.preventDefault(); submitSearch(); }
          }}
          placeholder="Artist, record title, or genre"
          aria-controls="instant-search-results"
          aria-activedescendant={results[activeResultIndex] ? `search-result-${results[activeResultIndex].id}` : undefined}
          className="h-12 w-full rounded-full border-2 border-black pl-11 pr-4"
        />
      </div>
      <div className="mt-3 min-h-5 text-xs" aria-live="polite">
        {debounced && `${results.length} ${results.length === 1 ? 'record' : 'records'} shown`}
      </div>
      <div id="instant-search-results" role="listbox" aria-label="Search results" className="mt-1 max-h-[45dvh] overflow-y-auto">
        {results.map((record, index) => (
          <Link
            id={`search-result-${record.id}`}
            role="option"
            aria-selected={activeResultIndex === index}
            key={record.id}
            to={`/records/${record.id}`}
            onClick={() => { saveSearch(query); onClose(); }}
            className={`flex items-center gap-3 border-b border-black/20 p-3 hover:bg-brand-yellow ${activeResultIndex === index ? 'bg-brand-yellow' : ''}`}
          >
            <RecordArtwork src={record.image} alt="" width={72} height={56} className="h-14 w-16 object-contain" />
            <span className="min-w-0 flex-1">
              <span dir="auto" className="block truncate text-sm font-bold">{record.title}</span>
              <span className="block truncate text-xs">{record.artists.join(', ')} · {record.genre}</span>
            </span>
            <span className="text-xs font-bold">{formatPrice(record.priceUsd)}</span>
          </Link>
        ))}
      </div>
      {!debounced && (
        <section aria-label="Popular genres" className="mt-4">
          <p className="text-xs font-bold uppercase">Explore a genre</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {genres.map((genre) => <button key={genre} type="button" onClick={() => updateQuery(genre)} className="min-h-11 rounded-full border border-black px-4 text-xs font-bold uppercase hover:bg-brand-yellow">{genre}</button>)}
          </div>
          {recentSearches.length > 0 && (
            <div className="mt-5 border-t border-black pt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase">Recent searches</p>
                <button type="button" onClick={() => { setRecentSearches([]); writeJson(recentKey, []); }} className="min-h-11 text-xs font-bold uppercase underline">Clear</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {recentSearches.map((term) => <button key={term} type="button" onClick={() => updateQuery(term)} className="min-h-11 border border-black px-3 text-xs">{term}</button>)}
              </div>
            </div>
          )}
        </section>
      )}
      {debounced && results.length === 0 && <><p className="p-4 text-sm">No records found. Try a different artist, title, or genre.</p><RecentlyViewed ids={recentlyViewed} /></>}
      {!debounced && <RecentlyViewed ids={recentlyViewed} />}
      {debounced && <Link to={`/discover?q=${encodeURIComponent(query.trim())}`} onClick={() => { saveSearch(query); onClose(); }} className="mt-4 inline-flex min-h-11 items-center text-xs font-bold uppercase underline">See all results</Link>}
    </Dialog>
  );
}
