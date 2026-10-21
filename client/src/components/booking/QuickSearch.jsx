import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, MapPin, Navigation, ArrowRight, MessageCircle } from 'lucide-react';
import Button from '../ui/Button';
import { createWhatsAppQuickUrl } from '../../utils/whatsapp';
import './QuickSearch.css';

export default function QuickSearch({ initialValues = {} }) {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState(initialValues.tripType || 'airport_transfer');
  const [pickup, setPickup] = useState(initialValues.pickup || '');
  const [destination, setDestination] = useState(initialValues.destination || '');
  const [error, setError] = useState('');

  const tripTypes = [
    { value: 'airport_transfer', label: 'Airport Transfer' },
    { value: 'local_4h_40km', label: 'Local City Trip' },
    { value: 'outstation_oneway', label: 'Outstation One-Way' },
    { value: 'outstation_round', label: 'Outstation Round Trip' },
    { value: 'group_travel', label: 'Group / Family Travel' },
  ];

  const handleContinueBooking = (e) => {
    e.preventDefault();
    if (!pickup.trim()) {
      setError('Please provide a pickup location.');
      return;
    }
    if (!destination.trim()) {
      setError('Please provide a destination.');
      return;
    }
    setError('');

    // Navigate to /booking with pre-populated query state
    navigate('/booking', {
      state: {
        prefill: {
          tripType,
          pickupLocation: pickup.trim(),
          destination: destination.trim(),
        },
      },
    });
  };

  const handleQuickWhatsApp = () => {
    if (!pickup.trim() || !destination.trim()) {
      setError('Please fill pickup and destination for quick WhatsApp enquiry.');
      return;
    }
    setError('');

    const text = `Hello Vicky, I am looking for a ride with SKB Tour and Travels.\nTrip: ${tripType}\nPickup: ${pickup}\nDestination: ${destination}\nPlease advise availability & fare.`;
    window.open(createWhatsAppQuickUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="quick-search-wrapper">
      <div className="quick-search-glass-card">
        <div className="quick-search-header">
          <div className="search-pill">
            <span className="search-dot" />
            <span>Fast Travel Enquiry</span>
          </div>
          <span className="search-sub-info">Direct Dispatch • Airport Area, Bengaluru</span>
        </div>

        <form onSubmit={handleContinueBooking} className="quick-search-form">
          {/* Trip Type Selector */}
          <div className="search-field-group">
            <label htmlFor="quick-trip-type" className="search-label">
              <Navigation size={15} className="label-icon text-gold" />
              <span>Trip Type</span>
            </label>
            <div className="select-wrapper">
              <select
                id="quick-trip-type"
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="search-select"
              >
                {tripTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pickup Field */}
          <div className="search-field-group">
            <label htmlFor="quick-pickup" className="search-label">
              <MapPin size={15} className="label-icon text-gold" />
              <span>Pickup Point</span>
            </label>
            <input
              id="quick-pickup"
              type="text"
              placeholder="e.g. Airport Terminal 1 or Whitefield"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                if (error) setError('');
              }}
              className="search-input"
            />
          </div>

          {/* Destination Field */}
          <div className="search-field-group">
            <label htmlFor="quick-destination" className="search-label">
              <MapPin size={15} className="label-icon text-gold" />
              <span>Destination</span>
            </label>
            <input
              id="quick-destination"
              type="text"
              placeholder="e.g. Mysore, Electronic City, Coorg"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                if (error) setError('');
              }}
              className="search-input"
            />
          </div>

          {/* Actions */}
          <div className="search-actions-group">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<ArrowRight size={16} />}
              className="btn-search-submit"
            >
              Continue Booking
            </Button>

            <button
              type="button"
              onClick={handleQuickWhatsApp}
              className="btn-search-wa"
              title="Quick WhatsApp Enquiry"
            >
              <MessageCircle size={18} />
              <span>WhatsApp</span>
            </button>
          </div>
        </form>

        {error && <div className="quick-search-error">{error}</div>}
      </div>
    </div>
  );
}
