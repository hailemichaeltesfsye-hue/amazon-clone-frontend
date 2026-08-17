import React, { useState } from 'react'
import './NavBar.css'

function NavBar() {
  const [open, setOpen] = useState(false)

  const links = ["Today's Deals", "Customer Service", "Registry", "Gift Cards", "Sell"]

  return (
    <nav className="navbar">
      <button className="nav-link hamburger-btn" onClick={() => setOpen(!open)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        All
      </button>

      <div className={`nav-links ${open ? 'nav-links-open' : ''}`}>
        {links.map((link) => (
          <a href="/" className="nav-link" key={link} onClick={() => setOpen(false)}>
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default NavBar