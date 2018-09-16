import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <nav className="navbar is-black" role="navigation" aria-label="main navigation">
    <div className="container">
      <div className="navbar-brand">
        <Link
          to="/"
          className="navbar-item">
          {siteTitle}
        </Link>
      </div>

      <div className="navbar-end">
        <Link
          to="/buy/"
          className="navbar-item"
        >
          Buy
        </Link>
        <Link
          to="/history/"
          className="navbar-item"
        >
          History
        </Link>
      </div>
    </div>
  </nav>
)

export default Header
