import React from 'react';
import { useLocation } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import './Booking.css';

export default function Booking() {
  const location = useLocation();
  const prefill = location.state?.prefill || {};

  return (
    <div className="booking-page-root">
      {/* Header Banner */}
      <section className="booking-banner-navy">
        <div className="container">
          <div className="booking-banner-center">
            <div className="booking-tagline-gold">SEAMLESS RESERVATIONS</div>
            <h1 className="booking-main-heading">Book Your <span className="gold-text">Journey</span></h1>
            <p className="booking-main-subtext">
              Airport transfers, local city rides, outstation trips & corporate travel — fill in your requirements and our team will confirm your vehicle and fare promptly.
            </p>
          </div>
        </div>
      </section>

      <div className="container booking-main-container">
        <BookingForm initialValues={prefill} />
      </div>
    </div>
  );
}
