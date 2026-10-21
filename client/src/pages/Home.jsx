import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plane,
  Car,
  Compass,
  Users,
  Clock,
  ShieldCheck,
  MapPin,
  Check,
  ArrowRight,
  PhoneCall,
  Calendar,
} from 'lucide-react';
import { FLEET_DATA } from '../data/fleetData';
import { BUSINESS_INFO } from '../data/businessInfo';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  // Quick Trip Enquiry State
  const [tripType, setTripType] = useState('airport_transfer');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');

  const handleSearchEnquiry = (e) => {
    e.preventDefault();
    navigate('/booking', {
      state: {
        prefill: {
          tripType,
          pickupLocation: pickup,
          destination,
          travelDate,
        },
      },
    });
  };

  const popularVehicles = FLEET_DATA.slice(0, 4);

  return (
    <div className="home-page-root">
      {/* 1. Hero Section */}
      <section className="home-hero-dark" aria-label="Hero Banner">
        <div className="container hero-split-container">
          {/* Left Column: Headline & Action Buttons */}
          <div className="hero-left-col">
            <div className="hero-logo-emblem">
              <img src="/assets/images/skb-logo.jpeg" alt="SKB Crest" className="emblem-img" />
              <div className="emblem-text">
                <span className="emblem-skb">SKB</span>
                <span className="emblem-sub">TOUR AND TRAVELS</span>
              </div>
            </div>

            <h1 className="hero-main-heading">
              Every Mile,<br />
              <span className="hero-gold-text">Made Memorable.</span>
            </h1>

            <p className="hero-main-subtext">
              Airport transfers, city rides and outstation escapes — travel with comfort, confidence and a team that cares.
            </p>

            <div className="hero-button-pair">
              <Link to="/booking" className="btn-hero-gold">
                Plan Your Journey
              </Link>
              <Link to="/fleet" className="btn-hero-dark-outline">
                Explore Our Fleet
              </Link>
            </div>
          </div>

          {/* Right Column: Airport Terminal & Fleet Visual */}
          <div className="hero-right-col">
            <div className="hero-visual-frame">
              <img
                src="/assets/images/airport-hero-banner.png"
                alt="SKB Tour and Travels Airport Fleet"
                className="hero-airport-fleet-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Four Quick Service Highlights Row (White Strip) */}
      <section className="services-strip-white" aria-label="Services Highlights">
        <div className="container">
          <div className="services-strip-grid">
            <div className="service-strip-item">
              <div className="strip-gold-icon">
                <Plane size={20} />
              </div>
              <div className="strip-info">
                <h4 className="strip-title">Airport Transfers</h4>
                <p className="strip-sub">Hassle-free pickup & drop</p>
              </div>
            </div>

            <div className="service-strip-item">
              <div className="strip-gold-icon">
                <Car size={20} />
              </div>
              <div className="strip-info">
                <h4 className="strip-title">Local City Rides</h4>
                <p className="strip-sub">Comfortable city travel</p>
              </div>
            </div>

            <div className="service-strip-item">
              <div className="strip-gold-icon">
                <Compass size={20} />
              </div>
              <div className="strip-info">
                <h4 className="strip-title">Outstation Journeys</h4>
                <p className="strip-sub">One-way & round trips</p>
              </div>
            </div>

            <div className="service-strip-item">
              <div className="strip-gold-icon">
                <Users size={20} />
              </div>
              <div className="strip-info">
                <h4 className="strip-title">Family & Group Travel</h4>
                <p className="strip-sub">Perfect for families & groups</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Trip Enquiry Box (Dark Navy Card with Gold Border) */}
      <section className="quick-enquiry-section" aria-label="Quick Trip Enquiry">
        <div className="container">
          <div className="quick-enquiry-card-navy">
            <h3 className="enquiry-card-title">Quick Trip Enquiry</h3>

            <form onSubmit={handleSearchEnquiry} className="enquiry-form-row">
              <div className="enquiry-field">
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="enquiry-select"
                >
                  <option value="airport_transfer">Trip Type: Airport Transfer</option>
                  <option value="local_4h_40km">Local City Trip (4H / 8H)</option>
                  <option value="outstation_oneway">Outstation One-Way</option>
                  <option value="outstation_round">Outstation Round Trip</option>
                  <option value="group_travel">Family & Group Travel</option>
                </select>
              </div>

              <div className="enquiry-field">
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="enquiry-input"
                />
              </div>

              <div className="enquiry-field">
                <input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="enquiry-input"
                />
              </div>

              <div className="enquiry-field date-field">
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="enquiry-input"
                />
              </div>

              <button type="submit" className="btn-search-enquire-gold">
                Search / Enquire
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 4. Our Popular Vehicles (Light Background with White Cards) */}
      <section className="popular-vehicles-section" aria-label="Our Popular Vehicles">
        <div className="container">
          <h2 className="section-title-dark">Our Popular Vehicles</h2>

          <div className="popular-vehicles-grid">
            {popularVehicles.map((vehicle) => (
              <div key={vehicle.id} className="vehicle-card-white">
                {/* Gold Category Badge */}
                <div className="vehicle-badge-gold">{vehicle.badge}</div>

                {/* Vehicle Image */}
                <div className="vehicle-card-img-wrap">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="vehicle-photo"
                  />
                </div>

                {/* Details */}
                <div className="vehicle-card-text">
                  <h3 className="vehicle-name-dark">{vehicle.name}</h3>

                  <div className="vehicle-seater-row">
                    <Users size={14} className="text-gold" />
                    <span>{vehicle.capacity}</span>
                  </div>

                  <p className="vehicle-tagline-text">{vehicle.description}</p>

                  <Link
                    to="/booking"
                    state={{ prefill: { preferredVehicle: vehicle.name } }}
                    className="btn-enquire-now-pill"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose SKB Tour and Travels (Strip of 6 Icons) */}
      <section className="why-choose-strip-section" aria-label="Why Choose SKB">
        <div className="container">
          <h2 className="section-title-dark">Why Choose SKB Tour and Travels</h2>

          <div className="why-choose-icons-row">
            <div className="why-item">
              <div className="why-icon-circle">
                <Car size={20} className="text-gold" />
              </div>
              <span className="why-label">Multiple Vehicle Options</span>
            </div>

            <div className="why-item">
              <div className="why-icon-circle">
                <Clock size={20} className="text-gold" />
              </div>
              <span className="why-label">24/7 Booking Support</span>
            </div>

            <div className="why-item">
              <div className="why-icon-circle">
                <Plane size={20} className="text-gold" />
              </div>
              <span className="why-label">Airport & Outstation</span>
            </div>

            <div className="why-item">
              <div className="why-icon-circle">
                <ShieldCheck size={20} className="text-gold" />
              </div>
              <span className="why-label">Affordable & Fair Pricing</span>
            </div>

            <div className="why-item">
              <div className="why-icon-circle">
                <Users size={20} className="text-gold" />
              </div>
              <span className="why-label">Family & Group Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "Your Next Journey Starts Here." Banner */}
      <section className="journey-banner-section" aria-label="Your Next Journey Banner">
        <div className="container">
          <div className="journey-cta-navy-card">
            <div className="journey-card-left-img">
              <img
                src="/assets/images/card-sedan.png"
                alt="SKB Travel Car"
                className="journey-car-img"
              />
            </div>

            <div className="journey-card-center-text">
              <h2 className="journey-title">Your Next Journey Starts Here.</h2>
              <p className="journey-sub">Comfort | Safety | Reliability | Affordable Travel</p>
            </div>

            <div className="journey-card-right-btn">
              <Link to="/booking" className="btn-book-your-ride-gold">
                Book Your Ride
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
