import React from 'react';
import { Phone, Clock, Globe } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar" role="complementary" aria-label="Quick Notice">
      <div className="container announcement-container">
        <div className="announcement-left">
          <span className="announcement-item">
            <Clock size={13} className="announcement-icon" />
            <span>24/7 Booking Enquiry Support</span>
          </span>
          <span className="announcement-separator">•</span>
          <span className="announcement-item hidden-mobile">
            <Globe size={13} className="announcement-icon" />
            <span>Airport, Local, Outstation & PAN India Travel</span>
          </span>
        </div>
        <div className="announcement-right">
          <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="announcement-phone-link">
            <Phone size={13} className="announcement-icon gold-text" />
            <span>Book Directly: <strong>{BUSINESS_INFO.primaryPhoneDisplay}</strong></span>
          </a>
        </div>
      </div>
    </div>
  );
}
