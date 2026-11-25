import { Link, useParams } from 'react-router-dom';
import ArtistLinks from './ArtistLinks';
import { artistSlug, records } from '../data/records';
import { useCart } from '../lib/CartContext';
import { usePricing } from '../lib/PricingContext';
import { Link as RouterLink } from 'react-router-dom';
import RecordArtwork from './RecordArtwork';
import { usePageTitle } from '../hooks/usePageTitle';
import { useState } from 'react';

export default function ArtistPage() {
  const { artistSlug: requestedSlug } = useParams();
  const { addToCart, items } = useCart();
  const { formatPrice } = usePricing();
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const artists = [...new Set(records.flatMap((record) => record.artists))];
  const artist = artists.find((name) => artistSlug(name) === requestedSlug);
  const artistRecords = artist
    ? records.filter((record) => record.artists.some((name) => artistSlug(name) === requestedSlug))
    : [];
  const sortedRecords = [...artistRecords].sort((first, second) => sortOrder === 'price-asc' ? first.priceUsd - second.priceUsd : sortOrder === 'price-desc' ? second.priceUsd - first.priceUsd : 0);
  usePageTitle(artist ?? 'Artist not found');

  if (!artist) {
    return (
        <main id="main-content" className="min-h-[calc(100svh-5rem)] bg-palette-46 px-6 py-16 text-center lg:px-12">
        <h1 tabIndex={-1} className="text-3xl font-bold">Artist not found</h1>
        <Link to="/discover" className="mt-6 inline-block rounded-full bg-black px-8 py-3 text-xs font-bold uppercase tracking-wide text-white">Back to Discover</Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="bg-white text-black">
      <section className="border-b border-black bg-palette-23 px-6 py-12 lg:px-12 lg:py-20">
        <Link to="/discover" className="text-xs font-bold uppercase tracking-wide underline underline-offset-4">← Back to Discover</Link>
        <p className="mt-8 inline-block border border-black bg-white px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wide">Artist collection</p>
        <h1 tabIndex={-1} className="mt-5 text-4xl font-bold leading-tight lg:text-6xl">{artist}</h1>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4"><p className="text-sm font-medium uppercase tracking-wide">{artistRecords.length} {artistRecords.length === 1 ? 'record' : 'records'}</p><label className="flex items-center gap-3 text-xs font-bold uppercase">Sort by<select value={sortOrder} onChange={(event) => setSortOrder(event.target.value as typeof sortOrder)} className="min-h-11 border border-black bg-white px-3 text-sm font-medium normal-case"><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label></div>
      </section>

      <section className="grid grid-cols-1 border-b border-black lg:grid-cols-3">
        {sortedRecords.length === 0 ? <p className="col-span-full p-8 text-sm">No records are available for this artist yet.</p> : sortedRecords.map((record, index) => {
          const cartItem = items.find((item) => item.recordId === record.id);
          const isLastRow = index >= artistRecords.length - (artistRecords.length % 3 || 3);

          return (
            <article key={record.id} className={`flex flex-col border-b border-black p-5 lg:border-r lg:p-7 ${isLastRow ? 'lg:border-b-0' : ''} ${index % 3 === 2 ? 'lg:border-r-0' : ''}`}>
              <div className={`relative flex aspect-square items-center justify-center overflow-hidden border border-black ${record.background}`}>
                <RecordArtwork src={record.image} alt={`${record.title} vinyl record artwork`} className="h-[86%] w-[86%] object-contain drop-shadow-xl" />
              </div>
              <div className="flex flex-1 flex-col pt-5">
                <p className="text-[0.65rem] font-bold uppercase tracking-wide text-stone-600"><ArtistLinks artists={record.artists} /></p>
                <h2 className="mt-1 text-xl font-bold"><RouterLink to={`/records/${record.id}`} className="hover:underline">{record.title}</RouterLink></h2>
                <p className="mt-3 text-lg font-semibold">{formatPrice(record.priceUsd)}</p>
                <button type="button" onClick={() => addToCart(record.id)} className="mt-5 w-full rounded-full bg-black px-5 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-palette-31">
                  {cartItem ? `Add another · ${cartItem.quantity} in cart` : 'Add to cart'}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
