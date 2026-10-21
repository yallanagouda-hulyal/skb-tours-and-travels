import React, { useState } from 'react';
import { MessageSquare, Phone, X, Send, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { createWhatsAppQuickUrl } from '../../utils/whatsapp';
import './FloatingActions.css';

export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const handleSendChat = (e) => {
    e.preventDefault();
    const targetUrl = createWhatsAppQuickUrl(quickMsg || undefined);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
    setChatOpen(false);
    setQuickMsg('');
  };

  return (
    <div className="floating-actions-container" aria-label="Quick Communication Actions">
      {/* Quick WhatsApp Chat Popup Box */}
      {chatOpen && (
        <div className="frosted-chat-widget">
          <div className="chat-header">
            <div className="chat-header-avatar">
              <img
                src="/assets/images/skb-logo.jpeg"
                alt="SKB Travels"
                className="chat-avatar-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="online-dot" />
            </div>
            <div className="chat-header-info">
              <h5 className="chat-owner-name">{BUSINESS_INFO.owner} • {BUSINESS_INFO.name}</h5>
              <span className="chat-sub">Online for 24/7 Travel Enquiries</span>
            </div>
            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setChatOpen(false)}
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="chat-body">
            <div className="chat-message-bubble incoming">
              <p>
                Hello! 👋 Welcome to SKB Tour and Travels. Need an airport pickup, outstation cab, or group traveller?
              </p>
              <span className="bubble-time">Typically replies in 5 minutes</span>
            </div>
          </div>

          <form onSubmit={handleSendChat} className="chat-form">
            <input
              type="text"
              placeholder="Type your travel route or inquiry..."
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              className="chat-input"
            />
            <button type="submit" className="chat-submit-btn" aria-label="Send via WhatsApp">
              <Send size={16} />
            </button>
          </form>

          <div className="chat-direct-quick">
            <a
              href={createWhatsAppQuickUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="chat-direct-link"
            >
              <span>Instant Chat on WhatsApp</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}

      {/* Floating Buttons Stack */}
      <div className="floating-buttons-stack">
        {/* Quick Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.primaryPhone}`}
          className="float-btn float-call-btn"
          title={`Call ${BUSINESS_INFO.primaryPhoneDisplay}`}
          aria-label="Call Vicky for travel booking"
        >
          <Phone size={20} className="float-icon" />
          <span className="float-tooltip">Call Vicky</span>
        </a>

        {/* WhatsApp Chat Floating Trigger */}
        <button
          type="button"
          onClick={() => setChatOpen(!chatOpen)}
          className={`float-btn float-wa-btn ${chatOpen ? 'btn-active' : ''}`}
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp with Vicky"
          aria-expanded={chatOpen}
        >
          {chatOpen ? <X size={22} /> : <MessageSquare size={22} />}
          <span className="wa-ping-indicator" />
          <span className="float-tooltip">WhatsApp Enquiries</span>
        </button>
      </div>
    </div>
  );
}
