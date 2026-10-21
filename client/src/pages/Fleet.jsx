import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ShieldCheck, Clock, MapPin, Car } from 'lucide-react';
import { FLEET_DATA } from '../data/fleetData';
import { createWhatsAppQuickUrl } from '../utils/whatsapp';
import './Fleet.css';

export default function Fleet() {
  return (
    <div className="fleet-page-root">
      {/* 1. Header Banner */}
      <section className="fleet-banner-navy" aria-label="Our Fleet Banner">
        <div className="container fleet-banner-grid">
          <div className="fleet-banner-left">
            <h1 className="fleet-main-title">Our Fleet</h1>
            <h2 className="fleet-main-sub">The Right Ride for Every Road Ahead.</h2>
            <p className="fleet-main-desc">
              Comfortable, clean and well-maintained vehicles for all your travel needs.
            </p>
          </div>

          <div className="fleet-banner-right">
            <img
              src="/assets/images/mysore-fleet-banner.png"
              alt="SKB Fleet Lineup in Front of Palace"
              className="fleet-palace-banner-img"
            />
          </div>
        </div>
      </section>

      {/* 2. Vehicle Cards Grid (2 rows of 3 columns) */}
      <section className="fleet-cards-section" aria-label="Available Vehicles">
        <div className="container">
          <div className="fleet-grid-3x2">
            {FLEET_DATA.map((vehicle) => {
              if (vehicle.isCustomCard) {
                return (
                  <div key={vehicle.id} className="fleet-card-dark-special">
                    <h3 className="special-card-title">{vehicle.name}</h3>
                    <p className="special-card-text">{vehicle.description}</p>
                    <a
                      href={createWhatsAppQuickUrl(
                        'Hello Vicky, I need a specific vehicle not listed on the website. Please advise availability.'
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-enquire-now-pill"
                    >
                      Enquire Now
                    </a>
                  </div>
                );
              }

              return (
                <div key={vehicle.id} className="vehicle-card-white">
                  <div className="vehicle-badge-gold">{vehicle.badge}</div>

                  <div className="vehicle-card-img-wrap">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="vehicle-photo"
                    />
                  </div>

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
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Bottom Feature Badges Strip (Dark Navy) */}
      <section className="fleet-bottom-strip-navy" aria-label="Fleet Service Commitments">
        <div className="container">
          <div className="fleet-commitments-row">
            <div className="commitment-item">
              <div className="commitment-icon-circle">
                <ShieldCheck size={20} className="text-gold" />
              </div>
              <span>Well Maintained Vehicles</span>
            </div>

            <div className="commitment-item">
              <div className="commitment-icon-circle">
                <Car size={20} className="text-gold" />
              </div>
              <span>Experienced Drivers</span>
            </div>

            <div className="commitment-item">
              <div className="commitment-icon-circle">
                <MapPin size={20} className="text-gold" />
              </div>
              <span>All India Travel</span>
            </div>

            <div className="commitment-item">
              <div className="commitment-icon-circle">
                <Clock size={20} className="text-gold" />
              </div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
