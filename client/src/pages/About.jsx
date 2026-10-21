import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Plane,
  Navigation,
  Compass,
  Users,
  Car,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  HeartHandshake,
  MapPin,
  Clock,
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { BUSINESS_INFO } from '../data/businessInfo';
import './About.css';

export default function About() {
  return (
    <div className="about-page-root">
      {/* 1. Hero Editorial Section */}
      <section className="about-hero-section" aria-label="About SKB Tour and Travels">
        <div className="container">
          <div className="about-hero-editorial">
            <span className="section-tag">
              <HeartHandshake size={13} />
              Our Story & Philosophy
            </span>
            <h1 className="about-hero-headline">
              More Than a Ride. <br />
              <span className="text-gold">A Better Way to Travel.</span>
            </h1>
            <div className="gold-divider" />
            <p className="about-hero-lead">
              Founded on the belief that road travel in India should be effortless, dignified, and clearly communicated. Owned and managed by Vicky from the airport area of Bengaluru (PIN 560300), SKB Tour and Travels serves individuals, families, and corporate organizations across Karnataka and PAN India.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Visual Story Grid */}
      <section className="section-padding story-section" aria-label="Our Operational Focus">
        <div className="container">
          <div className="story-split-grid">
            {/* Left Image Column */}
            <div className="story-image-column">
              <div className="editorial-img-frame">
                <img
                  src="/assets/images/hero-vehicle.jpeg"
                  alt="SKB Tour and Travels Executive Vehicle"
                  className="editorial-img"
                />
                <div className="editorial-caption-glass">
                  <span className="caption-tag">Operational Hub</span>
                  <p className="caption-text">Airport Area, Bengaluru • Rapid Airport & Highway Dispatch</p>
                </div>
              </div>
            </div>

            {/* Right Text Column */}
            <div className="story-text-column">
              <h2 className="story-heading">
                Driven by Comfort, <span className="text-gold">Guided by Integrity</span>
              </h2>
              <div className="gold-divider" />
              <p className="story-paragraph">
                At <strong>SKB Tour and Travels</strong> (registered profile: <em>{BUSINESS_INFO.profileName}</em>), we understand that every journey carries its own unique significance. You might be hurrying to board an international flight at Kempegowda Airport, touring holy temples with elderly parents, or taking an extended road expedition across South India.
              </p>
              <p className="story-paragraph">
                Rather than treating bookings as anonymous tickets, our owner Vicky personally oversees fleet scheduling, driver assignments, and customer inquiries. This hands-on commitment ensures clean interiors, punctual arrivals, and respectful communication from pickup to drop-off.
              </p>

              <div className="values-checklist">
                <div className="val-item">
                  <CheckCircle2 size={18} className="text-gold" />
                  <div>
                    <strong>Punctual Airport Dispatches:</strong> Proximity to Bengaluru Airport allows reliable pickups without unnecessary waiting.
                  </div>
                </div>
                <div className="val-item">
                  <CheckCircle2 size={18} className="text-gold" />
                  <div>
                    <strong>Written Fare Clarity:</strong> Indicative pricing formulas are supported by upfront written confirmation before departure.
                  </div>
                </div>
                <div className="val-item">
                  <CheckCircle2 size={18} className="text-gold" />
                  <div>
                    <strong>Care for Groups & Families:</strong> Safe driving, courteous coordination, and spacious vehicles designed for luggage ease.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Service Pillars */}
      <section className="section-padding pillars-section" aria-label="Our Core Pillars">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <ShieldCheck size={13} />
              Comprehensive Coverage
            </span>
            <h2 className="section-title">
              What We <span className="text-gold">Deliver Everyday</span>
            </h2>
            <div className="gold-divider gold-divider-center" />
            <p className="section-description">
              Dedicated transit solutions designed to eliminate the uncertainties of local and highway road travel.
            </p>
          </div>

          <div className="pillars-grid">
            <GlassCard className="pillar-card">
              <div className="pillar-icon-box">
                <Plane size={24} className="text-gold" />
              </div>
              <h3 className="pillar-title">Kempegowda Airport Transfers</h3>
              <p className="pillar-desc">
                Serving domestic and international terminals (T1 & T2) with flight tracking, prompt baggage handling, and punctual pickups in sedans and Innova Crysta.
              </p>
            </GlassCard>

            <GlassCard className="pillar-card">
              <div className="pillar-icon-box">
                <Navigation size={24} className="text-gold" />
              </div>
              <h3 className="pillar-title">Local City Rental Packages</h3>
              <p className="pillar-desc">
                Convenient 4-hour (40 km) and 8-hour (80 km) packages with a dedicated vehicle and driver at your disposal for city shopping, business meetings, or events.
              </p>
            </GlassCard>

            <GlassCard className="pillar-card">
              <div className="pillar-icon-box">
                <Compass size={24} className="text-gold" />
              </div>
              <h3 className="pillar-title">Outstation & Highway Journeys</h3>
              <p className="pillar-desc">
                Transparent billing starting at an indicative rate of ₹13/km. Covering Karnataka, Tamil Nadu, Kerala, Andhra Pradesh, and PAN India itineraries.
              </p>
            </GlassCard>

            <GlassCard className="pillar-card">
              <div className="pillar-icon-box">
                <Users size={24} className="text-gold" />
              </div>
              <h3 className="pillar-title">Family & Group Logistics</h3>
              <p className="pillar-desc">
                Force Travellers and luxury Urbanias configured for comfortable group travel, family vacations, temple circuits, and corporate delegate transport.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. Contact Principle Callout */}
      <section className="section-padding owner-commitment-section" aria-label="Owner Direct Commitment">
        <div className="container">
          <div className="owner-card">
            <div className="owner-content-wrap">
              <div className="owner-badge-tag">
                <ShieldCheck size={16} className="text-gold" />
                <span>Direct Access to Leadership</span>
              </div>
              <h3 className="owner-card-headline">
                Speak Directly with Vicky for Your Next Trip
              </h3>
              <p className="owner-card-text">
                We take pride in direct accountability. When you have questions regarding toll guidelines, outstation driver allowances, or multi-day trip schedules, you can reach out directly to the owner via phone or WhatsApp.
              </p>

              <div className="owner-details-row">
                <div className="owner-detail-item">
                  <span className="detail-label">Primary Hotline</span>
                  <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="detail-val text-gold">
                    {BUSINESS_INFO.primaryPhoneDisplay}
                  </a>
                </div>

                <div className="owner-detail-item">
                  <span className="detail-label">Alternate Hotline</span>
                  <a href={`tel:${BUSINESS_INFO.alternatePhone}`} className="detail-val">
                    {BUSINESS_INFO.alternatePhoneDisplay}
                  </a>
                </div>

                <div className="owner-detail-item">
                  <span className="detail-label">Email Enquiries</span>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="detail-val">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="owner-cta-wrap">
                <Button to="/booking" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                  Plan Your Journey
                </Button>
                <Button to="/fleet" variant="secondary" size="lg" icon={<Car size={18} />}>
                  Explore Our Fleet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
