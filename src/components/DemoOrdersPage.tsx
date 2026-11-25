import { Link, useParams } from 'react-router-dom';
import { readJson } from '../lib/storage';
import { formatMoney } from '../lib/pricing';
import { usePageTitle } from '../hooks/usePageTitle';

type SavedLine = { id: string; title: string; price: number; quantity: number; currency?: string };
type SavedOrder = { id: string; date: string; lines: SavedLine[]; total: number; subtotal?: number; shipping?: number; currency?: string; locale?: string; email: string; name: string; address: string; city?: string; postalCode?: string; phone?: string };
const isOrders = (value: unknown): value is SavedOrder[] => Array.isArray(value) && value.length <= 100 && value.every((order) => typeof order === 'object' && order !== null && 'id' in order && typeof order.id === 'string' && 'date' in order && typeof order.date === 'string' && 'lines' in order && Array.isArray(order.lines) && 'total' in order && typeof order.total === 'number');

export default function DemoOrdersPage() {
  const { id } = useParams();
  usePageTitle(id ? 'Order confirmation' : 'Orders');
  const orders = readJson<SavedOrder[]>('spindrop.orders', isOrders, []);
  const order = id ? orders.find((entry) => entry.id === id) : undefined;
  if (id && !order) return <main id="main-content" className="mx-auto max-w-4xl px-6 py-12"><h1 tabIndex={-1} className="text-3xl font-bold">Demo order not found</h1><p className="mt-3 text-sm">Order details are stored only in the browser where the demo order was placed.</p><Link to="/discover" className="mt-4 inline-flex min-h-11 items-center underline">Discover records</Link></main>;
  const shown = id && order ? [order] : orders;

  return (
    <main id="main-content" className="mx-auto min-h-[60svh] max-w-5xl px-4 py-10 lg:px-8 lg:py-14">
      <h1 tabIndex={-1} className="text-4xl font-bold">{id ? 'Demo order confirmed' : 'Your orders'}</h1>
      <p className="mt-3 text-sm">Demo orders are saved only in this browser. Nothing is charged or shipped.</p>
      {shown.length ? <div className="mt-8 space-y-5">{shown.map((entry) => {
        const currency = entry.currency ?? 'USD';
        const locale = entry.locale ?? 'en-US';
        return <article key={entry.id} className="border border-black bg-white p-5 print:border-0 print:p-0"><p className="text-xs font-bold uppercase">Demo order · {new Date(entry.date).toLocaleDateString()}</p><p className="mt-2 text-sm">Order {entry.id.slice(0, 8)}</p><div className="mt-4 border-y border-black py-3 print:border-black">{entry.lines.map((line) => <p key={line.id} dir="auto" className="flex justify-between gap-4 py-1 text-sm"><span>{line.title} × {line.quantity}</span><span>{formatMoney(line.price * line.quantity, line.currency ?? currency, locale)}</span></p>)}</div><p className="mt-3 flex justify-between font-bold"><span>Estimated total</span><span>{formatMoney(entry.total, currency, locale)}</span></p>{id && <div className="mt-4 text-sm"><p>Shipping to {entry.name}</p><p>{entry.address}{entry.city ? `, ${entry.city}` : ''}{entry.postalCode ? ` ${entry.postalCode}` : ''}</p><p>{entry.email}</p></div>}</article>;
      })}</div> : <div className="mt-8 border border-black p-8"><p>No demo orders yet.</p><Link to="/discover" className="mt-4 inline-flex min-h-11 items-center underline">Discover records</Link></div>}
      <div className="mt-6 flex gap-4 print:hidden"><Link to="/account" className="inline-flex min-h-11 items-center text-xs font-bold uppercase underline">Account</Link>{id && <button type="button" onClick={() => window.print()} className="min-h-11 text-xs font-bold uppercase underline">Print order</button>}</div>
    </main>
  );
}
