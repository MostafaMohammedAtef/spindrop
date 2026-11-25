import { useState } from 'react';
import { ArrowDownWideNarrow, Heart } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import { records } from '../data/records';
import { usePricing } from '../lib/PricingContext';
import CurrencyCountrySelector from './CurrencyCountrySelector';
import ArtistLinks from './ArtistLinks';
import { useWishlist } from '../hooks/useWishlist';
import { Link } from 'react-router-dom';
import RecordArtwork from './RecordArtwork';
import { usePageTitle } from '../hooks/usePageTitle';

const recordsPerPage = 18;

export default function DiscoverPage() {
  usePageTitle('Discover');
  const { addToCart, items } = useCart();
  const { formatPrice, country, rateStatus, isCurrencyAvailable } = usePricing();
  const wishlist = useWishlist();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const pageCount = Math.ceil(records.length / recordsPerPage);
  const sortedRecords = [...records].sort((first, second) => {
    if (sortOrder === 'price-asc') return first.priceUsd - second.priceUsd;
    if (sortOrder === 'price-desc') return second.priceUsd - first.priceUsd;
    return 0;
  });
  const visibleRecords = sortedRecords.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage,
  );

  return (
    <main id="main-content" className="bg-white text-black">
      <section className="relative isolate z-30 border-b border-black bg-palette-11 px-6 py-12 lg:px-12 lg:py-20">
        <div className="relative z-10">
          <p className="inline-block border border-black bg-white px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide">The Spindrop shop</p>
          <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 tabIndex={-1} className="max-w-3xl text-4xl font-bold leading-tight lg:text-6xl">Find your next favorite record.</h1>
              <p className="mt-4 max-w-xl text-sm leading-relaxed lg:text-base">Independent sounds, pressed with care. Browse the latest records from the Spindrop community.</p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <p className="text-xs font-bold uppercase tracking-wide">{records.length} records to discover</p>
              <CurrencyCountrySelector />
              <p className="text-[0.65rem] leading-relaxed">Demo prices · {country.currency === 'USD' ? 'Shown in USD' : rateStatus === 'loading' ? `Loading ${country.currency} reference rates…` : rateStatus === 'fallback' || !isCurrencyAvailable ? `Showing USD, rates unavailable for ${country.currency}` : `Estimated in ${country.currency} using reference rates`}</p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-6 right-8 z-20 lg:right-[12%]">
          <button
            type="button"
            onClick={() => setSortMenuOpen((open) => !open)}
            aria-label="Open sorting options"
            aria-expanded={sortMenuOpen}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-black bg-white shadow-sm hover:bg-palette-21"
          >
            <ArrowDownWideNarrow aria-hidden="true" size={21} strokeWidth={1.8} />
          </button>
          {sortMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 border border-black bg-white p-4 shadow-lg">
              <label className="flex flex-col gap-2 text-[0.65rem] font-bold uppercase tracking-wide">
                Sort by
                <select
                  value={sortOrder}
                  onChange={(event) => {
                    setSortOrder(event.target.value as typeof sortOrder);
                    setCurrentPage(0);
                    setSortMenuOpen(false);
                  }}
                  className="border border-black bg-white px-3 py-2 text-xs font-medium normal-case tracking-normal outline-none focus:ring-2 focus:ring-palette-21"
                  aria-label="Sort records"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </label>
            </div>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 border-b border-black lg:grid-cols-3">
        {visibleRecords.map((record, index) => {
          const cartItem = items.find((item) => item.recordId === record.id);
          const isLastRow = index >= visibleRecords.length - (visibleRecords.length % 3 || 3);

          return (
            <article key={record.id} className={`flex flex-col border-b border-black p-5 lg:border-r lg:p-7 ${isLastRow ? 'lg:border-b-0' : ''} ${index % 3 === 2 ? 'lg:border-r-0' : ''}`}>
              <div className={`relative flex aspect-square items-center justify-center overflow-hidden border border-black ${record.background}`}>
                <span className="absolute left-4 top-4 border border-black bg-white px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wide">Community press</span>
                <RecordArtwork src={record.image} smallSrc={record.smallImage} alt={`${record.title} vinyl record artwork`} className="h-[86%] w-[86%] object-contain drop-shadow-xl" loading={index === 0 ? 'eager' : 'lazy'} fetchPriority={index === 0 ? 'high' : 'auto'} />
                <button type="button" onClick={() => wishlist.toggle(record.id)} aria-label={`Save ${record.title}`} aria-pressed={wishlist.has(record.id)} className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-black bg-white"><Heart size={19} fill={wishlist.has(record.id) ? 'currentColor' : 'none'} className={wishlist.has(record.id) ? 'text-brand-pink' : ''} /></button>
                <span className="absolute bottom-4 right-4 rounded-full bg-black px-3 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-white">Side A</span>
              </div>
              <div className="flex flex-1 flex-col pt-5">
                <p className="text-[0.65rem] font-bold uppercase tracking-wide text-stone-600"><ArtistLinks artists={record.artists} /></p>
                <h2 className="mt-1 text-xl font-bold"><Link to={`/records/${record.id}`} className="underline-offset-4 hover:underline">{record.title}</Link></h2>
                <p className="mt-3 text-lg font-semibold">{formatPrice(record.priceUsd)}</p>
                <button type="button" onClick={() => addToCart(record.id)} className="mt-5 w-full rounded-full bg-black px-5 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-palette-31">
                  {cartItem ? `Add another · ${cartItem.quantity} in cart` : 'Add to cart'}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {pageCount > 1 && (
        <nav aria-label="Discover pages" className="flex items-center justify-center gap-5 border-b border-black px-6 py-8">
          <button type="button" onClick={() => setCurrentPage((page) => Math.max(0, page - 1))} disabled={currentPage === 0} className="rounded-full border border-black px-6 py-3 text-xs font-bold uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
          <span className="text-xs font-bold uppercase tracking-wide">Page {currentPage + 1} of {pageCount}</span>
          <button type="button" onClick={() => setCurrentPage((page) => Math.min(pageCount - 1, page + 1))} disabled={currentPage === pageCount - 1} className="rounded-full border border-black bg-palette-11 px-6 py-3 text-xs font-bold uppercase tracking-wide disabled:cursor-not-allowed disabled:opacity-40">Next</button>
        </nav>
      )}
    </main>
  );
}
