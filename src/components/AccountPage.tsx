import { Link, useNavigate } from 'react-router-dom';
import { getDemoSession, signOutDemoAccount } from '../lib/demoAuth';
import { readJson } from '../lib/storage';
import { useWishlist } from '../hooks/useWishlist';
import { usePageTitle } from '../hooks/usePageTitle';

type OrderSummary = { id: string; date: string; total: number; currency?: string };
const isOrders = (value: unknown): value is OrderSummary[] => Array.isArray(value) && value.every((order) => typeof order === 'object' && order !== null && 'id' in order && typeof order.id === 'string' && 'date' in order && typeof order.date === 'string' && 'total' in order && typeof order.total === 'number');

export default function AccountPage() {
  const session = getDemoSession();
  const navigate = useNavigate();
  const wishlist = useWishlist();
  const orders = readJson<OrderSummary[]>('spindrop.orders', isOrders, []);
  usePageTitle('Account');

  if (!session) return null;

  return (
    <main id="main-content" className="mx-auto min-h-[60svh] max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
      <p className="inline-block border border-black bg-brand-yellow px-2 py-1 text-xs font-bold uppercase">Demo account</p>
      <h1 tabIndex={-1} className="mt-4 text-4xl font-bold lg:text-5xl">Hi, {session.name}</h1>
      <p className="mt-3 text-sm">{session.email}</p>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="border border-black p-6">
          <p className="text-xs font-bold uppercase">Orders</p>
          <h2 className="mt-2 text-3xl font-bold">{orders.length}</h2>
          <p className="mt-1 text-sm">Demo orders saved in this browser.</p>
          <Link to="/orders" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-black px-6 text-xs font-bold uppercase text-white">View orders</Link>
        </section>
        <section className="border border-black bg-brand-pink p-6">
          <p className="text-xs font-bold uppercase">Wishlist</p>
          <h2 className="mt-2 text-3xl font-bold">{wishlist.ids.length}</h2>
          <p className="mt-1 text-sm">Records you have saved for later.</p>
          <Link to="/wishlist" className="mt-5 inline-flex min-h-11 items-center rounded-full border-2 border-black px-6 text-xs font-bold uppercase">Open wishlist</Link>
        </section>
      </div>
      <p className="mt-8 text-sm">Demo profile stored only in this browser. This is not a real account.</p>
      <button type="button" onClick={() => { signOutDemoAccount(); navigate('/login'); }} className="mt-4 min-h-11 text-xs font-bold uppercase underline underline-offset-4">Sign out</button>
    </main>
  );
}
