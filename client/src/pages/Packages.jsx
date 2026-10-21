import React from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Clock,
  ShieldCheck,
  CheckCircle,
  Sparkles,
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
              src="/assets/images/airport-hero-banner.png"
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

      {/* 3. Included in Our Packages Strip (White Strip) */}
      <section className="included-strip-section" aria-label="Included In Our Packages">
        <div className="container">
          <h3 className="included-title">Included in Our Packages</h3>
          <div className="included-items-row">
            <div className="included-item">
              <div className="inc-icon-circle"><Car size={18} className="text-gold" /></div>
              <span>AC & Non-AC Vehicles</span>
            </div>
            <div className="included-item">
              <div className="inc-icon-circle"><ShieldCheck size={18} className="text-gold" /></div>
              <span>Professional Drivers</span>
            </div>
            <div className="included-item">
              <div className="inc-icon-circle"><Clock size={18} className="text-gold" /></div>
              <span>24/7 Support</span>
            </div>
            <div className="included-item">
              <div className="inc-icon-circle"><Sparkles size={18} className="text-gold" /></div>
              <span>Clean & Safe Travel</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pricing Conditions (2-column layout with car photo on right) */}
      <section className="pricing-conditions-section" aria-label="Pricing Conditions">
        <div className="container">
          <div className="conditions-split-grid">
            <div className="conditions-left-list">
              <h3 className="conditions-heading">Pricing Conditions</h3>
              <ul className="conditions-bullet-points">
                <li><span className="bullet-dot">•</span> Toll charges are separate and not included</li>
                <li><span className="bullet-dot">•</span> Parking and other charges (if any) are extra</li>
                <li><span className="bullet-dot">•</span> Final fare depends on route, vehicle, date and travel conditions</li>
                <li><span className="bullet-dot">•</span> Minimum 300 KM per day average for outstation trips</li>
                <li><span className="bullet-dot">•</span> Driver charges for night travel: ₹400 (separate)</li>
                <li><span className="bullet-dot">•</span> Please confirm the final fare and availability before the journey</li>
              </ul>
            </div>

            <div className="conditions-right-img">
              <img
                src="/assets/images/card-sedan.png"
                alt="SKB Travels Car"
                className="conditions-car-photo"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
