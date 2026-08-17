import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'
import { auth } from '../../Utility/firebase'
import './Header.css'

function Header() {
  const [{ user, basket }] = useContext(DataContext)

  const totalItems = basket?.reduce((amount, item) => amount + item.amount, 0) || 0

  const signOutHandler = (e) => {
    e.preventDefault()
    auth.signOut()
  }

  return (
    <header className="header fixed">
      <div className="header-wrapper">

        {/* Logo */}
        <Link to="/" className="header-link logo-link">
          <div className="logo-text">
            amazon
            <svg className="logo-smile" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 2 Q50 20 95 2" stroke="#ff9900" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M90 2 L98 4 L92 9" stroke="#ff9900" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>

        {/* Delivery location */}
        <div className="header-link delivery">
          <svg className="delivery-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div className="delivery-text">
            <p>Deliver to</p>
            <span>Ethiopia</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="search-bar">
          <select className="search-select">
            <option value="">All</option>
          </select>
          <input
            type="text"
            placeholder="Search Product"
            className="search-input"
          />
          <button className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {/* Right side links */}
        <div className="header-right">

          {/* Language */}
          <div className="header-link language">
            <img src="https://flagcdn.com/w40/us.png" alt="US flag" className="flag-img" />
            <span className="lang-text">
              EN
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </div>

          {/* Sign in / Sign out */}
          <Link to={!user ? '/auth' : '#'} className="header-link">
            {user ? (
              <div>
                <p className="small-text">Hello, {user?.email?.split('@')[0]}</p>
                <span className="bold-text" onClick={signOutHandler}>
                  Sign Out
                </span>
              </div>
            ) : (
              <div>
                <p className="small-text">Hello, Sign In</p>
                <span className="bold-text">
                  Account & Lists
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
            )}
          </Link>

          {/* Orders */}
          <Link to="/orders" className="header-link orders">
            <p className="small-text">Returns</p>
            <span className="bold-text">& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="header-link cart">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="cart-count">{totalItems}</span>
            <span className="cart-text">Cart</span>
          </Link>

        </div>
      </div>
    </header>
  )
}

export default Header