import React from 'react';
import { Link } from 'react-router-dom';
import {
  Car,
  Navigation,
  Compass,
  Users,
  Briefcase,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  Award,
  HeartHandshake,
  Sparkles,
  Plane,
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { createWhatsAppQuickUrl } from '../utils/whatsapp';
import './About.css';

export default function About() {
  return (
    <div className="about-page-root">
      {/* 1. Header Banner */}
      <section className="about-banner-navy" aria-label="About Us Banner">
        <div className="container about-banner-grid">
          <div className="about-banner-left">
            <div className="about-tagline-gold">
              <span className="tagline-dash" />
              <span>ESTABLISHED IN BENGALURU • OWNED BY VICKY</span>
            </div>

            <h1 className="about-main-heading">
              More Than a Ride.<br />
              <span className="about-gold-serif">A Better Way to Travel.</span>
            </h1>

            <p className="about-main-desc">
              Rooted in Bengaluru’s Airport Area (560300), SKB Tour and Travels was built on an unwavering promise: to deliver reliable, executive-class chauffeur experiences with punctual arrivals, honest fares, and warm South Indian hospitality.
            </p>

            <div className="about-banner-actions">
              <Link to="/booking" className="btn-plan-journey-gold">
                <span>Plan Your Journey</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href={createWhatsAppQuickUrl(
                  'Hello Vicky, I would like to know more about SKB Tour and Travels and book a ride.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-about-wa"
              >
                <MessageCircle size={17} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="about-banner-right">
            <div className="about-img-frame">
              <img
                src="/assets/images/mysore-fleet-banner.png"
                alt="SKB Fleet Lineup in Front of Palace"
                className="about-palace-fleet-img"
              />
              <div className="about-badge-glass">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Verified Chauffeur Fleet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The SKB Story & Founder's Vision */}
      <section className="about-story-section" aria-label="Our Story & Founder Vision">
        <div className="container">
          <div className="story-split-grid">
            {/* Left: Founder's Note Card */}
            <div className="founder-message-card">
              <div className="founder-badge-row">
                <Award size={20} className="gold-icon" />
                <span className="founder-label">FOUNDER’S COMMITMENT</span>
              </div>
              <h3 className="founder-title">
                "Every Mile is Our Personal <span className="founder-gold-text">Responsibility</span>"
              </h3>
              <p className="founder-quote-body">
                "When I started SKB Tour and Travels in Bengaluru, my goal was clear: remove the frustration of last-minute cancellations, untidy vehicles, and surge-pricing surprises. 
                <br /><br />
                Whether you are boarding an early 4:00 AM flight at Kempegowda Airport, embarking on a week-long family holiday to Coorg and Ooty, or transporting VIP corporate delegates in an Urbania, you can count on clean cars, courteous drivers, and total billing clarity."
              </p>
              <div className="founder-signature-box">
                <div className="founder-avatar-circle">V</div>
                <div className="founder-info">
                  <h4 className="founder-name">Vicky</h4>
                  <span className="founder-role">Founder & Managing Director, SKB Tour and Travels</span>
                </div>
              </div>
              <div className="founder-contact-pills">
                <a href="tel:7338140524" className="founder-phone-link">
                  <Phone size={14} />
                  <span>+91 73381 40524</span>
                </a>
                <a href="tel:9035897960" className="founder-phone-link alt">
                  <Phone size={14} />
                  <span>+91 90358 97960</span>
                </a>
              </div>
            </div>

            {/* Right: Key Milestones Counter Grid */}
            <div className="milestones-counter-card">
              <div className="milestones-header">
                <span className="milestones-tag">PROVEN RECORD</span>
                <h3 className="milestones-title">Numbers That Reflect Our Dedication</h3>
              </div>
              <div className="milestones-grid-2x2">
                <div className="milestone-box">
                  <span className="milestone-number">350+</span>
                  <span className="milestone-label">Completed Safe Journeys</span>
                  <p className="milestone-sub">Across Karnataka, Tamil Nadu & Kerala</p>
                </div>
                <div className="milestone-box">
                  <span className="milestone-number">24/7</span>
                  <span className="milestone-label">BLR Airport Coverage</span>
                  <p className="milestone-sub">Live flight tracking & zero waiting delay</p>
                </div>
                <div className="milestone-box">
                  <span className="milestone-number">100%</span>
                  <span className="milestone-label">Verified Chauffeurs</span>
                  <p className="milestone-sub">Background-checked & polite professionals</p>
                </div>
                <div className="milestone-box">
                  <span className="milestone-number">4.9 ★</span>
                  <span className="milestone-label">Customer Satisfaction</span>
                  <p className="milestone-sub">Consistent 5-star customer ratings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars of Excellence (Warm Cream & White Cards) */}
      <section className="about-pillars-section" aria-label="Core Pillars of Excellence">
        <div className="container">
          <div className="pillars-header-center">
            <div className="pillars-tagline-gold">
              <span className="tagline-dash" />
              <span>THE SKB ADVANTAGE</span>
              <span className="tagline-dash" />
            </div>
            <h2 className="pillars-section-title">
              The Standards That <span className="pillars-gold-serif">Define Every Journey</span>
            </h2>
            <div className="pillars-gold-underline" />
            <p className="pillars-section-subtitle">
              We uphold strict service protocols to make sure your travel experience is effortless, secure, and memorable.
            </p>
          </div>

          <div className="pillars-cards-grid">
            <div className="pillar-card-luxury">
              <div className="pillar-icon-bubble">
                <ShieldCheck size={26} className="pillar-icon-navy" />
              </div>
              <h3 className="pillar-card-title">Zero-Surge Transparent Fares</h3>
              <p className="pillar-card-desc">
                Clear indicative km rates, transparent toll/night allowances, and zero hidden markups during rain or high-demand hours.
              </p>
            </div>

            <div className="pillar-card-luxury">
              <div className="pillar-icon-bubble">
                <Clock size={26} className="pillar-icon-navy" />
              </div>
              <h3 className="pillar-card-title">Flawless Punctuality Guarantee</h3>
              <p className="pillar-card-desc">
                Real-time flight arrival tracking for BLR Airport and proactive chauffeur arrival 15 minutes ahead of scheduled pickup.
              </p>
            </div>

            <div className="pillar-card-luxury">
              <div className="pillar-icon-bubble">
                <Sparkles size={26} className="pillar-icon-navy" />
              </div>
              <h3 className="pillar-card-title">Spotless & Sanitized Fleet</h3>
              <p className="pillar-card-desc">
                Every vehicle is deep-cleaned and sanitized with pristine air conditioning, verified seatbelts, and spacious legroom.
              </p>
            </div>

            <div className="pillar-card-luxury">
              <div className="pillar-icon-bubble">
                <HeartHandshake size={26} className="pillar-icon-navy" />
              </div>
              <h3 className="pillar-card-title">Experienced Chauffeurs</h3>
              <p className="pillar-card-desc">
                Polite, multilingual drivers with deep familiarity with Karnataka highways, ghat sections, and South Indian tourist routes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Comprehensive Services Showcase */}
      <section className="about-services-strip" aria-label="Our Travel Services">
        <div className="container">
          <div className="services-strip-header">
            <div>
              <span className="services-tag-gold">WHAT WE OFFER</span>
              <h2 className="about-strip-heading">Tailored Travel Solutions for Every Occasion</h2>
            </div>
            <Link to="/packages" className="btn-view-packages-gold">
              <span>View All Packages</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="about-services-5-row">
            <div className="about-service-item service-airport">
              <div className="about-icon-circle">
                <Plane size={24} strokeWidth={2.3} />
              </div>
              <div className="about-service-text">
                <h4>Airport Transfers (BLR)</h4>
                <p>24/7 dedicated terminal pickup & drop with real-time flight tracking.</p>
              </div>
            </div>

            <div className="about-service-item service-local">
              <div className="about-icon-circle">
                <Navigation size={24} strokeWidth={2.3} />
              </div>
              <div className="about-service-text">
                <h4>Local City Packages</h4>
                <p>Comfortable 4-hour and 8-hour city packages for shopping and errands.</p>
              </div>
            </div>

            <div className="about-service-item service-outstation">
              <div className="about-icon-circle">
                <Compass size={24} strokeWidth={2.3} />
              </div>
              <div className="about-service-text">
                <h4>Outstation Journeys</h4>
                <p>One-way drops & round trips to Mysore, Coorg, Ooty, and Tirupati from ₹13/km.</p>
              </div>
            </div>

            <div className="about-service-item service-family">
              <div className="about-icon-circle">
                <Users size={24} strokeWidth={2.3} />
              </div>
              <div className="about-service-text">
                <h4>Family & Group Touring</h4>
                <p>Force Traveller (12–17 seats) & VIP Urbania with pushback luxury recliners.</p>
              </div>
            </div>

            <div className="about-service-item service-corporate">
              <div className="about-icon-circle">
                <Briefcase size={24} strokeWidth={2.3} />
              </div>
              <div className="about-service-text">
                <h4>Corporate Travel</h4>
                <p>Executive sedans, GST billing, and dedicated chauffeur management.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Your Trusted Travel Partner (Mountain Route Visual + Booking CTA) */}
      <section className="trusted-partner-section" aria-label="Your Trusted Travel Partner">
        <div className="container">
          <div className="trusted-partner-card">
            <div className="trusted-left-text">
              <span className="trusted-tag-gold">YOUR JOURNEY, OUR PRIORITY</span>
              <h2 className="trusted-heading">Ready to Experience Travel the Right Way?</h2>
              <p className="trusted-paragraph">
                Whether you need a punctual airport cab right now, a corporate Innova Crysta for next week, or a holiday Force Urbania for an upcoming long weekend, Vicky and the SKB team are just a phone call or WhatsApp message away.
              </p>

              <div className="trusted-actions-row">
                <Link to="/booking" className="btn-book-your-ride-gold">
                  <span>Book Your Ride</span>
                  <ArrowRight size={18} />
                </Link>
                <a
                  href="tel:7338140524"
                  className="trusted-call-link"
                  aria-label="Call Helpline on 7338140524"
                >
                  <Phone size={16} />
                  <span>Call: +91 73381 40524</span>
                </a>
              </div>
            </div>

            <div className="trusted-right-img">
              <div className="trusted-img-frame">
                <img
                  src="/assets/images/mountain-vehicle.png"
                  alt="SKB Travels Mountain Route"
                  className="mountain-car-img"
                />
                <div className="trusted-img-badge">
                  <Award size={15} />
                  <span>Bengaluru’s Trusted Travel Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
