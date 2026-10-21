import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Fleet', path: '/fleet' },
    { label: 'Packages & Rates', path: '/packages' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact & Location', path: '/contact' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo & Name */}
        <Link to="/" className="navbar-brand" aria-label="SKB Tour and Travels Homepage">
          <div className="brand-logo-frame">
            <img
              src="/assets/images/skb-logo.jpeg"
              alt="SKB Tour and Travels Logo"
              className="brand-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <div className="brand-text-block">
            <span className="brand-name">{BUSINESS_INFO.name}</span>
            <span className="brand-tagline">{BUSINESS_INFO.tagline}</span>
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
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  {link.label}
                  <span className="nav-indicator" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Action CTA */}
        <div className="navbar-actions">
          <Link to="/booking" className="btn-book-nav">
            <span>Book a Ride</span>
            <ArrowRight size={16} className="btn-icon" />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-brand-banner">
            <span className="mobile-owner-note">Owned & Managed by {BUSINESS_INFO.owner}</span>
            <span className="mobile-area-note">{BUSINESS_INFO.location.area} • PIN {BUSINESS_INFO.location.pinCode}</span>
          </div>

          <nav className="mobile-nav" aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.path} className="mobile-nav-item">
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `mobile-nav-link ${isActive ? 'mobile-link-active' : ''}`
                    }
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={16} className="mobile-chevron" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-drawer-footer">
            <Link to="/booking" className="btn-mobile-book">
              Book a Ride Now
            </Link>
            <div className="mobile-contact-support">
              <p>24/7 Phone Support:</p>
              <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="mobile-phone-call">
                {BUSINESS_INFO.primaryPhoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
