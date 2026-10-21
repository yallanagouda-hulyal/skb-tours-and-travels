import React from 'react';
import { MessageSquare, Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { createWhatsAppQuickUrl } from '../../utils/whatsapp';
import './FloatingActions.css';

export default function FloatingActions() {
  return (
    <>
      {/* Bottom Left: Greeting Chat Pill */}
      <div className="bottom-left-chat-pill">
        <a
          href={createWhatsAppQuickUrl('Hello Vicky, I would like to plan my journey with SKB Tour and Travels.')}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-pill-anchor"
        >
          <div className="chat-pill-avatar">
            <img src="/assets/images/skb-logo.jpeg" alt="SKB" className="pill-img" />
            <span className="pill-status-dot" />
          </div>
          <span className="chat-pill-text">Hi! How can we help you plan your journey?</span>
        </a>
      </div>

      {/* Bottom Right: Stack of WhatsApp & Call buttons */}
      <div className="bottom-right-float-stack">
        <a
          href={createWhatsAppQuickUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="float-action-btn float-wa"
          title="WhatsApp Us"
          aria-label="WhatsApp"
        >
          <MessageCircle size={24} />
        </a>

        <a
          href={`tel:${BUSINESS_INFO.primaryPhone}`}
          className="float-action-btn float-call"
          title={`Call ${BUSINESS_INFO.primaryPhone}`}
          aria-label="Call"
        >
          <Phone size={22} />
        </a>
      </div>
    </>
  );
}
