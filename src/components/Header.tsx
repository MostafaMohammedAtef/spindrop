import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/spindrop-icon-default.png';

const links = ['Discover', 'Search', 'Why Spindrop', 'Cart'];

export default function Header() {
  const [open, setOpen] = useState(false);

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
          {links.map((link) => (
            <a key={link} href="#" className="hover:underline">
              {link}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 justify-self-end lg:flex">
          <Link to="/sign-in" className="text-sm font-medium uppercase hover:underline">
            Sign in
          </Link>
          <Link
            to="/login"
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
          {links.map((link) => (
            <a key={link} href="#" className="py-3 text-sm font-medium uppercase">
              {link}
            </a>
          ))}
          <Link
            to="/login"
            className="mt-2 rounded-full bg-black px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-white"
          >
            Make a record
          </Link>
          <Link
            to="/sign-in"
            className="mt-3 py-3 text-center text-sm font-medium uppercase"
          >
            Sign in
          </Link>
        </nav>
      )}
    </header>
  );
}
