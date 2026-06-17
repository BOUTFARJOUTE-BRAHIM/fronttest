import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/catalogue', label: 'Catalogue' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <header className="header" id="main-header">
      <div className="container header-inner">
        <Link to="/" className="header-logo" id="logo-link">
          <span className="logo-icon">📚</span>
          <span className="logo-text">
            Bibliothèque<span className="logo-accent">IT</span>
          </span>
        </Link>

        <nav className={`header-nav ${menuOpen ? 'open' : ''}`} id="main-nav">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className={`header-burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          id="burger-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header
