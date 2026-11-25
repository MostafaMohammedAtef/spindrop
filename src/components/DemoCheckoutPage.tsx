import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { records } from '../data/records';
import { useCart } from '../lib/CartContext';
import { usePricing } from '../lib/PricingContext';
import { readJson, writeJson } from '../lib/storage';
import { usePageTitle } from '../hooks/usePageTitle';

type OrderLine = { id: string; name: string; title: string; price: number; quantity: number; currency: string };
type Order = { id: string; date: string; lines: OrderLine[]; subtotal: number; shipping: number; total: number; currency: string; locale: string; email: string; name: string; address: string; city: string; postalCode: string; phone: string };
type Details = { name: string; email: string; address: string; city: string; postalCode: string; phone: string };
type Field = keyof Details;
type Step = 0 | 1 | 2;
const fields: { name: Field; label: string; type: string; autocomplete: string }[] = [
  { name: 'name', label: 'Full name', type: 'text', autocomplete: 'name' },
  { name: 'email', label: 'Email address', type: 'email', autocomplete: 'email' },
  { name: 'address', label: 'Shipping address', type: 'text', autocomplete: 'street-address' },
  { name: 'city', label: 'City', type: 'text', autocomplete: 'address-level2' },
  { name: 'postalCode', label: 'Postal code', type: 'text', autocomplete: 'postal-code' },
  { name: 'phone', label: 'Phone number', type: 'tel', autocomplete: 'tel' },
];
const isOrders = (value: unknown): value is Order[] => Array.isArray(value);

