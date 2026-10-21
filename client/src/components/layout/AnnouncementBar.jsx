import React from 'react';
import { Phone, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar" role="complementary" aria-label="Announcement">
      <div className="container announcement-container">
        <div className="announcement-left">
          <Clock size={13} className="ann-icon text-gold" />
          <span>24/7 Booking Support</span>
          <span className="ann-pipe">|</span>
          <span>Airport</span>
          <span className="ann-pipe">|</span>
          <span>Local</span>
          <span className="ann-pipe">|</span>
          <span>Outstation</span>
          <span className="ann-pipe">|</span>
          <span>PAN India</span>
        </div>

        <div className="announcement-right">
          <div className="ann-phones">
            <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="ann-phone-item">
              <Phone size={12} className="text-gold" />
              <span>{BUSINESS_INFO.primaryPhone}</span>
            </a>
            <span className="ann-pipe">|</span>
            <a href={`tel:${BUSINESS_INFO.alternatePhone}`} className="ann-phone-item">
              <Phone size={12} className="text-gold" />
              <span>{BUSINESS_INFO.alternatePhone}</span>
            </a>
          </div>

          <div className="ann-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="ann-social-icon fb" aria-label="Facebook">f</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="ann-social-icon ig" aria-label="Instagram">ig</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="ann-social-icon yt" aria-label="YouTube">▶</a>
          </div>
        </div>
      </div>
    </div>
  );
}
