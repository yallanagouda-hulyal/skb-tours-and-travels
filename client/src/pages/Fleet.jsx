import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Users,
  Check,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Info,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { FLEET_DATA } from '../data/fleetData';
import { BUSINESS_INFO } from '../data/businessInfo';
import { createWhatsAppQuickUrl } from '../utils/whatsapp';
import './Fleet.css';

export default function Fleet() {
  const [selectedVehicleForEnquiry, setSelectedVehicleForEnquiry] = useState(
    'Toyota Innova Crysta'
  );

  const handleCustomWhatsAppEnquiry = (e) => {
    e.preventDefault();
    const msg = `Hello Vicky, I am looking to enquire about vehicle availability for: *${selectedVehicleForEnquiry}* with SKB Tour and Travels.\nPlease let me know pricing and dates.`;
    window.open(createWhatsAppQuickUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fleet-page-root">
      {/* 1. Header Banner */}
      <section className="fleet-hero-banner" aria-label="Fleet Overview">
        <div className="fleet-hero-bg">
          <img
            src="/assets/images/fleet-banner.jpeg"
            alt="SKB Tour and Travels Fleet Lineup"
            className="fleet-hero-img"
          />
          <div className="fleet-hero-overlay" />
        </div>

        <div className="container fleet-hero-container">
          <div className="fleet-hero-content">
            <span className="section-tag">
              <Car size={13} />
              Verified Fleet
            </span>
            <h1 className="fleet-hero-title">
              The Right Ride for <span className="text-gold">Every Road Ahead.</span>
            </h1>
            <div className="gold-divider" />
            <p className="fleet-hero-desc">
              Whether you are catching an early morning flight at Kempegowda Airport, embarking on an interstate pilgrimage, or planning an executive corporate delegation, our fleet offers dependable, well-maintained vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Honest Verification Notice */}
      <div className="container">
        <div className="fleet-verification-banner">
          <div className="verification-icon-wrap">
            <ShieldCheck size={22} className="text-gold" />
          </div>
          <div className="verification-text-block">
            <h4 className="verification-title">Authentic Fleet Commitment</h4>
            <p className="verification-desc">
              We present actual vehicle photographs and confirmed passenger capacities. Where seating configurations vary (such as 12, 14, or 17 seater Force Travellers), we state <em>"Confirm availability"</em> so you receive exact, honest details prior to booking.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Vehicle Discovery Grid */}
      <section className="section-padding fleet-grid-section" aria-label="Vehicle Cards">
        <div className="container">
          <div className="fleet-full-grid">
            {FLEET_DATA.map((vehicle) => (
              <GlassCard key={vehicle.id} className="fleet-detail-card" hoverEffect={true}>
                {/* Image Section */}
                <div className="fleet-img-wrap">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="fleet-card-img"
                    loading="lazy"
                  />
                  <div className="fleet-badge-floating">{vehicle.badge}</div>
                  <div className="fleet-category-sub">{vehicle.category}</div>
                </div>

                {/* Details Section */}
                <div className="fleet-card-content">
                  <h3 className="fleet-vehicle-name">{vehicle.name}</h3>

                  <div className="fleet-capacity-indicator">
                    <Users size={16} className="text-gold" />
                    <span className="fleet-cap-label">Passenger Capacity:</span>
                    <span
                      className={`fleet-cap-status ${
                        vehicle.hasConfirmedCapacity ? 'cap-confirmed' : 'cap-pending'
                      }`}
                    >
                      {vehicle.verifiedCapacity}
                    </span>
                  </div>

                  <p className="fleet-vehicle-description">{vehicle.description}</p>

                  {/* Suitable Travel Types */}
                  <div className="fleet-features-block">
                    <span className="block-label">Suitable Travel Types:</span>
                    <div className="travel-types-chips">
                      {vehicle.suitableFor.map((trip, idx) => (
                        <span key={idx} className="trip-chip">
                          {trip}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="fleet-features-block">
                    <span className="block-label">Key Highlights:</span>
                    <ul className="vehicle-highlights-list">
                      {vehicle.features.map((feat, idx) => (
                        <li key={idx} className="highlight-item">
                          <CheckCircle2 size={13} className="text-gold feat-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Actions */}
                  <div className="fleet-card-action-bar">
                    <Button
                      to="/booking"
                      state={{ prefill: { preferredVehicle: vehicle.name } }}
                      variant="primary"
                      size="md"
                      className="btn-fleet-book"
                    >
                      <span>Enquire Now</span>
                      <ArrowRight size={15} />
                    </Button>

                    <a
                      href={createWhatsAppQuickUrl(
                        `Hello Vicky, I would like to check availability for ${vehicle.name} with SKB Tour and Travels.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-fleet-wa"
                      title="Enquire on WhatsApp"
                    >
                      <MessageSquare size={16} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Need a Specific Vehicle?" Enquiry Section */}
      <section className="section-padding custom-vehicle-section" aria-label="Need a Specific Vehicle">
        <div className="container">
          <div className="custom-vehicle-card">
            <div className="custom-vehicle-grid">
              <div className="custom-left-info">
                <span className="section-tag">
                  <Sparkles size={13} />
                  Custom Fleet Logistics
                </span>
                <h2 className="custom-title">
                  Need a Specific <span className="text-gold">Vehicle or Convoy?</span>
                </h2>
                <div className="gold-divider" />
                <p className="custom-desc">
                  Planning a multi-car wedding convoy, an executive corporate delegation, or requiring an exact luxury specification? Vicky coordinates specialized vehicles on request across Karnataka and interstate circuits.
                </p>

                <div className="custom-perks-list">
                  <div className="custom-perk-item">
                    <CheckCircle2 size={16} className="text-gold" />
                    <span>Direct coordination with owner Vicky</span>
                  </div>
                  <div className="custom-perk-item">
                    <CheckCircle2 size={16} className="text-gold" />
                    <span>Written fare confirmation prior to booking</span>
                  </div>
                  <div className="custom-perk-item">
                    <CheckCircle2 size={16} className="text-gold" />
                    <span>Airport area dispatch & PAN India coverage</span>
                  </div>
                </div>
              </div>

              <div className="custom-right-form">
                <div className="custom-form-glass">
                  <h4 className="form-box-title">Instant Vehicle Availability Check</h4>
                  <p className="form-box-sub">Select your desired model and connect directly via WhatsApp.</p>

                  <form onSubmit={handleCustomWhatsAppEnquiry} className="custom-quick-form">
                    <div className="form-group">
                      <label htmlFor="custom-vehicle-select" className="custom-label">
                        Vehicle Model
                      </label>
                      <select
                        id="custom-vehicle-select"
                        value={selectedVehicleForEnquiry}
                        onChange={(e) => setSelectedVehicleForEnquiry(e.target.value)}
                        className="custom-select"
                      >
                        {FLEET_DATA.map((v) => (
                          <option key={v.id} value={v.name}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button
                      type="submit"
                      variant="whatsapp"
                      size="lg"
                      icon={<MessageSquare size={18} />}
                      className="btn-custom-wa"
                    >
                      Check Availability on WhatsApp
                    </Button>

                    <div className="custom-form-call-note">
                      <span>Prefer to speak directly?</span>
                      <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="text-gold font-bold">
                        Call {BUSINESS_INFO.primaryPhoneDisplay}
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
