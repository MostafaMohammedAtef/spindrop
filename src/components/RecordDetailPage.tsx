import { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { artistSlug, records } from '../data/records';
import { useCart } from '../lib/CartContext';
import { usePricing } from '../lib/PricingContext';
import { useWishlist } from '../hooks/useWishlist';
import { useToast } from './ToastProvider';
import NotFoundPage from './NotFoundPage';
import { usePageTitle } from '../hooks/usePageTitle';

export default function RecordDetailPage() {
  const { slug = '' } = useParams();
  const record = records.find((item) => item.id === slug || item.id === slug.replace(/-\d+$/, ''));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { formatPrice } = usePricing();
  const { has, toggle } = useWishlist();
  const toast = useToast();
  usePageTitle(record?.title ?? 'Record not found');
  if (!record) return <NotFoundPage />;
  const artist = record.artists[0] ?? 'Artist unknown';

  async function shareRecord() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: record?.title ?? 'Spindrop record', url });
      else { await navigator.clipboard.writeText(url); toast('Record link copied.'); }
    } catch {
      toast('Could not share this record.');
    }
  }

  return <main className="mx-auto grid min-h-[60svh] max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-12">
    <div className={`flex aspect-square items-center justify-center border border-black p-5 ${record.background}`}><img src={record.image} alt={`${record.title} by ${artist}, album cover and vinyl`} width="1200" height="675" className="h-full w-full object-contain" /></div>
    <section className="flex flex-col justify-center">
      <Link to={`/artists/${artistSlug(artist)}`} className="text-xs font-bold uppercase underline underline-offset-4">{artist}</Link>
      <h1 tabIndex={-1} dir="auto" className="mt-3 text-4xl font-bold lg:text-5xl">{record.title}</h1>
      <p className="mt-4 text-lg font-bold">{formatPrice(record.priceUsd)} <span className="text-xs font-normal">Demo price, no payment taken</span></p>
      <div className="mt-6 border-y border-black py-5 text-sm"><p>12 inch LP · 180g vinyl</p><p className="mt-2">Standard sleeve · Community press</p><p className="mt-2">Ships in 6 to 8 weeks</p></div>
      <div className="mt-6 flex items-center gap-3"><label className="text-xs font-bold uppercase" htmlFor="record-quantity">Quantity</label><input id="record-quantity" type="number" min="1" max="10" value={quantity} onChange={(event) => setQuantity(Math.max(1, Math.min(10, Number(event.target.value) || 1)))} className="h-11 w-20 border border-black px-3" /><button type="button" onClick={() => toggle(record.id)} aria-label={`Save ${record.title}`} aria-pressed={has(record.id)} className="grid size-11 place-items-center border border-black"><Heart fill={has(record.id) ? 'currentColor' : 'none'} className={has(record.id) ? 'text-brand-pink' : ''} /></button><button type="button" onClick={shareRecord} aria-label="Share record" className="grid size-11 place-items-center border border-black"><Share2 /></button></div>
      <button type="button" onClick={() => { for (let count = 0; count < quantity; count += 1) addToCart(record.id); }} className="mt-5 min-h-12 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-wide text-white">Add to cart</button>
    </section>
  </main>;
}
