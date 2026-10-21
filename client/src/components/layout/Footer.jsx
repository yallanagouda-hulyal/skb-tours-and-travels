import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-root">
      {/* Upper Pre-Footer Accent */}
      <div className="footer-top-accent" />

      <div className="container footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <div className="footer-logo-frame">
                <img
                  src="/assets/images/skb-logo.jpeg"
                  alt="SKB Tour and Travels"
                  className="footer-logo-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="footer-brand-text">
                <span className="footer-company-name">{BUSINESS_INFO.name}</span>
                <span className="footer-tagline">{BUSINESS_INFO.tagline}</span>
              </div>
            </div>

            <p className="footer-about-text">
              Dedicated travel and transport services specializing in punctual airport pickup & drops, curated outstation journeys, and spacious group travel across Bengaluru and PAN India.
            </p>

            <div className="footer-owner-badge">
              <span className="badge-label">Proprietor:</span>
              <span className="badge-name">{BUSINESS_INFO.owner}</span>
              <span className="badge-pipe">•</span>
              <span className="badge-reg">{BUSINESS_INFO.profileName}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <div className="footer-title-divider" />
            <ul className="footer-links-list">
              <li>
                <Link to="/" className="footer-link">
                  <ArrowRight size={14} className="link-arrow" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="footer-link">
                  <ArrowRight size={14} className="link-arrow" />
                  <span>Our Fleet & Vehicles</span>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="footer-link">
                  <ArrowRight size={14} className="link-arrow" />
                  <span>Packages & Pricing</span>
                </Link>
              </li>
              <li>
                <Link to="/booking" className="footer-link">
                  <ArrowRight size={14} className="link-arrow" />
                  <span>Book an Enquiry</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  <ArrowRight size={14} className="link-arrow" />
                  <span>About SKB Travels</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  <ArrowRight size={14} className="link-arrow" />
                  <span>Contact & Map Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Travel Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Services</h4>
            <div className="footer-title-divider" />
            <ul className="footer-services-list">
              <li>Airport Pickup & Drop (Kempegowda BLR)</li>
              <li>Local 4-Hour / 40 KM Package</li>
              <li>Local 8-Hour / 80 KM Package</li>
              <li>Outstation One-Way Transfers</li>
              <li>Outstation Round-Trip Tours</li>
              <li>Force Traveller & Group Mini Coach</li>
              <li>Corporate & PAN India Travel</li>
            </ul>
          </div>

          {/* Column 4: Direct Contact & Location */}
          <div className="footer-col">
            <h4 className="footer-col-title">Direct Contact</h4>
            <div className="footer-title-divider" />
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <Phone size={16} className="contact-icon text-gold" />
                <div className="contact-text">
                  <span className="contact-label">Primary Hotline</span>
                  <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="contact-val highlight-val">
                    {BUSINESS_INFO.primaryPhoneDisplay}
                  </a>
                </div>
              </div>

              <div className="footer-contact-row">
                <Phone size={16} className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Alternate Contact</span>
                  <a href={`tel:${BUSINESS_INFO.alternatePhone}`} className="contact-val">
                    {BUSINESS_INFO.alternatePhoneDisplay}
                  </a>
                </div>
              </div>

              <div className="footer-contact-row">
                <Mail size={16} className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Email Inquiries</span>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="contact-val">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="footer-contact-row">
                <MapPin size={16} className="contact-icon text-gold" />
                <div className="contact-text">
                  <span className="contact-label">Operational Hub</span>
                  <span className="contact-val">{BUSINESS_INFO.location.fullDisplay}</span>
                </div>
              </div>

              <div className="footer-contact-row">
                <Clock size={16} className="contact-icon" />
                <div className="contact-text">
                  <span className="contact-label">Availability</span>
                  <span className="contact-val">{BUSINESS_INFO.operatingHours}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Airport Area Notice Banner */}
        <div className="footer-notice-box">
          <div className="notice-icon-frame">
            <ShieldCheck size={20} className="notice-icon text-gold" />
          </div>
          <p className="notice-text">
            <strong>Location Notice:</strong> SKB Tour and Travels operates from the Airport area (PIN 560300) with rapid dispatch to Kempegowda International Airport terminals and key highway corridors. Please confirm written fares prior to boarding.
          </p>
        </div>

        {/* Lower Copyright Row */}
        <div className="footer-bottom">
          <p className="copyright-text">
            © {currentYear} <strong>{BUSINESS_INFO.name}</strong>. All rights reserved. Your Journey, Our Priority.
          </p>
          <div className="footer-bottom-links">
            <span className="footer-sub-note">Airport • City • Outstation • PAN India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
