import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Compass,
  Plane,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { PACKAGES_DATA, PRICING_CONDITIONS } from '../data/packagesData';
import { BUSINESS_INFO } from '../data/businessInfo';
import { createWhatsAppQuickUrl } from '../utils/whatsapp';
import './Packages.css';

export default function Packages() {
  return (
    <div className="packages-page-root">
      {/* 1. Header Banner */}
      <section className="packages-hero-banner" aria-label="Packages Overview">
        <div className="container">
          <div className="packages-hero-content">
            <span className="section-tag">
              <Sparkles size={13} />
              Transparent Fares
            </span>
            <h1 className="packages-hero-title">
              Clear, Indicative <span className="text-gold">Packages & Rates</span>
            </h1>
            <div className="gold-divider gold-divider-center" />
            <p className="packages-hero-desc">
              We believe in upfront, transparent pricing without hidden surprises. Review our indicative city rental packages, outstation mileage, and airport transfer formulas below.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Owner Confirmation Notice */}
      <div className="container">
        <div className="pricing-notice-callout">
          <Info size={22} className="callout-icon text-gold" />
          <div className="callout-text">
            <strong>Owner Confirmation Notice:</strong> All fares displayed on this website are baseline indicative rates. The final binding fare is confirmed in writing by Vicky based on vehicle choice, exact pickup/drop route, dates, and traffic conditions.
          </div>
        </div>
      </div>

      {/* 3. Package Cards Grid */}
      <section className="section-padding packages-list-section" aria-label="Available Packages">
        <div className="container">
          <div className="packages-card-grid">
            {PACKAGES_DATA.map((pkg) => (
              <GlassCard
                key={pkg.id}
                className={`package-detail-card ${pkg.isPopular ? 'popular-glow-card' : ''}`}
                hoverEffect={true}
              >
                {pkg.isPopular && <div className="popular-badge-pill">Most Popular</div>}

                <div className="card-top-header">
                  <span className="pkg-category-tag">{pkg.category}</span>
                  <h3 className="pkg-title-text">{pkg.name}</h3>

                  <div className="price-display-wrapper">
                    <span className="price-main-number">{pkg.priceDisplay}</span>
                    <span className="price-subtitle-note">{pkg.priceSubtext}</span>
                  </div>

                  <div className="pkg-metrics-bar">
                    <span className="metric-item">
                      <Clock size={14} className="text-gold" />
                      <span>{pkg.duration}</span>
                    </span>
                    <span className="metric-sep">•</span>
                    <span className="metric-item">
                      <Compass size={14} className="text-gold" />
                      <span>{pkg.distance}</span>
                    </span>
                  </div>
                </div>

                <div className="gold-subdivider" />

                <div className="pkg-details-body">
                  <span className="pkg-section-label">Included Features:</span>
                  <ul className="pkg-bullet-list">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="pkg-bullet-item">
                        <CheckCircle2 size={15} className="text-gold bullet-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="pkg-section-label exclusions-label">Important Exclusions:</span>
                  <ul className="pkg-exclusions-list">
                    {pkg.exclusions.map((exc, idx) => (
                      <li key={idx} className="pkg-exclusion-item">
                        <AlertTriangle size={14} className="text-gold exc-icon" />
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pkg-card-cta-row">
                  <Button
                    to="/booking"
                    state={{ prefill: { tripType: pkg.tripTypeKey } }}
                    variant={pkg.isPopular ? 'primary' : 'secondary'}
                    size="md"
                    className="btn-select-pkg"
                  >
                    <span>Book This Package</span>
                    <ArrowRight size={15} />
                  </Button>

                  <a
                    href={createWhatsAppQuickUrl(
                      `Hello Vicky, I would like to enquire about the ${pkg.name} (${pkg.priceDisplay}) with SKB Tour and Travels.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pkg-wa-icon"
                    title="Enquire on WhatsApp"
                  >
                    <MessageSquare size={17} />
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Detailed Pricing Conditions Section */}
      <section className="section-padding conditions-section" aria-label="Transparent Pricing Conditions">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <ShieldCheck size={13} />
              Fair & Open Terms
            </span>
            <h2 className="section-title">
              Pricing <span className="text-gold">Conditions & Terms</span>
            </h2>
            <div className="gold-divider gold-divider-center" />
            <p className="section-description">
              We maintain absolute transparency regarding additional highway or parking expenses. Please review these standard travel principles before confirming your ride.
            </p>
          </div>

          <div className="conditions-grid">
            {PRICING_CONDITIONS.map((cond, idx) => (
              <GlassCard key={idx} className="condition-card">
                <div className="condition-num-wrap">
                  <span className="condition-num">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h4 className="condition-title">{cond.title}</h4>
                <p className="condition-desc">{cond.description}</p>
              </GlassCard>
            ))}
          </div>

          {/* Outstation Formula Highlight Box */}
          <div className="outstation-formula-card">
            <div className="formula-header">
              <Compass size={24} className="text-gold" />
              <h3>Outstation Billing Guidelines (₹13 / KM Indicative)</h3>
            </div>
            <p className="formula-desc">
              For all outstation itineraries, distance is calculated from our airport operational hub / dispatch garage back to the origin garage. A calendar day minimum average of <strong>300 kilometres per day</strong> applies. For overnight stays, driver night allowance of <strong>₹400</strong> applies subject to confirmation.
            </p>
            <div className="formula-example">
              <span className="example-label">Calculation Example:</span>
              <span className="example-text">
                A 3-day round trip will be billed for a minimum of 900 km (3 × 300 km) at the agreed per-km rate, plus applicable driver allowances and actual toll tickets.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Custom Route CTA */}
      <section className="section-padding custom-pricing-cta" aria-label="Custom Quote CTA">
        <div className="container">
          <div className="custom-quote-box">
            <h3 className="custom-quote-title">Have a Complex or Multi-City Route?</h3>
            <p className="custom-quote-desc">
              Whether you are planning a corporate circuit across Bengaluru tech parks or an extended PAN India highway expedition, connect directly with Vicky for an itemized estimate.
            </p>
            <div className="custom-quote-buttons">
              <Button to="/booking" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
                Submit Booking Enquiry
              </Button>
              <a
                href={createWhatsAppQuickUrl(
                  'Hello Vicky, I need a custom quote for a multi-city travel itinerary with SKB Tour and Travels.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-custom-quote-wa"
              >
                <MessageSquare size={18} />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
