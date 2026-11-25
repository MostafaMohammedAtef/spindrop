import { Link, Navigate, useParams } from 'react-router-dom';
import { readJson } from '../lib/storage';
import { usePricing } from '../lib/PricingContext';
import { usePageTitle } from '../hooks/usePageTitle';

type SavedLine = { id: string; title: string; price: number; quantity: number };
type SavedOrder = { id: string; date: string; lines: SavedLine[]; total: number; email: string; name: string; address: string };
const isOrders = (value: unknown): value is SavedOrder[] => Array.isArray(value) && value.every((order) => typeof order === 'object' && order !== null && 'id' in order && typeof order.id === 'string');

export default function DemoOrdersPage() {
  const { id } = useParams();
  const { formatPrice } = usePricing();
  usePageTitle(id ? 'Order confirmation' : 'Orders');
  let signedIn = false;
  try { signedIn = Boolean(window.localStorage.getItem('spindrop.demo.session')); } catch { signedIn = false; }
  if (!id && !signedIn) return <Navigate to="/login?next=%2Forders" replace />;
  const orders = readJson<SavedOrder[]>('spindrop.orders', isOrders, []);
  const order = id ? orders.find((entry) => entry.id === id) : undefined;
  if (id && !order) return <main className="mx-auto max-w-4xl px-6 py-12"><h1 className="text-3xl font-bold">Order not found</h1><Link to="/discover" className="mt-4 inline-block underline">Discover records</Link></main>;
  const shown = id && order ? [order] : orders;
  return <main className="mx-auto min-h-[60svh] max-w-5xl px-6 py-12"><h1 tabIndex={-1} className="text-4xl font-bold">{id ? 'Demo order confirmed' : 'Your orders'}</h1><p className="mt-3 text-sm">Demo orders are saved only in this browser. Nothing is charged or shipped.</p>{shown.length ? <div className="mt-8 space-y-5">{shown.map((entry) => <article key={entry.id} className="border border-black bg-white p-5"><p className="text-xs font-bold uppercase">Demo order · {new Date(entry.date).toLocaleDateString()}</p><p className="mt-2 text-sm">Order {entry.id.slice(0, 8)}</p><div className="mt-4 border-y border-black py-3">{entry.lines.map((line) => <p key={line.id} className="py-1 text-sm">{line.title} × {line.quantity} · {formatPrice(line.price * line.quantity)}</p>)}</div><p className="mt-3 font-bold">Total {formatPrice(entry.total)}</p>{id && <p className="mt-2 text-sm">Shipping to {entry.name}: {entry.address}</p>}</article>)}</div> : <div className="mt-8 border border-black p-8"><p>No orders yet.</p><Link to="/discover" className="mt-4 inline-block underline">Discover records</Link></div>}<Link to="/account" className="mt-6 inline-block text-xs font-bold uppercase underline">Account</Link></main>;
}
