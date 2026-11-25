import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { records } from '../data/records';
import { useCart } from '../lib/CartContext';
import { usePricing } from '../lib/PricingContext';
import { readJson, writeJson } from '../lib/storage';
import { usePageTitle } from '../hooks/usePageTitle';

type Order = { id: string; date: string; lines: { id: string; title: string; price: number; quantity: number }[]; total: number; email: string; name: string; address: string };
const isOrders = (value: unknown): value is Order[] => Array.isArray(value);

export default function DemoCheckoutPage() {
  const { items, clearCart } = useCart();
  const { country, formatPrice } = usePricing();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  usePageTitle('Demo checkout');
  const lines = items.flatMap((item) => { const record = records.find((entry) => entry.id === item.recordId); return record ? [{ id: record.id, title: record.title, price: record.priceUsd, quantity: item.quantity }] : []; });
  const subtotal = lines.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (!lines.length) return <main className="mx-auto max-w-3xl px-6 py-12"><h1 className="text-3xl font-bold">Your cart is empty</h1><Link to="/cart" className="mt-5 inline-block underline">Return to cart</Link></main>;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const address = String(data.get('address') ?? '').trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || address.length < 5) { setError('Enter a valid name, email address, and shipping address.'); return; }
    const id = crypto.randomUUID();
    const order: Order = { id, date: new Date().toISOString(), lines, total: subtotal + (subtotal >= 75 ? 0 : 6), email: email.slice(0, 254), name: name.slice(0, 100), address: address.slice(0, 250) };
    const existing = readJson<Order[]>('spindrop.orders', isOrders, []);
    if (!writeJson('spindrop.orders', [order, ...existing])) { setError('Could not save your demo order in this browser.'); return; }
    void country;
    clearCart();
    navigate(`/order/${id}`);
  }
  return <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12"><p className="border border-black bg-brand-yellow p-4 text-sm font-bold">Demo checkout, no payment is taken and nothing is shipped.</p><h1 tabIndex={-1} className="mt-6 text-4xl font-bold">Shipping details</h1><form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-2"><div className="space-y-4">{[['name','Full name','text'],['email','Email address','email'],['address','Shipping address','text']].map(([name,label,type]) => <label key={name} className="block text-xs font-bold uppercase">{label}<input name={name} type={type} required autoComplete={name === 'name' ? 'name' : name === 'email' ? 'email' : 'street-address'} className="mt-2 h-12 w-full border border-black px-4 text-sm font-normal normal-case" /></label>)}{error && <p role="alert" className="text-sm text-red-700">{error}</p>}<button type="submit" className="min-h-12 rounded-full bg-black px-6 text-xs font-bold uppercase text-white">Place demo order</button></div><aside className="border border-black p-5"><h2 className="text-xl font-bold">Order summary</h2>{lines.map((line) => <p key={line.id} className="mt-3 text-sm">{line.title} × {line.quantity} · {formatPrice(line.price * line.quantity)}</p>)}<p className="mt-5 border-t border-black pt-4 font-bold">Estimated total {formatPrice(subtotal + (subtotal >= 75 ? 0 : 6))}</p><p className="mt-2 text-xs">Demo prices · no payment will be collected.</p></aside></form></main>;
}
