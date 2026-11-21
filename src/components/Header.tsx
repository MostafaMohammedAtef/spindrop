import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/discover', label: 'DISCOVER' },
  { to: '/search', label: 'SEARCH' },
  { to: '/why-spindrop', label: 'WHY SPINDROP' },
  { to: '/cart', label: 'CART' },
]

const underlineBase =
  'relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-black after:transition-all after:duration-300'

const pillShape =
  'border-2 border-transparent text-xs font-bold uppercase tracking-wide whitespace-nowrap rounded-full px-3 py-2 text-center transition-colors lg:px-5 lg:py-2.5 xl:px-8 xl:py-3'
const pillFilled = `${pillShape} bg-black text-white hover:bg-brand-yellow hover:text-black focus-visible:bg-brand-pink focus-visible:text-black active:bg-brand-pink active:text-black`
const pillOutline = `${pillShape} border-black bg-white text-black hover:bg-black hover:text-white`

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-10 bg-white text-sm font-medium tracking-wide text-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        <Link to="/" onClick={closeMenu}>
          <img className="h-15 w-auto" src="/header-logo.png" alt="Spindrop" />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `${underlineBase} ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 justify-self-end lg:flex xl:gap-6">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${underlineBase} whitespace-nowrap ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`
            }
          >
            LOG IN
          </NavLink>
          <NavLink to="/make-a-record" className={pillFilled}>
            MAKE A RECORD
          </NavLink>
        </div>

        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span
            className={`h-0.75 w-7 bg-black transition-transform duration-300 ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.75 w-7 bg-black transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.75 w-7 bg-black transition-transform duration-300 ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>
      {menuOpen && (
        <nav className="flex flex-col gap-8 px-6 pb-8 lg:hidden">
          <ul className="flex flex-col gap-4 text-3xl font-bold">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive
                      ? 'underline decoration-brand-pink decoration-4 underline-offset-8'
                      : ''
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <NavLink
              to="/make-a-record"
              onClick={closeMenu}
              className={pillFilled}
            >
              MAKE A RECORD
            </NavLink>
            <NavLink to="/login" onClick={closeMenu} className={pillOutline}>
              LOG IN
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}
