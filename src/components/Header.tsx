import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import logo from '../../public/spindrop-icon-default.png';
import { getDemoSession, signOutDemoAccount, subscribeToDemoAuth } from '../lib/demoAuth';
import { useCart } from '../lib/CartContext';

const links = [
  { label: 'Discover', to: '/discover' },
  { label: 'Search', to: '/discover' },
  { label: 'Why Spindrop', to: '/' },
  { label: 'Cart', to: '/cart' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState(() => getDemoSession()?.name.trim().split(/\s+/)[0] ?? '');
  const { itemCount } = useCart();
  const { pathname } = useLocation();

  function isCurrentPage(label: string) {
    if (label === 'Discover') return pathname === '/discover';
    if (label === 'Why Spindrop') return pathname === '/';
    if (label === 'Cart') return pathname === '/cart';
    return false;
  }

  useEffect(() => subscribeToDemoAuth(() => {
    setFirstName(getDemoSession()?.name.trim().split(/\s+/)[0] ?? '');
  }), []);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto grid h-16 max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:h-20 lg:px-12">
        <a href="/" className="group justify-self-start">
          <img
            src={logo}
            alt=""
            className="h-9 w-9 group-hover:hidden group-active:hidden lg:h-10 lg:w-10"
          />
          <img
            src="/spindrop-icon-yellow.png"
            alt=""
            className="hidden h-9 w-9 group-hover:block group-active:hidden lg:h-10 lg:w-10"
          />
          <img
            src="/spindrop-icon-pink.png"
            alt=""
            className="hidden h-9 w-9 group-active:block lg:h-10 lg:w-10"
          />
        </a>

        <nav className="hidden items-center gap-10 text-sm font-medium uppercase lg:flex">
          {links.map((link) => {
            const active = isCurrentPage(link.label);
            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                aria-label={link.label === 'Cart' ? `Cart${itemCount > 0 ? `, ${itemCount} items` : ''}` : undefined}
                title={link.label === 'Cart' ? 'Cart' : undefined}
                className={`inline-flex items-center gap-2 border-b-2 pb-1 ${active ? 'border-black' : 'border-transparent'} hover:border-black`}
              >
                {link.label === 'Cart' ? <ShoppingCart aria-hidden="true" size={20} strokeWidth={1.8} /> : link.label}
                {link.label === 'Cart' && itemCount > 0 && <span className="text-[0.65rem]">{itemCount}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 justify-self-end lg:flex">
          {firstName ? (
            <>
              <span className="text-sm font-medium">Hi, {firstName}</span>
              <button type="button" onClick={signOutDemoAccount} className="text-sm font-medium uppercase hover:underline">Sign out</button>
            </>
          ) : (
            <Link to="/sign-in" className="text-sm font-medium uppercase hover:underline">Sign in</Link>
          )}
          <Link
            to={firstName ? '/#vinyl-studio' : '/sign-in'}
            className="rounded-full bg-black px-6 py-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-stone-800"
          >
            Make a record
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="col-start-3 row-start-1 flex h-10 w-10 flex-col items-center justify-center gap-1.5 justify-self-end lg:hidden"
        >
          <span className="h-0.5 w-7 bg-black" />
          <span className="h-0.5 w-7 bg-black" />
          <span className="h-0.5 w-7 bg-black" />
        </button>
      </div>

      {open && (
        <nav className="fixed bottom-0 left-0 right-0 top-16 flex flex-col border-b border-black bg-white px-6 pb-6 pt-2 lg:hidden">
          {links.map((link) => {
            const active = isCurrentPage(link.label);
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                aria-label={link.label === 'Cart' ? `Cart${itemCount > 0 ? `, ${itemCount} items` : ''}` : undefined}
                className={`flex items-center gap-3 border-b py-3 text-sm font-medium uppercase ${active ? 'border-black' : 'border-transparent'}`}
              >
                {link.label === 'Cart' ? <ShoppingCart aria-hidden="true" size={20} strokeWidth={1.8} /> : link.label}
                {link.label === 'Cart' && itemCount > 0 && <span>{itemCount}</span>}
              </Link>
            );
          })}
          <Link
            to={firstName ? '/#vinyl-studio' : '/sign-in'}
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-black px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-white"
          >
            Make a record
          </Link>
          {firstName ? (
            <>
              <span className="mt-3 py-3 text-center text-sm font-medium">Hi, {firstName}</span>
              <button type="button" onClick={() => { signOutDemoAccount(); setOpen(false); }} className="py-3 text-center text-sm font-medium uppercase">Sign out</button>
            </>
          ) : (
            <Link to="/sign-in" onClick={() => setOpen(false)} className="mt-3 py-3 text-center text-sm font-medium uppercase">Sign in</Link>
          )}
        </nav>
      )}
    </header>
  );
}
