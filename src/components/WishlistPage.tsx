import { Link } from 'react-router-dom';
import { records } from '../data/records';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../lib/CartContext';
import { usePricing } from '../lib/PricingContext';
import { usePageTitle } from '../hooks/usePageTitle';
import RecordArtwork from './RecordArtwork';

export default function WishlistPage() {
  const { ids, toggle } = useWishlist();
  const { addToCart, addManyToCart } = useCart();
  const { formatPrice } = usePricing();
  const saved = records.filter((record) => ids.includes(record.id));
  usePageTitle('Wishlist');
  function moveAllToCart() {
    addManyToCart(saved.map((record) => record.id));
  }

  return <main id="main-content" className="min-h-[60svh] px-4 py-8 lg:px-8 lg:py-12"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 tabIndex={-1} className="text-4xl font-bold">Your wishlist</h1><p className="mt-2 text-sm">{saved.length} saved {saved.length === 1 ? 'record' : 'records'}</p></div>{saved.length > 0 && <button type="button" onClick={moveAllToCart} className="min-h-11 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase text-white">Move all to cart</button>}</div>{saved.length ? <div className="mt-8 grid gap-5 lg:grid-cols-3">{saved.map((record) => <article key={record.id} className="border border-black p-4"><Link to={`/records/${record.id}`}><RecordArtwork src={record.image} alt={`${record.title} by ${record.artists.join(', ')}`} className="aspect-video w-full object-contain" /></Link><h2 dir="auto" className="mt-3 text-xl font-bold"><Link to={`/records/${record.id}`}>{record.title}</Link></h2><p>{record.artists.join(', ')}</p><p className="mt-2 font-bold">{formatPrice(record.priceUsd)}</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => addToCart(record.id)} className="min-h-11 rounded-full bg-black px-5 py-3 text-xs font-bold uppercase text-white">Add to cart</button><button type="button" onClick={() => toggle(record.id)} className="min-h-11 px-4 text-xs font-bold uppercase underline">Remove</button></div></article>)}</div> : <div className="mt-8 border border-black p-8"><p>Your saved records will be here.</p><Link to="/discover" className="mt-5 inline-block min-h-11 rounded-full bg-black px-6 py-3 text-xs font-bold uppercase text-white">Discover records</Link></div>}</div></main>;
}
