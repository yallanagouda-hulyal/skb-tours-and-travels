import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { BUSINESS_INFO } from '../data/businessInfo';
import { submitContact } from '../services/api';
import { createWhatsAppQuickUrl } from '../utils/whatsapp';
import './Contact.css';

export default function Contact() {
  const [mapSearchQuery, setMapSearchQuery] = useState('Airport Area, Bengaluru 560300');
  const [activeMapQuery, setActiveMapQuery] = useState('Airport Area, Bengaluru 560300');

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Travel Enquiry',
    message: '',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const quickLocationPresets = [
    'Kempegowda Airport Terminal 1',
    'Kempegowda Airport Terminal 2',
    'Airport Area 560300',
    'Devanahalli, Bengaluru',
    'Hebbal, Bengaluru',
    'Whitefield, Bengaluru',
  ];

  const handleSearchMap = (e) => {
    e.preventDefault();
    if (mapSearchQuery.trim()) {
      setActiveMapQuery(mapSearchQuery.trim());
    }
  };

  const handlePresetClick = (preset) => {
    setMapSearchQuery(preset);
    setActiveMapQuery(preset);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.phone.trim() || !contactForm.message.trim()) {
      setFormError('Please fill in your name, phone number, and message.');
      return;
    }

    setFormSubmitting(true);
    setFormError('');

    try {
      await submitContact(contactForm);
      setFormSuccess(true);
      setContactForm({
        name: '',
        phone: '',
        email: '',
        subject: 'General Travel Enquiry',
        message: '',
      });
    } catch (err) {
      setFormError('Unable to send message directly to server. Please call or WhatsApp Vicky directly.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="contact-page-root">
      {/* 1. Header Banner */}
      <section className="contact-hero-banner" aria-label="Contact Overview">
        <div className="container">
          <div className="contact-hero-content">
            <span className="section-tag">
              <Phone size={13} />
              Always Accessible
            </span>
            <h1 className="contact-hero-title">
              Contact <span className="text-gold">SKB Tour & Travels</span>
            </h1>
            <div className="gold-divider gold-divider-center" />
            <p className="contact-hero-desc">
              Get in touch with Vicky directly for instantaneous booking assistance, airport taxi reservations, outstation rate quotes, and group coach logistics.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Direct Contact Cards Grid */}
      <section className="section-padding contact-cards-section" aria-label="Direct Phone & Email">
        <div className="container">
          <div className="contact-cards-grid">
            {/* Primary Phone */}
            <GlassCard className="contact-info-card">
              <div className="contact-icon-bubble">
                <Phone size={24} className="text-gold" />
              </div>
              <span className="card-kicker">Primary Hotline</span>
              <h3 className="card-val-heading">
                <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="contact-link-hover">
                  {BUSINESS_INFO.primaryPhoneDisplay}
                </a>
              </h3>
              <p className="card-sub-p">Owner Vicky • Available 24/7 for booking enquiries and dispatch.</p>
              <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="card-inline-action">
                <span>Call Now</span>
              </a>
            </GlassCard>

            {/* Alternate Phone */}
            <GlassCard className="contact-info-card">
              <div className="contact-icon-bubble">
                <Phone size={24} className="text-gold" />
              </div>
              <span className="card-kicker">Alternate Contact</span>
              <h3 className="card-val-heading">
                <a href={`tel:${BUSINESS_INFO.alternatePhone}`} className="contact-link-hover">
                  {BUSINESS_INFO.alternatePhoneDisplay}
                </a>
              </h3>
              <p className="card-sub-p">Secondary line for outstation coordination and corporate bookings.</p>
              <a href={`tel:${BUSINESS_INFO.alternatePhone}`} className="card-inline-action">
                <span>Call Alternate</span>
              </a>
            </GlassCard>

            {/* WhatsApp */}
            <GlassCard className="contact-info-card">
              <div className="contact-icon-bubble wa-bubble">
                <MessageSquare size={24} className="text-wa" />
              </div>
              <span className="card-kicker">WhatsApp Direct</span>
              <h3 className="card-val-heading">
                <a
                  href={createWhatsAppQuickUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-hover text-wa"
                >
                  +91 {BUSINESS_INFO.primaryPhone}
                </a>
              </h3>
              <p className="card-sub-p">Send pickup addresses, flight details, or route itineraries for written fares.</p>
              <a
                href={createWhatsAppQuickUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="card-inline-action text-wa"
              >
                <span>Chat on WhatsApp</span>
              </a>
            </GlassCard>

            {/* Email */}
            <GlassCard className="contact-info-card">
              <div className="contact-icon-bubble">
                <Mail size={24} className="text-gold" />
              </div>
              <span className="card-kicker">Official Email</span>
              <h3 className="card-val-heading email-heading">
                <a href={`mailto:${BUSINESS_INFO.email}`} className="contact-link-hover">
                  {BUSINESS_INFO.email}
                </a>
              </h3>
              <p className="card-sub-p">Formal corporate proposals, invoicing questions, and PAN India itineraries.</p>
              <a href={`mailto:${BUSINESS_INFO.email}`} className="card-inline-action">
                <span>Send Email</span>
              </a>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 3. Interactive Location & Google Maps Interface */}
      <section className="section-padding map-section" aria-label="Location and Maps">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <MapPin size={13} />
              Location Search
            </span>
            <h2 className="section-title">
              Operational Hub & <span className="text-gold">Route Locator</span>
            </h2>
            <div className="gold-divider gold-divider-center" />
            <p className="section-description">
              SKB Tour and Travels operates from the Airport Area, PIN 560300, Bengaluru. Use the interactive location search below to explore routes and terminal connections.
            </p>
          </div>

          <div className="map-interface-card">
            {/* Search Bar & Presets */}
            <div className="map-search-bar-wrap">
              <form onSubmit={handleSearchMap} className="map-search-form">
                <div className="search-input-field">
                  <Search size={18} className="search-lead-icon text-gold" />
                  <input
                    type="text"
                    value={mapSearchQuery}
                    onChange={(e) => setMapSearchQuery(e.target.value)}
                    placeholder="Search any airport terminal, city landmark, or route..."
                    className="map-query-input"
                  />
                </div>
                <button type="submit" className="map-search-btn">
                  <span>Search Location</span>
                </button>
              </form>

              {/* Quick Presets */}
              <div className="presets-row">
                <span className="presets-label">Popular Locations:</span>
                <div className="preset-buttons">
                  {quickLocationPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={`preset-pill ${activeMapQuery === preset ? 'preset-active' : ''}`}
                      onClick={() => handlePresetClick(preset)}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Embedded Responsive Google Map */}
            <div className="google-map-frame">
              <iframe
                title="SKB Tour and Travels Operational Area Map"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  activeMapQuery
                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="460"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Location Notice Callout */}
            <div className="map-footer-notice">
              <ShieldCheck size={20} className="text-gold flex-shrink-0" />
              <p>
                <strong>Precise Location Selection:</strong> As confirmed by the owner Vicky, our vehicles are dispatched from the Airport area (PIN 560300). Search any pickup or drop-off location above or open directly in Google Maps for turn-by-turn navigation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact Form Section */}
      <section className="section-padding contact-form-section" aria-label="Send a Message">
        <div className="container-narrow">
          <GlassCard className="contact-form-glass">
            <div className="form-head-title">
              <h3 className="contact-form-headline">Send an Inquiry to Vicky</h3>
              <p className="contact-form-subline">
                Have a customized itinerary or query? Send us a message and we will respond promptly.
              </p>
            </div>

            {formSuccess ? (
              <div className="contact-success-state">
                <CheckCircle2 size={48} className="text-gold" />
                <h4>Message Received!</h4>
                <p>
                  Thank you for contacting SKB Tour and Travels. Vicky will review your message and reach out shortly on your phone number.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSuccess(false)}
                  className="btn-reset-contact"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="contact-main-form">
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label required">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Anand Gowda"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label required">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9035897960"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. anand@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Outstation trip to Ooty"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label required">Your Message or Route Details</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your travel dates, pickup location, vehicle preference, and any specific requirements..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="form-input form-textarea"
                    required
                  />
                </div>

                {formError && (
                  <div className="form-error-alert">
                    <AlertCircle size={16} />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="contact-submit-row">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={formSubmitting}
                    icon={<Send size={16} />}
                  >
                    Send Message
                  </Button>

                  <a
                    href={createWhatsAppQuickUrl(
                      contactForm.message
                        ? `Hello Vicky, ${contactForm.message}`
                        : undefined
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-contact-wa"
                  >
                    <MessageSquare size={16} />
                    <span>Instant Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
