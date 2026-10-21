import React from 'react';
import { useLocation } from 'react-router-dom';
import BookingForm from '../components/booking/BookingForm';
import './Booking.css';

export default function Booking() {
  const location = useLocation();
  const prefill = location.state?.prefill || {};

  return (
    <div className="booking-page-root">
      <div className="container booking-main-container">
        <BookingForm initialValues={prefill} />
      </div>
    </div>
  );
}
