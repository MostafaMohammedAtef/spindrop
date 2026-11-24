import { Link } from 'react-router-dom';
import headphones from '../assets/icons/headphones.png';
import musicNotes from '../assets/icons/music-notes.png';
import recordNeedle from '../assets/icons/record-needle.png';
import recordSleeve from '../assets/icons/record-sleeve.png';
import { records } from '../data/records';
import { useCart } from '../lib/CartContext';
import { usePricing } from '../lib/PricingContext';
import CurrencyCountrySelector from './CurrencyCountrySelector';

const cartIcons = [musicNotes, recordNeedle, headphones];

export default function CartPage() {
  const { items, removeFromCart } = useCart();
  const { country, formatPrice, rateStatus, isCurrencyAvailable } = usePricing();
  const subtotalUsd = items.reduce((total, item) => {
    const record = records.find((entry) => entry.id === item.recordId);
    return total + (record?.priceUsd ?? 0) * item.quantity;
  }, 0);

  return (
    <main className="min-h-[calc(100svh-5rem)] bg-palette-46 px-6 py-12 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <img src={recordSleeve} alt="" className="h-12 w-12 object-contain" />
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-wide text-palette-48">Your picks</p>
            <h1 className="text-4xl font-bold lg:text-5xl">Record crate</h1>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <CurrencyCountrySelector />
          <p className="text-[0.65rem] leading-relaxed">Demo prices · {country.currency === 'USD' ? 'Shown in USD' : rateStatus === 'loading' ? 'Loading currency conversion…' : rateStatus === 'fallback' || !isCurrencyAvailable ? 'Showing USD; conversion rates unavailable' : `Estimated in ${country.currency} using reference rates`}</p>
        </div>

        {items.length === 0 ? (
          <div className="mt-10 border border-black bg-white p-8 lg:p-12">
            <p className="text-lg font-medium">Your crate is waiting for its first record.</p>
            <Link to="/discover" className="mt-6 inline-block rounded-full bg-black px-8 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-palette-31">Discover records</Link>
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
                      <img src={record.image} alt={`${record.title} vinyl artwork`} className="h-[90%] w-[90%] object-contain" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <p className="text-[0.65rem] font-bold uppercase tracking-wide text-stone-600">{record.artist}</p>
                        <h2 className="mt-1 text-lg font-bold lg:text-xl">{record.title}</h2>
                        <p className="mt-2 text-sm font-semibold">{formatPrice(record.priceUsd)} each · {formatPrice(record.priceUsd * item.quantity)} total</p>
                        <p className="mt-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide"><img src={cartIcon} alt="" className="h-5 w-5 object-contain" /> Quantity: {item.quantity}</p>
                      </div>
                      <button type="button" onClick={() => removeFromCart(item.recordId)} className="mt-3 self-start text-xs font-bold uppercase underline underline-offset-4">Remove</button>
                    </div>
                  </article>
                );
              })}
            </div>
            <aside className="h-fit border border-black bg-palette-21 p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-wide">In your crate</p>
              <p className="mt-3 text-4xl font-bold">{items.reduce((total, item) => total + item.quantity, 0)}</p>
              <p className="mt-1 text-sm">{items.reduce((total, item) => total + item.quantity, 0) === 1 ? 'record' : 'records'}</p>
              <div className="mt-6 border-t border-white/50 pt-4">
                <p className="text-xs font-bold uppercase tracking-wide">Estimated subtotal</p>
                <p className="mt-2 text-2xl font-bold">{formatPrice(subtotalUsd)}</p>
              </div>
              <Link to="/discover" className="mt-6 inline-block rounded-full bg-palette-11 px-6 py-3 text-xs font-bold uppercase tracking-wide text-black">Keep discovering</Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