export default function DemoCheckoutPage() {
  const { items, clearCart } = useCart();
  const { country, formatPrice, quotePrice, rateStatus, isCurrencyAvailable } = usePricing();
  const [step, setStep] = useState<Step>(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [details, setDetails] = useState<Details>({ name: '', email: '', address: '', city: '', postalCode: '', phone: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  usePageTitle('Demo checkout');
  const lines = items.flatMap((item) => {
    const record = records.find((entry) => entry.id === item.recordId);
    return record ? [{ id: record.id, name: record.title, title: record.title, priceUsd: record.priceUsd, quantity: item.quantity }] : [];
  });
  const subtotalUsd = lines.reduce((sum, item) => sum + item.priceUsd * item.quantity, 0);
  const shippingUsd = subtotalUsd >= 75 ? 0 : 6;
  const subtotal = quotePrice(subtotalUsd);
  const shipping = quotePrice(shippingUsd);
  const total = quotePrice(subtotalUsd + shippingUsd);

  if (!lines.length && !orderPlaced) return <Navigate to="/cart" replace />;

  function updateField(field: Field, value: string) {
    setDetails((current) => ({ ...current, [field]: value.slice(0, field === 'address' ? 250 : 120) }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validateStep(): boolean {
    const nextErrors: Partial<Record<Field, string>> = {};
    const requiredFields: Field[] = step === 0 ? ['name', 'email'] : ['address', 'city', 'postalCode', 'phone'];
    for (const name of requiredFields) {
      if (!details[name].trim()) nextErrors[name] = 'This field is required.';
    }
    if (step === 0 && details.email && !/^\S+@\S+\.\S+$/.test(details.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (step === 1 && details.postalCode.trim() && details.postalCode.trim().length < 3) nextErrors.postalCode = 'Enter at least 3 characters.';
    if (step === 1 && details.phone && details.phone.replace(/\D/g, '').length < 7) nextErrors.phone = 'Enter a valid phone number.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function continueCheckout() {
    if (validateStep()) setStep((current) => Math.min(2, current + 1) as Step);
  }

  function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step !== 2) { continueCheckout(); return; }
    const convertedLines: OrderLine[] = lines.map((line) => {
      const quote = quotePrice(line.priceUsd);
      return { id: line.id, name: line.title, title: line.title, price: quote.amount, quantity: line.quantity, currency: quote.currency };
    });
    const order: Order = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      lines: convertedLines,
      subtotal: subtotal.amount,
      shipping: shipping.amount,
      total: total.amount,
      currency: total.currency,
      locale: total.locale,
      email: details.email.trim().toLowerCase().slice(0, 254),
      name: details.name.trim().slice(0, 100),
      address: details.address.trim().slice(0, 250),
      city: details.city.trim().slice(0, 120),
      postalCode: details.postalCode.trim().slice(0, 30),
      phone: details.phone.trim().slice(0, 30),
    };
    const existing = readJson<Order[]>('spindrop.orders', isOrders, []);
    if (!writeJson('spindrop.orders', [order, ...existing])) { setError('Could not save your demo order in this browser.'); return; }
    setOrderPlaced(true);
    clearCart();
    navigate(`/order/${order.id}`);
  }

  return (
    <main id="main-content" className="mx-auto min-h-[60svh] max-w-5xl px-4 py-8 lg:px-8 lg:py-12">
      <p className="border border-black bg-brand-yellow p-4 text-sm font-bold">Demo checkout, no payment is taken and nothing is shipped.</p>
      {country.currency !== 'USD' && (rateStatus === 'fallback' || (rateStatus === 'ready' && !isCurrencyAvailable)) && <p className="mt-3 text-xs">Showing USD, rates unavailable for {country.currency}.</p>}
      <h1 tabIndex={-1} className="mt-6 text-4xl font-bold">Checkout</h1>
      <ol aria-label="Checkout steps" className="mt-6 grid grid-cols-3 border-y border-black py-4 text-center text-xs font-bold uppercase">
        {['Contact', 'Shipping', 'Review'].map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} className={step === index ? 'text-palette-48 underline underline-offset-4' : 'text-stone-600'}>{index + 1}. {label}</li>)}
      </ol>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form onSubmit={placeOrder} className="space-y-5">
          {step < 2 ? fields.filter((field) => step === 0 ? ['name', 'email'].includes(field.name) : ['address', 'city', 'postalCode', 'phone'].includes(field.name)).map((field) => <label key={field.name} htmlFor={`checkout-${field.name}`} className="block text-xs font-bold uppercase">{field.label}<input id={`checkout-${field.name}`} type={field.type} autoComplete={field.autocomplete} value={details[field.name]} onChange={(event) => updateField(field.name, event.target.value)} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `checkout-${field.name}-error` : undefined} className="mt-2 h-12 w-full border border-black bg-white px-4 text-sm font-normal normal-case outline-none focus-visible:ring-2 focus-visible:ring-palette-21" />{errors[field.name] && <span id={`checkout-${field.name}-error`} className="mt-1 block text-xs font-medium text-red-700">{errors[field.name]}</span>}</label>) : <section aria-labelledby="review-title" className="border border-black p-5"><h2 id="review-title" className="text-xl font-bold">Review your details</h2><p className="mt-3 text-sm">{details.name} · {details.email}</p><p className="mt-1 text-sm">{details.address}, {details.city}, {details.postalCode}</p><p className="mt-1 text-sm">{details.phone}</p><button type="button" onClick={() => setStep(0)} className="mt-4 min-h-11 text-xs font-bold uppercase underline">Edit contact</button><button type="button" onClick={() => setStep(1)} className="ml-4 min-h-11 text-xs font-bold uppercase underline">Edit shipping</button></section>}
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex flex-wrap gap-3">{step > 0 && step < 2 && <button type="button" onClick={() => setStep((current) => Math.max(0, current - 1) as Step)} className="min-h-12 border-2 border-black px-6 text-xs font-bold uppercase">Back</button>}{step < 2 ? <button type="button" onClick={continueCheckout} className="min-h-12 rounded-full bg-black px-7 text-xs font-bold uppercase text-white">Continue to {step === 0 ? 'shipping' : 'review'}</button> : <button type="submit" className="min-h-12 rounded-full bg-black px-7 text-xs font-bold uppercase text-white">Place demo order</button>}</div>
        </form>
        <aside className="h-fit border border-black bg-white p-5">
          <h2 className="text-xl font-bold">Order summary</h2>
          {lines.map((line) => <p key={line.id} className="mt-3 flex justify-between gap-3 text-sm"><span className="min-w-0 truncate">{line.title} × {line.quantity}</span><span className="shrink-0">{formatPrice(line.priceUsd * line.quantity)}</span></p>)}
          <p className="mt-5 flex justify-between border-t border-black pt-4 text-sm"><span>Subtotal</span><span>{formatPrice(subtotalUsd)}</span></p>
          <p className="mt-2 flex justify-between text-sm"><span>Demo shipping</span><span>{formatPrice(shippingUsd)}</span></p>
          <p className="mt-3 flex justify-between border-t border-black pt-4 font-bold"><span>Estimated total</span><span>{formatPrice(subtotalUsd + shippingUsd)}</span></p>
          <p className="mt-3 text-xs">Demo prices. No payment will be collected.</p>
        </aside>
      </div>
    </main>
  );
}
