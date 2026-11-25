import { Link, useNavigate } from 'react-router-dom';
import { getDemoSession, signOutDemoAccount } from '../lib/demoAuth';
import { usePageTitle } from '../hooks/usePageTitle';

export default function AccountPage() {
  const session = getDemoSession();
  const navigate = useNavigate();
  usePageTitle('Account');
  if (!session) { navigate('/login?next=%2Faccount', { replace: true }); return null; }
  return <main className="mx-auto min-h-[60svh] max-w-7xl px-6 py-12"><p className="text-xs font-bold uppercase">Demo account</p><h1 tabIndex={-1} className="mt-2 text-4xl font-bold">Hi, {session.name}</h1><p className="mt-3">{session.email}</p><div className="mt-8 flex flex-wrap gap-3"><Link to="/orders" className="rounded-full bg-black px-6 py-3 text-xs font-bold uppercase text-white">View orders</Link><Link to="/wishlist" className="rounded-full border-2 border-black px-6 py-3 text-xs font-bold uppercase">Wishlist</Link><button type="button" onClick={() => { signOutDemoAccount(); navigate('/login'); }} className="rounded-full border-2 border-black px-6 py-3 text-xs font-bold uppercase">Sign out</button></div><p className="mt-8 text-sm">Demo profile stored only in this browser.</p></main>;
}
