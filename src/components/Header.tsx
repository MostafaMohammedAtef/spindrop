import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/discover', label: 'DISCOVER' },
  { to: '/search', label: 'SEARCH' },
  { to: '/why-spindrop', label: 'WHY SPINDROP' },
  { to: '/cart', label: 'CART' },
]

export default function Header() {
  return (
    <header className="">
      <div>
        <Link to="/">
          <img src="/header-logo.png" alt="Spindrop Logo" />
        </Link>
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Link to="/login">LOG IN</Link>
          <Link to="/make-a-record">MAKE A RECORD</Link>
        </div>
      </div>
    </header>
  )
}
