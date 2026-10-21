import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Navigation, Compass, Users, Briefcase } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <div className="about-page-root">
      {/* 1. Header Banner */}
      <section className="about-banner-navy" aria-label="About Us Banner">
        <div className="container about-banner-grid">
          <div className="about-banner-left">
            <h1 className="about-main-heading">
              More Than a Ride.<br />
              <span className="about-gold-text">A Better Way to Travel.</span>
            </h1>

            <p className="about-main-desc">
              SKB Tour and Travels is committed to providing comfortable, reliable and well-planned travel services for individuals and groups.
            </p>

            <Link to="/booking" className="btn-plan-journey-gold">
              Plan Your Journey
            </Link>
          </div>

          <div className="about-banner-right">
            <img
              src="/assets/images/mysore-fleet-banner.png"
              alt="SKB Fleet Lineup in Front of Palace"
              className="about-palace-fleet-img"
            />
          </div>
        </div>
      </section>

      {/* 2. Our Services Strip (White) */}
      <section className="about-services-strip" aria-label="Our Services">
        <div className="container">
          <h2 className="about-strip-heading">Our Services</h2>

          <div className="about-services-5-row">
            <div className="about-service-item">
              <div className="about-icon-circle">
                <Car size={20} className="text-gold" />
              </div>
              <div className="about-service-text">
                <h4>Multiple Vehicle Options</h4>
                <p>Hassle-free pickup & drop</p>
              </div>
            </div>

            <div className="about-service-item">
              <div className="about-icon-circle">
                <Navigation size={20} className="text-gold" />
              </div>
              <div className="about-service-text">
                <h4>Local Trips</h4>
                <p>City travel with flexible packages</p>
              </div>
            </div>

            <div className="about-service-item">
              <div className="about-icon-circle">
                <Compass size={20} className="text-gold" />
              </div>
              <div className="about-service-text">
                <h4>Outstation Travel</h4>
                <p>One-way & round trips</p>
              </div>
            </div>

            <div className="about-service-item">
              <div className="about-icon-circle">
                <Users size={20} className="text-gold" />
              </div>
              <div className="about-service-text">
                <h4>Family & Group Travel</h4>
                <p>Comfortable travel for all</p>
              </div>
            </div>

            <div className="about-service-item">
              <div className="about-icon-circle">
                <Briefcase size={20} className="text-gold" />
              </div>
              <div className="about-service-text">
                <h4>Corporate Travel</h4>
                <p>Reliable and timely service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Your Trusted Travel Partner (Left text, Right mountain car photo) */}
      <section className="trusted-partner-section" aria-label="Your Trusted Travel Partner">
        <div className="container">
          <div className="trusted-partner-grid">
            <div className="trusted-left-text">
              <h2 className="trusted-heading">Your Trusted Travel Partner</h2>
              <p className="trusted-paragraph">
                We focus on providing clean vehicles, experienced drivers and clear fare communication, so that you can enjoy your journey with peace of mind.
              </p>
              <Link to="/booking" className="btn-book-your-ride-gold">
                Book Your Ride
              </Link>
            </div>

            <div className="trusted-right-img">
              <img
                src="/assets/images/mountain-vehicle.png"
                alt="SKB Travels Mountain Route"
                className="mountain-car-img"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
