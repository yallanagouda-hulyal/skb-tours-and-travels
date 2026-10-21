import React from 'react';
import { Phone, Mail, MapPin, User, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { createWhatsAppQuickUrl } from '../utils/whatsapp';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page-root">
      {/* 1. Header Banner */}
      <section className="contact-banner-navy" aria-label="Contact Us Banner">
        <div className="container contact-banner-center">
          <h1 className="contact-main-heading">Contact Us</h1>
          <p className="contact-main-subtext">We are here to assist you with your travel plans.</p>
        </div>
      </section>

      {/* 2. Two White Cards Side-by-Side: Get in Touch & Our Location */}
      <section className="contact-cards-section" aria-label="Contact and Location Cards">
        <div className="container">
          <div className="contact-cards-2col-grid">
            {/* Left Card: Get in Touch */}
            <div className="contact-white-card">
              <h2 className="card-top-title">Get in Touch</h2>

              <div className="contact-details-table">
                <div className="detail-table-row">
                  <div className="detail-icon-cell">
                    <User size={18} className="text-gold" />
                  </div>
                  <div className="detail-label-cell">Owner</div>
                  <div className="detail-value-cell bold-val">{BUSINESS_INFO.owner}</div>
                </div>

                <div className="detail-table-row">
                  <div className="detail-icon-cell">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div className="detail-label-cell">Primary Number</div>
                  <div className="detail-value-cell">
                    <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="contact-num-link">
                      {BUSINESS_INFO.primaryPhone}
                    </a>
                  </div>
                </div>

                <div className="detail-table-row">
                  <div className="detail-icon-cell">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div className="detail-label-cell">Alternate Number</div>
                  <div className="detail-value-cell">
                    <a href={`tel:${BUSINESS_INFO.alternatePhone}`} className="contact-num-link">
                      {BUSINESS_INFO.alternatePhone}
                    </a>
                  </div>
                </div>

                <div className="detail-table-row">
                  <div className="detail-icon-cell">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div className="detail-label-cell">Email</div>
                  <div className="detail-value-cell">
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="contact-email-link">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="detail-table-row">
                  <div className="detail-icon-cell">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <div className="detail-label-cell">Location</div>
                  <div className="detail-value-cell">
                    {BUSINESS_INFO.location.area}, Bengaluru - {BUSINESS_INFO.location.pinCode}
                  </div>
                </div>
              </div>

              {/* Three Action Buttons: Call Now, WhatsApp, Send Email */}
              <div className="contact-3buttons-row">
                <a
                  href={`tel:${BUSINESS_INFO.primaryPhone}`}
                  className="btn-action-blue"
                >
                  <Phone size={15} />
                  <span>Call Now</span>
                </a>

                <a
                  href={createWhatsAppQuickUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-action-green"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="btn-action-gold"
                >
                  <Mail size={15} />
                  <span>Send Email</span>
                </a>
              </div>
            </div>

            {/* Right Card: Our Location */}
            <div className="contact-white-card">
              <h2 className="card-top-title">Our Location</h2>
              <div className="map-badge-header">
                <strong>Bengaluru, Airport</strong>
                <span className="map-sub-info">Bengaluru, Karnataka 560300</span>
              </div>

              <div className="contact-map-wrapper">
                <iframe
                  title="Bengaluru Airport Location Map"
                  src="https://maps.google.com/maps?q=Kempegowda+International+Airport+Bengaluru+560300&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="map-bottom-link-row">
                <a
                  href="https://maps.google.com/?q=Kempegowda+International+Airport+Bengaluru+560300"
                  target="_blank"
                  rel="noreferrer"
                  className="view-larger-map-link"
                >
                  View larger map
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
