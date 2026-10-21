import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root-navy">
      <div className="container footer-container">
        <div className="footer-grid-4">
          {/* Col 1: Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <div className="footer-logo-box">
                <img
                  src="/assets/images/skb-logo.jpeg"
                  alt="SKB Tour and Travels"
                  className="footer-logo-img"
                />
              </div>
              <div className="footer-brand-title">
                <span className="footer-brand-name">{BUSINESS_INFO.name}</span>
                <span className="footer-brand-tag">{BUSINESS_INFO.tagline}</span>
              </div>
            </div>
            <p className="footer-brand-desc">
              Dedicated travel and transport services specializing in punctual airport pickup & drops, curated outstation journeys, and spacious group travel across Bengaluru and PAN India.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-gold-line" />
            <ul className="footer-links-clean">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/fleet">Our Fleet</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div className="footer-col">
            <h4 className="footer-title">Our Services</h4>
            <div className="footer-gold-line" />
            <ul className="footer-links-clean">
              <li><Link to="/booking" state={{ prefill: { tripType: 'airport_transfer' } }}>Airport Transfers</Link></li>
              <li><Link to="/packages">Local Trips</Link></li>
              <li><Link to="/packages">Outstation Travel</Link></li>
              <li><Link to="/packages">One-way Drops</Link></li>
              <li><Link to="/fleet">Group Travel</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>
            <div className="footer-gold-line" />
            <div className="footer-contact-list">
              <div className="footer-c-row">
                <Phone size={14} className="text-gold" />
                <a href={`tel:${BUSINESS_INFO.primaryPhone}`}>{BUSINESS_INFO.primaryPhone}</a>
              </div>
              <div className="footer-c-row">
                <Phone size={14} className="text-gold" />
                <a href={`tel:${BUSINESS_INFO.alternatePhone}`}>{BUSINESS_INFO.alternatePhone}</a>
              </div>
              <div className="footer-c-row">
                <Mail size={14} className="text-gold" />
                <a href={`mailto:${BUSINESS_INFO.email}`}>{BUSINESS_INFO.email}</a>
              </div>
              <div className="footer-c-row">
                <MapPin size={14} className="text-gold" />
                <span>{BUSINESS_INFO.location.fullDisplay}</span>
              </div>
            </div>

            <div className="footer-follow-block">
              <span className="follow-title">Follow Us</span>
              <div className="footer-social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="soc-btn fb">f</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="soc-btn ig">ig</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="soc-btn yt">▶</a>
                <a href="https://wa.me/919035897960" target="_blank" rel="noreferrer" className="soc-btn wa">wa</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="footer-bottom-row">
          <p className="copyright-clean">
            © {currentYear} <strong>{BUSINESS_INFO.name}</strong>. All rights reserved.
          </p>
          <p className="designer-credit">
            Designed and developed by <strong>bookmywebsite.in</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
