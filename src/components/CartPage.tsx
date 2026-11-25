import { Link } from 'react-router-dom';
import headphones from '../assets/optimized/headphones.webp';
import musicNotes from '../assets/optimized/music-notes.webp';
import recordNeedle from '../assets/optimized/record-needle.webp';
import recordSleeve from '../assets/optimized/record-sleeve.webp';
import { records } from '../data/records';
import { useCart } from '../lib/CartContext';
import { usePricing } from '../lib/PricingContext';
import CurrencyCountrySelector from './CurrencyCountrySelector';
import ArtistLinks from './ArtistLinks';
import RecentlyViewed from './RecentlyViewed';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { usePageTitle } from '../hooks/usePageTitle';
import RecordArtwork from './RecordArtwork';

const cartIcons = [
  { src: musicNotes, width: 1536, height: 1024 },
  { src: recordNeedle, width: 1536, height: 1024 },
  { src: headphones, width: 1312, height: 1199 },
];

export default function CartPage() {
  usePageTitle('Cart');
  const { items, removeFromCart, setQuantity } = useCart();
  const { country, formatPrice, rateStatus, isCurrencyAvailable } = usePricing();
  const recentlyViewed = useRecentlyViewed();
  const subtotalUsd = items.reduce((total, item) => {
    const record = records.find((entry) => entry.id === item.recordId);
    return total + (record?.priceUsd ?? 0) * item.quantity;
  }, 0);

  return (
    <main id="main-content" className="min-h-[calc(100svh-5rem)] bg-palette-46 px-4 py-10 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <img src={recordSleeve} alt="" width="1536" height="1024" loading="lazy" decoding="async" className="h-12 w-12 object-contain" />
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-wide text-palette-48">Your picks</p>
            <h1 tabIndex={-1} className="text-4xl font-bold lg:text-5xl">Record crate</h1>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <CurrencyCountrySelector />
          <p className="text-[0.65rem] leading-relaxed">Demo prices · {country.currency === 'USD' ? 'Shown in USD' : rateStatus === 'loading' ? `Loading ${country.currency} reference rates…` : rateStatus === 'fallback' || !isCurrencyAvailable ? `Showing USD, rates unavailable for ${country.currency}` : `Estimated in ${country.currency} using reference rates`}</p>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 border border-black bg-white p-8 lg:p-12">
            <p className="text-lg font-medium">Your crate is waiting for its first record.</p>
            <Link to="/discover" className="mt-6 inline-block min-h-11 rounded-full bg-black px-8 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-palette-31">Discover records</Link>
            <RecentlyViewed ids={recentlyViewed} />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="space-y-4">
              {items.map((item, index) => {
                const record = records.find((entry) => entry.id === item.recordId);
                if (!record) return null;
                const cartIcon = cartIcons[index % cartIcons.length];

                return (
                  <article key={item.recordId} className="flex gap-4 border border-black bg-white p-4 lg:gap-6 lg:p-5">
                    <div className={`flex h-28 w-28 shrink-0 items-center justify-center border border-black lg:h-36 lg:w-36 ${record.background}`}>
                      <RecordArtwork src={record.image} alt={`${record.title} vinyl artwork`} className="h-[90%] w-[90%] object-contain" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <p className="text-[0.65rem] font-bold uppercase tracking-wide text-stone-600"><ArtistLinks artists={record.artists} /></p>
                        <h2 className="mt-1 text-lg font-bold lg:text-xl">{record.title}</h2>
                        <p className="mt-2 text-sm font-semibold">{formatPrice(record.priceUsd)} each · {formatPrice(record.priceUsd * item.quantity)} total</p>
                        <p className="mt-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide"><img src={cartIcon.src} alt="" width={cartIcon.width} height={cartIcon.height} loading="lazy" decoding="async" className="h-5 w-5 object-contain" /> Quantity: {item.quantity}</p>
                        <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase"><span>Quantity</span><button type="button" aria-label={`Decrease ${record.title} quantity`} onClick={() => setQuantity(item.recordId, item.quantity - 1)} disabled={item.quantity <= 1} className="grid size-11 place-items-center border border-black disabled:opacity-40">−</button><span aria-live="polite" className="min-w-6 text-center">{item.quantity}</span><button type="button" aria-label={`Increase ${record.title} quantity`} onClick={() => setQuantity(item.recordId, item.quantity + 1)} disabled={item.quantity >= 10} className="grid size-11 place-items-center border border-black disabled:opacity-40">+</button></div>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.recordId)} className="mt-3 self-start text-xs font-bold uppercase underline underline-offset-4">Remove</button>
                    </div>
                  </article>
                );
              })}
            </div>
            <aside className="h-fit border border-black bg-brand-yellow p-6 text-black">
              <p className="text-xs font-bold uppercase tracking-wide">In your crate</p>
              <p className="mt-3 text-4xl font-bold">{items.reduce((total, item) => total + item.quantity, 0)}</p>
              <p className="mt-1 text-sm">{items.reduce((total, item) => total + item.quantity, 0) === 1 ? 'record' : 'records'}</p>
              <div className="mt-6 border-t border-black pt-4">
                <p className="text-xs font-bold uppercase tracking-wide">Estimated subtotal</p>
                <p className="mt-2 text-2xl font-bold">{formatPrice(subtotalUsd)}</p>
                <p className="mt-2 text-xs">Estimated shipping: {formatPrice(subtotalUsd >= 75 ? 0 : 6)}</p>
                {subtotalUsd < 75 && <div className="mt-3"><p className="text-xs">Add {formatPrice(75 - subtotalUsd)} for free demo shipping</p><div className="mt-2 h-2 border border-black" role="progressbar" aria-label="Progress toward free demo shipping" aria-valuemin={0} aria-valuemax={75} aria-valuenow={Math.min(subtotalUsd, 75)}><div className={`h-full bg-palette-21 ${subtotalUsd >= 56.25 ? 'w-3/4' : subtotalUsd >= 37.5 ? 'w-1/2' : subtotalUsd >= 18.75 ? 'w-1/4' : 'w-0'}`} /></div></div>}
                <p className="mt-3 border-t border-black pt-3 text-xs font-bold uppercase">Estimated total <span className="float-right text-base">{formatPrice(subtotalUsd + (subtotalUsd >= 75 ? 0 : 6))}</span></p>
                <p className="mt-1 text-xs">Demo store, no payment is taken.</p>
              </div>
              <Link to="/discover" className="mt-6 inline-block rounded-full bg-palette-11 px-6 py-3 text-xs font-bold uppercase tracking-wide text-black">Keep discovering</Link>
              <Link to="/checkout" className="mt-3 inline-block rounded-full bg-black px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-white">Demo checkout</Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
