import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Fleet', path: '/fleet' },
    { label: 'Packages', path: '/packages' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="navbar-header-white">
      <div className="container navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand" aria-label="SKB Tour and Travels Homepage">
          <div className="brand-logo-frame-white">
            <img
              src="/assets/images/skb-logo.jpeg"
              alt="SKB Tour and Travels"
              className="brand-logo-img"
            />
          </div>
          <div className="brand-text-block">
            <span className="brand-name-dark">{BUSINESS_INFO.name}</span>
            <span className="brand-tagline-gold">{BUSINESS_INFO.tagline}</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `nav-link-item ${isActive ? 'nav-link-active-dark' : ''}`
                  }
                >
                  {link.label}
                  <span className="nav-indicator-bar" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Button: Book a Ride */}
        <div className="navbar-actions">
          <Link to="/booking" className="btn-book-gold">
            Book a Ride
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="hamburger-btn-dark"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer-white ${mobileMenuOpen ? 'drawer-open' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.path} className="mobile-nav-item">
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `mobile-nav-link-item ${isActive ? 'mobile-active-gold' : ''}`
                  }
                >
                  <span>{link.label}</span>
                  <ArrowRight size={16} />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mobile-cta-box">
            <Link to="/booking" className="btn-book-gold mobile-btn-full">
              Book a Ride
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
