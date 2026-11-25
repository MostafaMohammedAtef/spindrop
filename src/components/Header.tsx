import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { getDemoSession, signOutDemoAccount, subscribeToDemoAuth } from '../lib/demoAuth';
import { useCart } from '../lib/CartContext';
import { useWishlist } from '../hooks/useWishlist';
import InstantSearchDialog from './InstantSearchDialog';

const links = [
  { label: 'Discover', to: '/discover' },
  { label: 'Search', to: '/discover' },
  { label: 'Why Spindrop', to: '/' },
  { label: 'Cart', to: '/cart' },
  { label: 'Wishlist', to: '/wishlist' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState(() => getDemoSession()?.name.trim().split(/\s+/)[0] ?? '');
  const { itemCount } = useCart();
  const wishlist = useWishlist();
  const { pathname } = useLocation();
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  function isCurrentPage(label: string) {
    if (label === 'Discover') return pathname === '/discover';
    if (label === 'Why Spindrop') return pathname === '/';
    if (label === 'Cart') return pathname === '/cart';
    if (label === 'Wishlist') return pathname === '/wishlist';
    return false;
  }

  useEffect(() => subscribeToDemoAuth(() => {
    setFirstName(getDemoSession()?.name.trim().split(/\s+/)[0] ?? '');
  }), []);

  useEffect(() => {
    function openSearchShortcut(event: KeyboardEvent) {
      const target = event.target;
      const isTyping = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName));
      if (event.key === '/' && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener('keydown', openSearchShortcut);
    return () => window.removeEventListener('keydown', openSearchShortcut);
  }, []);

  useEffect(() => {
    if (!accountMenuOpen) return;
    function closeMenu(event: KeyboardEvent) {
      if (event.key === 'Escape') setAccountMenuOpen(false);
    }
    window.addEventListener('keydown', closeMenu);
    return () => window.removeEventListener('keydown', closeMenu);
  }, [accountMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white">
      <div className="mx-auto grid h-16 max-w-screen-2xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:h-20 lg:px-12">
        <Link to="/" aria-label="Spindrop home" className="group justify-self-start">
          <img
            src="/spindrop-icon-default.webp"
            alt=""
            width="40"
            height="40"
            fetchPriority="high"
            className="h-9 w-9 group-hover:hidden group-active:hidden lg:h-10 lg:w-10"
          />
          <img
            src="/spindrop-icon-yellow.webp"
            alt=""
            width="40"
            height="40"
            className="hidden h-9 w-9 group-hover:block group-active:hidden lg:h-10 lg:w-10"
          />
          <img
            src="/spindrop-icon-pink.webp"
            alt=""
            width="40"
            height="40"
            className="hidden h-9 w-9 group-active:block lg:h-10 lg:w-10"
          />
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium uppercase lg:flex">
          {links.map((link) => {
            const active = isCurrentPage(link.label);
            if (link.label === 'Search') return <button key={link.label} type="button" onClick={() => setSearchOpen(true)} className="inline-flex items-center gap-2 border-b-2 border-transparent pb-1 text-sm font-medium uppercase hover:border-black">Search</button>;
            return (
              <Link
                key={link.label}
                to={link.to}
                aria-current={active ? 'page' : undefined}
                aria-label={link.label === 'Cart' ? `Cart${itemCount > 0 ? `, ${itemCount} items` : ''}` : link.label === 'Wishlist' ? `Wishlist, ${wishlist.ids.length} saved records` : undefined}
                title={link.label}
                className={`inline-flex items-center gap-2 border-b-2 pb-1 ${active ? 'border-black' : 'border-transparent'} hover:border-black`}
              >
                {link.label === 'Cart' ? <ShoppingCart aria-hidden="true" size={20} strokeWidth={1.8} /> : link.label === 'Wishlist' ? <Heart aria-hidden="true" size={20} strokeWidth={1.8} /> : link.label}
                {link.label === 'Cart' && itemCount > 0 && <span className="text-[0.65rem]">{itemCount}</span>}
                {link.label === 'Cart' && <span aria-live="polite" aria-atomic="true" className="sr-only">Cart contains {itemCount} items</span>}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 justify-self-end lg:flex">
          {firstName ? (
            <>
              <div className="relative">
                <button type="button" aria-expanded={accountMenuOpen} aria-controls="header-account-menu" onClick={() => setAccountMenuOpen((isOpen) => !isOpen)} className="text-sm font-medium">Hi, {firstName}</button>
                {accountMenuOpen && <nav id="header-account-menu" aria-label="Account menu" className="absolute right-0 top-full z-50 mt-4 min-w-44 border border-black bg-white p-2 shadow-[4px_4px_0_#000]"><Link to="/account" onClick={() => setAccountMenuOpen(false)} className="block px-3 py-3 text-sm hover:bg-brand-yellow">Account</Link><Link to="/orders" onClick={() => setAccountMenuOpen(false)} className="block px-3 py-3 text-sm hover:bg-brand-yellow">Orders</Link><button type="button" onClick={() => { signOutDemoAccount(); setAccountMenuOpen(false); }} className="block w-full px-3 py-3 text-left text-sm hover:bg-brand-yellow">Sign out</button></nav>}
              </div>
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
        <nav className="fixed bottom-0 left-0 right-0 top-16 flex flex-col border-b border-black bg-white px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2 lg:hidden">
          {links.map((link) => {
            const active = isCurrentPage(link.label);
            if (link.label === 'Search') return <button key={link.label} type="button" onClick={() => { setSearchOpen(true); setOpen(false); }} className="flex items-center gap-3 border-b border-transparent py-3 text-sm font-medium uppercase">Search</button>;
            return (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                aria-current={active ? 'page' : undefined}
                aria-label={link.label === 'Cart' ? `Cart${itemCount > 0 ? `, ${itemCount} items` : ''}` : link.label === 'Wishlist' ? `Wishlist, ${wishlist.ids.length} saved records` : undefined}
                className={`flex items-center gap-3 border-b py-3 text-sm font-medium uppercase ${active ? 'border-black' : 'border-transparent'}`}
              >
                {link.label === 'Cart' ? <ShoppingCart aria-hidden="true" size={20} strokeWidth={1.8} /> : link.label === 'Wishlist' ? <Heart aria-hidden="true" size={20} strokeWidth={1.8} /> : link.label}
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
              <Link to="/account" onClick={() => setOpen(false)} className="border-b border-transparent py-3 text-sm font-medium uppercase">Account</Link>
              <Link to="/orders" onClick={() => setOpen(false)} className="border-b border-transparent py-3 text-sm font-medium uppercase">Orders</Link>
              <span className="mt-3 py-3 text-center text-sm font-medium">Hi, {firstName}</span>
              <button type="button" onClick={() => { signOutDemoAccount(); setOpen(false); }} className="py-3 text-center text-sm font-medium uppercase">Sign out</button>
            </>
          ) : (
            <Link to="/sign-in" onClick={() => setOpen(false)} className="mt-3 py-3 text-center text-sm font-medium uppercase">Sign in</Link>
          )}
        </nav>
      )}
      <InstantSearchDialog open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
