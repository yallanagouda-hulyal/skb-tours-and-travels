import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  Plane,
  Users,
  Car,
  Navigation,
  Check,
  CheckCircle2,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import QuickSearch from '../components/booking/QuickSearch';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { BUSINESS_INFO } from '../data/businessInfo';
import { FLEET_DATA } from '../data/fleetData';
import { PACKAGES_DATA } from '../data/packagesData';
import './Home.css';

export default function Home() {
  const featuredVehicles = FLEET_DATA.slice(0, 4);

  return (
    <div className="home-page-root">
      {/* 1. Hero Banner */}
      <section className="hero-section" aria-label="Welcome to SKB Tour and Travels">
        <div className="hero-background-wrapper">
          <img
            src="/assets/images/hero-vehicle.jpeg"
            alt="SKB Tour and Travels Premium Fleet"
            className="hero-bg-img"
          />
          <div className="hero-overlay-gradient" />
          <div className="hero-overlay-radial" />
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge-tag">
              <Sparkles size={14} className="text-gold" />
              <span>SKB Tour and Travels • Airport Area, Bengaluru</span>
            </div>

            <h1 className="hero-headline">
              Every Mile, <br />
              <span className="text-gold">Made Memorable.</span>
            </h1>

            <p className="hero-subtext">
              Airport transfers, city rides and outstation escapes — travel with comfort, confidence and a team that cares.
            </p>

            <div className="hero-cta-group">
              <Button
                to="/booking"
                variant="primary"
                size="lg"
                icon={<ArrowRight size={18} />}
                className="btn-hero-primary"
              >
                Plan Your Journey
              </Button>

              <Button
                to="/fleet"
                variant="secondary"
                size="lg"
                icon={<Car size={18} />}
                className="btn-hero-secondary"
              >
                Explore Our Fleet
              </Button>
            </div>

            {/* Glass Travel Information Cards */}
            <div className="hero-floating-cards-grid">
              <div className="hero-glass-pill">
                <div className="pill-icon-frame">
                  <Plane size={18} className="text-gold" />
                </div>
                <div className="pill-text-block">
                  <span className="pill-title">Airport Transfers</span>
                  <span className="pill-desc">Serving Kempegowda Terminals</span>
                </div>
              </div>

              <div className="hero-glass-pill">
                <div className="pill-icon-frame">
                  <Clock size={18} className="text-gold" />
                </div>
                <div className="pill-text-block">
                  <span className="pill-title">24/7 Booking Support</span>
                  <span className="pill-desc">Prompt owner communication</span>
                </div>
              </div>

              <div className="hero-glass-pill">
                <div className="pill-icon-frame">
                  <Compass size={18} className="text-gold" />
                </div>
                <div className="pill-text-block">
                  <span className="pill-title">PAN India Travel</span>
                  <span className="pill-desc">Karnataka & interstate tours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Quick Trip Enquiry Search Panel */}
      <section className="search-section" aria-label="Trip Enquiry Form">
        <QuickSearch />
      </section>

      {/* 3. Services Section */}
      <section className="section-padding services-section" aria-label="Our Travel Services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Navigation size={13} />
              Tailored Travel
            </span>
            <h2 className="section-title">
              Thoughtfully Designed <span className="text-gold">Travel Services</span>
            </h2>
            <div className="gold-divider gold-divider-center" />
            <p className="section-description">
              Whether you need a swift airport drop, a full day in the city, or a multi-day family pilgrimage, SKB Tour and Travels ensures dependable vehicles and upfront coordination.
            </p>
          </div>

          <div className="services-grid">
            {/* Service 1 */}
            <GlassCard className="service-card">
              <div className="service-icon-box">
                <Plane size={26} className="text-gold" />
              </div>
              <span className="service-category">Airport Special</span>
              <h3 className="service-card-title">Airport Transfers</h3>
              <p className="service-card-desc">
                Punctual, stress-free pickup and drop to and from Kempegowda International Airport (BLR). Flight tracking, timely arrival, and luggage assistance.
              </p>
              <div className="service-card-footer">
                <Link to="/booking" state={{ prefill: { tripType: 'airport_transfer' } }} className="service-action-link">
                  <span>Enquire Airport Ride</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </GlassCard>

            {/* Service 2 */}
            <GlassCard className="service-card">
              <div className="service-icon-box">
                <Navigation size={26} className="text-gold" />
              </div>
              <span className="service-category">City Packages</span>
              <h3 className="service-card-title">Local City Rides</h3>
              <p className="service-card-desc">
                Dedicated 4-hour (40 km) and 8-hour (80 km) city rental packages. Effortless city meetings, family shopping outings, and medical consultations.
              </p>
              <div className="service-card-footer">
                <Link to="/packages" className="service-action-link">
                  <span>View Hourly Packages</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </GlassCard>

            {/* Service 3 */}
            <GlassCard className="service-card">
              <div className="service-icon-box">
                <Compass size={26} className="text-gold" />
              </div>
              <span className="service-category">Intercity Travel</span>
              <h3 className="service-card-title">Outstation Journeys</h3>
              <p className="service-card-desc">
                Smooth highway travel with transparent per-kilometre billing (₹13/km indicative). Available for one-way drops, round trips, and customized PAN India tours.
              </p>
              <div className="service-card-footer">
                <Link to="/booking" state={{ prefill: { tripType: 'outstation_round' } }} className="service-action-link">
                  <span>Plan Outstation Trip</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </GlassCard>

            {/* Service 4 */}
            <GlassCard className="service-card">
              <div className="service-icon-box">
                <Users size={26} className="text-gold" />
              </div>
              <span className="service-category">Spacious Van</span>
              <h3 className="service-card-title">Family & Group Travel</h3>
              <p className="service-card-desc">
                High-roof Force Travellers and premium Urbania vans for large families, tourist excursions, wedding guests, and corporate team events.
              </p>
              <div className="service-card-footer">
                <Link to="/fleet" className="service-action-link">
                  <span>Explore Group Vehicles</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. Featured Fleet Section */}
      <section className="section-padding fleet-preview-section" aria-label="Our Fleet Preview">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Car size={13} />
              Actual Photographs
            </span>
            <h2 className="section-title">
              Our Curated <span className="text-gold">Vehicle Fleet</span>
            </h2>
            <div className="gold-divider gold-divider-center" />
            <p className="section-description">
              Clean, well-maintained, and inspected vehicles. Browse confirmed vehicle categories below and enquire directly with Vicky for availability.
            </p>
          </div>

          <div className="fleet-cards-grid">
            {featuredVehicles.map((vehicle) => (
              <GlassCard key={vehicle.id} className="vehicle-card">
                <div className="vehicle-img-frame">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="vehicle-img"
                    loading="lazy"
                  />
                  <div className="vehicle-category-badge">{vehicle.category}</div>
                </div>

                <div className="vehicle-card-body">
                  <h3 className="vehicle-title">{vehicle.name}</h3>

                  <div className="vehicle-capacity-row">
                    <span className="capacity-label">Seating Capacity:</span>
                    <span className={`capacity-val ${vehicle.hasConfirmedCapacity ? 'confirmed-val' : 'pending-val'}`}>
                      {vehicle.verifiedCapacity}
                    </span>
                  </div>

                  <p className="vehicle-short-desc">{vehicle.description}</p>

                  <div className="vehicle-tags-wrap">
                    {vehicle.suitableFor.slice(0, 2).map((item, idx) => (
                      <span key={idx} className="vehicle-mini-tag">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="vehicle-card-action">
                    <Button
                      to="/booking"
                      state={{ prefill: { preferredVehicle: vehicle.name } }}
                      variant="primary"
                      size="sm"
                      className="btn-vehicle-enquire"
                    >
                      Enquire Now
                    </Button>
                    <Link to="/fleet" className="btn-vehicle-details">
                      Details
                    </Link>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="fleet-view-all-cta">
            <Button
              to="/fleet"
              variant="outline"
              size="lg"
              icon={<ArrowRight size={18} />}
            >
              View All Vehicles & Fleet Specifications
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Popular Packages Section */}
      <section className="section-padding packages-preview-section" aria-label="Popular Packages">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Sparkles size={13} />
              Indicative Pricing
            </span>
            <h2 className="section-title">
              Clear & Transparent <span className="text-gold">Trip Packages</span>
            </h2>
            <div className="gold-divider gold-divider-center" />
            <p className="section-description">
              Transparent rate baselines with no hidden surprises. All fares are confirmed in writing before your trip begins.
            </p>
          </div>

          <div className="packages-grid">
            {PACKAGES_DATA.slice(0, 3).map((pkg) => (
              <GlassCard key={pkg.id} className={`package-card ${pkg.isPopular ? 'popular-package-card' : ''}`}>
                {pkg.isPopular && <div className="popular-ribbon">Most Requested</div>}

                <div className="pkg-header">
                  <span className="pkg-category">{pkg.category}</span>
                  <h3 className="pkg-name">{pkg.name}</h3>
                  <div className="pkg-price-block">
                    <span className="pkg-price">{pkg.priceDisplay}</span>
                    <span className="pkg-price-sub">{pkg.priceSubtext}</span>
                  </div>
                </div>

                <div className="pkg-divider" />

                <ul className="pkg-features-list">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="pkg-feature-item">
                      <CheckCircle2 size={16} className="feat-check text-gold" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="pkg-exclusions-box">
                  <span className="exclusions-title">Important Notice:</span>
                  <p className="exclusions-note">Tolls and parking fees are separate and paid as actuals.</p>
                </div>

                <div className="pkg-action-wrap">
                  <Button
                    to="/booking"
                    state={{ prefill: { tripType: pkg.tripTypeKey } }}
                    variant={pkg.isPopular ? 'primary' : 'secondary'}
                    size="md"
                    className="btn-pkg-book"
                  >
                    Enquire This Package
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="packages-view-all-cta">
            <Link to="/packages" className="packages-link-full">
              <span>View Full Packages, Airport Calculations & Fare Guidelines</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why Choose SKB (Service Commitments) */}
      <section className="section-padding why-choose-section" aria-label="Why Choose SKB Tour and Travels">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <ShieldCheck size={13} />
              Our Commitment
            </span>
            <h2 className="section-title">
              Why Travel With <span className="text-gold">SKB Travels</span>
            </h2>
            <div className="gold-divider gold-divider-center" />
            <p className="section-description">
              We focus on honest communication, well-maintained vehicles, and personal booking coordination handled directly by Vicky.
            </p>
          </div>

          <div className="commitments-grid">
            <div className="commitment-card">
              <div className="commitment-num">01</div>
              <h3 className="commitment-title">Multiple Vehicle Categories</h3>
              <p className="commitment-text">
                From executive Sedans and Innova Crysta to 12+ seater Force Travellers and luxury Urbanias, we provide the right vehicle for solo travelers, families, and corporate groups.
              </p>
            </div>

            <div className="commitment-card">
              <div className="commitment-num">02</div>
              <h3 className="commitment-title">Personal Booking Assistance</h3>
              <p className="commitment-text">
                No automated bots or unhelpful ticket queues. Every enquiry is reviewed personally by Vicky to ensure punctual dispatch and proper vehicle assignment.
              </p>
            </div>

            <div className="commitment-card">
              <div className="commitment-num">03</div>
              <h3 className="commitment-title">Airport & Outstation Coverage</h3>
              <p className="commitment-text">
                Operating directly from the Airport area (PIN 560300), we serve all Kempegowda Airport terminals as well as outstation routes across Karnataka and PAN India.
              </p>
            </div>

            <div className="commitment-card">
              <div className="commitment-num">04</div>
              <h3 className="commitment-title">Clear Fare Confirmation</h3>
              <p className="commitment-text">
                No hidden surprises at the end of the trip. All package inclusions, kilometer calculations, and toll guidelines are communicated before you board.
              </p>
            </div>

            <div className="commitment-card">
              <div className="commitment-num">05</div>
              <h3 className="commitment-title">Family & Group Friendly</h3>
              <p className="commitment-text">
                We cater with special care for senior citizens, young children, and extra luggage needs during pilgrimages, sightseeing tours, and wedding occasions.
              </p>
            </div>

            <div className="commitment-card">
              <div className="commitment-num">06</div>
              <h3 className="commitment-title">24/7 Enquiry Availability</h3>
              <p className="commitment-text">
                Flight delayed or urgent early morning pickup required? Our direct phone and WhatsApp hotlines are monitored 24 hours a day, 7 days a week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Travel Call-to-Action */}
      <section className="cta-banner-section" aria-label="Book Ride Call to Action">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-content">
              <span className="cta-pill">Ready to Travel?</span>
              <h2 className="cta-heading">Your Next Journey Starts Here.</h2>
              <p className="cta-subtext">
                Get an instant quote and verify vehicle availability for your upcoming airport transfer or outstation escape.
              </p>
              <div className="cta-actions">
                <Button to="/booking" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                  Book Your Ride
                </Button>
                <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="cta-phone-btn">
                  <PhoneCall size={18} />
                  <span>Call {BUSINESS_INFO.primaryPhoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
