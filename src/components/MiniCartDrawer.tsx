import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { records } from '../data/records';
import { useCart } from '../lib/CartContext';
import { usePricing } from '../lib/PricingContext';
import Dialog from './ui/Dialog';
import RecordArtwork from './RecordArtwork';

export default function MiniCartDrawer() {
  const { items, miniCartOpen, lastAddedId, closeMiniCart } = useCart();
  const { formatPrice } = usePricing();
  const close = useCallback(() => closeMiniCart(), [closeMiniCart]);
  const lastAdded = records.find((record) => record.id === lastAddedId);
  const subtotal = items.reduce((sum, item) => {
    const record = records.find((entry) => entry.id === item.recordId);
    return sum + (record?.priceUsd ?? 0) * item.quantity;
  }, 0);

  return (
    <Dialog open={miniCartOpen} onClose={close} labelledBy="mini-cart-title" position="bottom">
      <div className="flex items-center justify-between gap-4">
        <h2 id="mini-cart-title" className="text-2xl font-bold">Added to your crate</h2>
        <button type="button" onClick={close} aria-label="Close mini cart" className="grid size-11 shrink-0 place-items-center border border-black text-xl">×</button>
      </div>
      {lastAdded && <div className="mt-5 flex items-center gap-4 border-b border-black pb-5"><div className={`grid size-20 shrink-0 place-items-center border border-black ${lastAdded.background}`}><RecordArtwork src={lastAdded.image} alt={`${lastAdded.title} artwork`} className="h-full w-full object-contain" /></div><div><p className="text-xs font-bold uppercase">Just added</p><p dir="auto" className="mt-1 font-bold">{lastAdded.title}</p><p className="text-sm">{lastAdded.artists.join(', ')}</p><p className="mt-1 text-sm font-semibold">{formatPrice(lastAdded.priceUsd)}</p></div></div>}
      <div className="mt-5 max-h-[30dvh] space-y-3 overflow-y-auto">
        {items.map((item) => {
          const record = records.find((entry) => entry.id === item.recordId);
          if (!record) return null;
          return <div key={item.recordId} className="flex justify-between gap-4 text-sm"><span className="min-w-0 truncate">{record.title} × {item.quantity}</span><span className="shrink-0">{formatPrice(record.priceUsd * item.quantity)}</span></div>;
        })}
      </div>
      <p className="mt-5 flex justify-between border-t border-black pt-4 font-bold"><span>Estimated subtotal</span><span>{formatPrice(subtotal)}</span></p>
      <p className="mt-2 text-xs">Demo store, no payment is taken.</p>
      <div className="mt-5 grid grid-cols-2 gap-3"><Link to="/cart" onClick={close} className="min-h-12 border-2 border-black px-4 py-4 text-center text-xs font-bold uppercase">View cart</Link><Link to="/checkout" onClick={close} className="min-h-12 bg-black px-4 py-4 text-center text-xs font-bold uppercase text-white">Checkout</Link></div>
    </Dialog>
  );
}
