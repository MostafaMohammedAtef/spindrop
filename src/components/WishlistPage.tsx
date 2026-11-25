import { Link } from 'react-router-dom';
import { records } from '../data/records';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../lib/CartContext';
import { usePricing } from '../lib/PricingContext';
import { usePageTitle } from '../hooks/usePageTitle';

export default function WishlistPage() {
  const { ids, toggle } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = usePricing();
  const saved = records.filter((record) => ids.includes(record.id));
  usePageTitle('Wishlist');
  return <main className="min-h-[60svh] px-4 py-8 sm:px-6 lg:px-8 lg:py-12"><div className="mx-auto max-w-7xl"><h1 tabIndex={-1} className="text-4xl font-bold">Your wishlist</h1>{saved.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{saved.map((record) => <article key={record.id} className="border border-black p-4"><Link to={`/records/${record.id}`}><img src={record.image} alt={`${record.title} by ${record.artists.join(', ')}`} width="1200" height="675" className="aspect-video w-full object-contain" /></Link><h2 className="mt-3 text-xl font-bold"><Link to={`/records/${record.id}`}>{record.title}</Link></h2><p>{record.artists.join(', ')}</p><p className="mt-2 font-bold">{formatPrice(record.priceUsd)}</p><div className="mt-4 flex gap-3"><button type="button" onClick={() => addToCart(record.id)} className="rounded-full bg-black px-5 py-3 text-xs font-bold uppercase text-white">Add to cart</button><button type="button" onClick={() => toggle(record.id)} className="px-4 text-xs font-bold uppercase underline">Remove</button></div></article>)}</div> : <div className="mt-8 border border-black p-8"><p>Your saved records will be here.</p><Link to="/discover" className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-xs font-bold uppercase text-white">Discover records</Link></div>}</div></main>;
}
