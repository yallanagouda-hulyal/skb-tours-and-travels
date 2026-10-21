import React from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MessageSquare, ShieldCheck, Clock, MapPin } from 'lucide-react';
import BookingForm from '../components/booking/BookingForm';
import { BUSINESS_INFO } from '../data/businessInfo';
import './Booking.css';

export default function Booking() {
  const location = useLocation();
  const prefill = location.state?.prefill || {};

  return (
    <div className="booking-page-root">
      {/* Header Banner */}
      <section className="booking-hero-banner" aria-label="Booking Enquiry">
        <div className="container">
          <div className="booking-hero-content">
            <span className="section-tag">
              <Clock size={13} />
              24/7 Fast Response
            </span>
            <h1 className="booking-hero-title">
              Plan Your Journey with <span className="text-gold">SKB Travels</span>
            </h1>
            <div className="gold-divider gold-divider-center" />
            <p className="booking-hero-desc">
              Submit your trip specifications below. Vicky personally reviews vehicle availability, schedules, and confirms the exact written fare via phone or WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="section-padding booking-form-section" aria-label="Booking Form">
        <div className="container">
          {/* Quick Contact Bar */}
          <div className="booking-contact-strip">
            <div className="strip-item">
              <Phone size={18} className="text-gold" />
              <div className="strip-text">
                <span className="strip-label">Direct Hotline:</span>
                <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="strip-val">
                  {BUSINESS_INFO.primaryPhoneDisplay}
                </a>
              </div>
            </div>

            <div className="strip-item">
              <Phone size={18} className="text-gold" />
              <div className="strip-text">
                <span className="strip-label">Alternate Contact:</span>
                <a href={`tel:${BUSINESS_INFO.alternatePhone}`} className="strip-val">
                  {BUSINESS_INFO.alternatePhoneDisplay}
                </a>
              </div>
            </div>

            <div className="strip-item">
              <MapPin size={18} className="text-gold" />
              <div className="strip-text">
                <span className="strip-label">Base Location:</span>
                <span className="strip-val">{BUSINESS_INFO.location.area} (PIN 560300)</span>
              </div>
            </div>
          </div>

          {/* Core Booking Form */}
          <BookingForm initialValues={prefill} />
        </div>
      </section>
    </div>
  );
}
