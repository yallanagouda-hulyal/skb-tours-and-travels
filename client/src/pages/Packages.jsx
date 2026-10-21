import React from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Clock,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Phone,
  MessageCircle,
} from 'lucide-react';
import './Packages.css';

export default function Packages() {
  return (
    <div className="packages-page-root">
      {/* 1. Header Banner */}
      <section className="packages-banner-navy" aria-label="Packages and Pricing Banner">
        <div className="container packages-banner-grid">
          <div className="packages-banner-left">
            <h1 className="packages-main-title">Packages & Pricing</h1>
            <h2 className="packages-main-sub">Flexible Packages for Every Journey</h2>
            <p className="packages-main-desc">Choose the best travel plan as per your need.</p>
          </div>

          <div className="packages-banner-right">
            <img
              src="/assets/images/hero-airport-uhd.jpg"
              alt="SKB Travel Packages Fleet"
              className="packages-banner-fleet-img"
            />
          </div>
        </div>
      </section>

      {/* 2. Four Pricing Cards Row */}
      <section className="pricing-cards-section" aria-label="Pricing Packages">
        <div className="container">
          <div className="pricing-cards-grid-4">
            {/* Card 1: Local 4 Hours */}
            <div className="pricing-card-box">
              <div className="pricing-card-header">
                <h3>Local 4</h3>
                <span>Hours / 40 KM</span>
              </div>
              <div className="pricing-card-body">
                <div className="price-big-text">₹1,200</div>
                <div className="price-pill-tag">Best for Short Trips</div>

                <ul className="pricing-points-list">
                  <li><span className="dot">•</span> 4 Hours / 40 KM</li>
                  <li><span className="dot">•</span> Extra Hour: ₹150</li>
                  <li><span className="dot">•</span> Extra KM: ₹13</li>
                </ul>

                <span className="pricing-conditions-small">Conditions apply</span>

                <Link
                  to="/booking"
                  state={{ prefill: { tripType: 'local_4h_40km' } }}
                  className="btn-book-now-gold"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Card 2: Local 8 Hours (Most Popular) */}
            <div className="pricing-card-box featured-pricing-box">
              <div className="popular-ribbon-gold">Most Popular</div>
              <div className="pricing-card-header">
                <h3>Local 8</h3>
                <span>Hours / 80 KM</span>
              </div>
              <div className="pricing-card-body">
                <div className="price-big-text">₹1,900</div>
                <div className="price-pill-tag">Best for Day Trips</div>

                <ul className="pricing-points-list">
                  <li><span className="dot">•</span> 8 Hours / 80 KM</li>
                  <li><span className="dot">•</span> Extra Hour: ₹150</li>
                  <li><span className="dot">•</span> Extra KM: ₹13</li>
                </ul>

                <span className="pricing-conditions-small">Conditions apply</span>

                <Link
                  to="/booking"
                  state={{ prefill: { tripType: 'local_8h_80km' } }}
                  className="btn-book-now-gold"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Card 3: Outstation Trips */}
            <div className="pricing-card-box">
              <div className="pricing-card-header">
                <h3>Outstation</h3>
                <span>Trips</span>
              </div>
              <div className="pricing-card-body">
                <div className="price-big-text">₹13 / KM</div>
                <div className="price-pill-tag">Best for Long Travel</div>

                <ul className="pricing-points-list">
                  <li><span className="dot">•</span> Minimum 300 KM per day (average)</li>
                  <li><span className="dot">•</span> One-way & Round Trip</li>
                  <li><span className="dot">•</span> Driver Charges (Night): ₹400 (Separate)</li>
                  <li><span className="dot">•</span> All India Travel Available</li>
                </ul>

                <Link
                  to="/booking"
                  state={{ prefill: { tripType: 'outstation_round' } }}
                  className="btn-book-now-gold"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Card 4: Airport Transfer */}
            <div className="pricing-card-box">
              <div className="pricing-card-header">
                <h3>Airport</h3>
                <span>Transfer</span>
              </div>
              <div className="pricing-card-body">
                <div className="price-big-text">₹21 / KM</div>
                <div className="price-pill-tag">Airport Pickup & Drop</div>

                <ul className="pricing-points-list">
                  <li><span className="dot">•</span> Airport pickup & drop</li>
                  <li><span className="dot">•</span> KM wise calculation</li>
                  <li><span className="dot">•</span> Toll separate (Not included)</li>
                  <li><span className="dot">•</span> Comfortable & reliable</li>
                </ul>

                <Link
                  to="/booking"
                  state={{ prefill: { tripType: 'airport_transfer' } }}
                  className="btn-book-now-gold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Included in Our Packages Strip (Warm Cream & White Card Theme) */}
      <section className="included-strip-section" aria-label="Included In Our Packages">
        <div className="container">
          <div className="included-header-center">
            <div className="included-tagline-gold">
              <span className="tagline-dash" />
              <span>STANDARD WITH EVERY TRIP</span>
              <span className="tagline-dash" />
            </div>
            <h3 className="included-title">
              Included in <span className="included-gold-serif">Our Packages</span>
            </h3>
            <div className="included-gold-underline" />
          </div>

          <div className="included-cards-grid">
            <div className="included-feature-card">
              <div className="inc-icon-bubble">
                <Car size={22} className="inc-icon-navy" />
              </div>
              <div className="inc-card-content">
                <h4 className="inc-card-title">AC & Non-AC Vehicles</h4>
                <p className="inc-card-desc">Sedans, Innova Crysta, TT & Urbania</p>
              </div>
            </div>

            <div className="included-feature-card">
              <div className="inc-icon-bubble">
                <ShieldCheck size={22} className="inc-icon-navy" />
              </div>
              <div className="inc-card-content">
                <h4 className="inc-card-title">Professional Drivers</h4>
                <p className="inc-card-desc">Verified, polite & highway-experienced</p>
              </div>
            </div>

            <div className="included-feature-card">
              <div className="inc-icon-bubble">
                <Clock size={22} className="inc-icon-navy" />
              </div>
              <div className="inc-card-content">
                <h4 className="inc-card-title">24/7 Support</h4>
                <p className="inc-card-desc">Real-time flight tracking & helpdesk</p>
              </div>
            </div>

            <div className="included-feature-card">
              <div className="inc-icon-bubble">
                <Sparkles size={22} className="inc-icon-navy" />
              </div>
              <div className="inc-card-content">
                <h4 className="inc-card-title">Clean & Safe Travel</h4>
                <p className="inc-card-desc">Sanitized interiors & luggage assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pricing Conditions (Luxury Split Card with High-Res Frame) */}
      <section className="pricing-conditions-section" aria-label="Pricing Conditions">
        <div className="container">
          <div className="conditions-luxury-card">
            <div className="conditions-left-list">
              <div className="conditions-header-block">
                <span className="conditions-tagline-gold">TRANSPARENT BILLING</span>
                <h3 className="conditions-heading">
                  Pricing <span className="conditions-gold-serif">Conditions</span>
                </h3>
                <p className="conditions-sub-info">
                  We believe in 100% fare clarity with zero hidden surprises. Every trip condition is communicated upfront.
                </p>
              </div>

              <div className="conditions-items-grid">
                <div className="condition-item-pill">
                  <span className="cond-check-bullet">✓</span>
                  <div>
                    <strong>Tolls & FASTag:</strong>
                    <span> Toll plaza charges are separate and billed at actuals.</span>
                  </div>
                </div>

                <div className="condition-item-pill">
                  <span className="cond-check-bullet">✓</span>
                  <div>
                    <strong>Parking & Permits:</strong>
                    <span> Airport/mall parking and interstate border permits are extra.</span>
                  </div>
                </div>

                <div className="condition-item-pill">
                  <span className="cond-check-bullet">✓</span>
                  <div>
                    <strong>Final Binding Fare:</strong>
                    <span> Fare depends on exact route, preferred vehicle & travel dates.</span>
                  </div>
                </div>

                <div className="condition-item-pill">
                  <span className="cond-check-bullet">✓</span>
                  <div>
                    <strong>Outstation Average:</strong>
                    <span> Standard minimum 300 KM per day billing for outstation journeys.</span>
                  </div>
                </div>

                <div className="condition-item-pill">
                  <span className="cond-check-bullet">✓</span>
                  <div>
                    <strong>Driver Night Allowance:</strong>
                    <span> ₹400 night allowance applicable between 10:00 PM and 6:00 AM.</span>
                  </div>
                </div>

                <div className="condition-item-pill">
                  <span className="cond-check-bullet">✓</span>
                  <div>
                    <strong>Prior Confirmation:</strong>
                    <span> Please confirm vehicle availability and written quote with Vicky.</span>
                  </div>
                </div>
              </div>

              <div className="conditions-action-row">
                <a
                  href="tel:9035897960"
                  className="cond-call-btn"
                  aria-label="Call Vicky on 9035897960"
                >
                  <Phone size={16} />
                  <span>Call: +91 90358 97960</span>
                </a>
                <a
                  href={`https://wa.me/919035897960?text=${encodeURIComponent(
                    'Hello Vicky, I would like to confirm pricing and vehicle availability for my journey.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cond-wa-btn"
                  aria-label="Enquire on WhatsApp"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Quote</span>
                </a>
              </div>
            </div>

            <div className="conditions-right-img">
              <div className="conditions-img-frame">
                <img
                  src="/assets/images/card-sedan.png"
                  alt="SKB Travels Fleet"
                  className="conditions-car-photo"
                />
                <div className="conditions-float-badge">
                  <CheckCircle size={15} />
                  <span>100% Fare Transparency</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
