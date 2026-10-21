import React, { useState } from 'react';
import {
  MessageSquare,
  Bot,
  Phone,
  MessageCircle,
  X,
  Send,
  PhoneCall,
  Sparkles,
  Plane,
  Car,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessInfo';
import { createWhatsAppQuickUrl } from '../../utils/whatsapp';
import './FloatingActions.css';

// Official Authentic WhatsApp Icon SVG
function WhatsAppSvgIcon({ size = 26, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export default function FloatingActions() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCallMenuOpen, setIsCallMenuOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! 🙏 Welcome to SKB Tour and Travels. I am your instant travel assistant. How can I help you today?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickOptions = [
    {
      id: 'airport',
      label: '✈️ Airport Taxi (BLR)',
      reply:
        '✈️ Bangalore Airport Transfers: Starting from ₹21/km. We provide 24/7 pickup and drop with real-time flight tracking so your driver is ready at the terminal!',
      waText: 'Hello Vicky, I need an airport taxi transfer for Bangalore Airport (BLR).',
    },
    {
      id: 'local',
      label: '🚗 Local 4h / 8h Packages',
      reply:
        '🚗 Local City Packages:\n• 4 Hours / 40 KM: ₹1,200\n• 8 Hours / 80 KM: ₹1,900 (Most Popular)\nExtra hour ₹150, extra km ₹13.',
      waText: 'Hello Vicky, I am interested in booking a local city package.',
    },
    {
      id: 'outstation',
      label: '🛣️ Outstation Trips',
      reply:
        '🛣️ Outstation Travel: Indicative starting rate ₹13/km. Minimum average billing 300 km/day. One-way and round trips across Karnataka and South India!',
      waText: 'Hello Vicky, I want to enquire about an outstation trip.',
    },
    {
      id: 'call',
      label: '📞 Call Driver / Vicky',
      reply:
        '📞 Direct 24/7 Helpline Numbers:\n• Primary: +91 90358 97960\n• Alternate: +91 73381 40524\nVicky is available round the clock!',
      isCall: true,
    },
  ];

  const handleSelectOption = (opt) => {
    const userMsg = { id: Date.now(), sender: 'user', text: opt.label };
    const botReply = {
      id: Date.now() + 1,
      sender: 'bot',
      text: opt.reply,
      waText: opt.waText,
      isCall: opt.isCall,
    };
    setMessages((prev) => [...prev, userMsg, botReply]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: inputMessage.trim() };
    const botReply = {
      id: Date.now() + 1,
      sender: 'bot',
      text: `Thank you! I am forwarding your inquiry to Vicky: "${inputMessage.trim()}". Click below to connect instantly on WhatsApp or call directly.`,
      waText: `Hello Vicky, I have an inquiry: ${inputMessage.trim()}`,
    };

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInputMessage('');
  };

  return (
    <>
      {/* =========================================================================
          1. LEFT SIDE: CHATBOT MESSAGE ICON & INTERACTIVE CHATBOT WINDOW
          ========================================================================= */}
      <div className="bottom-left-float-container">
        {/* Chatbot Window */}
        {isChatOpen && (
          <div className="chatbot-window">
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-left">
                <div className="chatbot-avatar">
                  <Bot size={22} className="chatbot-avatar-icon" />
                  <span className="chatbot-status-dot" />
                </div>
                <div className="chatbot-header-info">
                  <span className="chatbot-name">SKB Travel Assistant</span>
                  <span className="chatbot-sub">Online • Instant Help</span>
                </div>
              </div>
              <button
                type="button"
                className="chatbot-close-btn"
                onClick={() => setIsChatOpen(false)}
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div className="chatbot-messages-body">
              {messages.map((m) => (
                <div key={m.id} className={`chatbot-msg ${m.sender}`}>
                  <div className="chatbot-bubble">
                    <p style={{ whiteSpace: 'pre-line' }}>{m.text}</p>
                    {m.waText && (
                      <a
                        href={createWhatsAppQuickUrl(m.waText)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="chatbot-wa-action"
                      >
                        <WhatsAppSvgIcon size={14} />
                        <span>Continue on WhatsApp</span>
                      </a>
                    )}
                    {m.isCall && (
                      <div className="chatbot-call-options">
                        <a href="tel:9035897960" className="chatbot-call-pill">
                          <Phone size={14} />
                          <span>Call 90358 97960</span>
                        </a>
                        <a href="tel:7338140524" className="chatbot-call-pill alt">
                          <Phone size={14} />
                          <span>Call 73381 40524</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Quick Option Prompts */}
              <div className="chatbot-quick-options">
                <span className="quick-options-label">Frequently Asked:</span>
                <div className="quick-buttons-row">
                  {quickOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      className="chatbot-quick-btn"
                      onClick={() => handleSelectOption(opt)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="chatbot-input-bar">
              <input
                type="text"
                placeholder="Ask about cabs, pricing, routes..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="chatbot-input"
              />
              <button
                type="submit"
                className="chatbot-send-btn"
                aria-label="Send Message"
                disabled={!inputMessage.trim()}
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        )}

        {/* Floating Chatbot Launcher Button */}
        <button
          type="button"
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            setIsCallMenuOpen(false);
          }}
          className={`float-chatbot-btn ${isChatOpen ? 'active' : ''}`}
          aria-label="Open Travel Chatbot Assistant"
          title="Chat with SKB Travel Assistant"
        >
          {isChatOpen ? (
            <X size={24} />
          ) : (
            <>
              <div className="chatbot-icon-wrap">
                <Bot size={26} />
                <span className="chatbot-pulse-dot" />
              </div>
              <span className="chatbot-pill-tag">Chat with Us</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          2. RIGHT SIDE: WHATSAPP ICON & CALL ICON (WITH TWO PHONE NUMBERS)
          ========================================================================= */}
      <div className="bottom-right-float-stack">
        {/* Quick Call Dial Popup (Shows Both 9035897960 & 7338140524) */}
        {isCallMenuOpen && (
          <div className="call-dial-popup">
            <div className="call-dial-header">
              <span className="call-dial-title">Direct Call Lines (24/7)</span>
              <button
                type="button"
                className="call-dial-close"
                onClick={() => setIsCallMenuOpen(false)}
                aria-label="Close Dial Menu"
              >
                <X size={14} />
              </button>
            </div>
            <div className="call-numbers-list">
              <a
                href="tel:9035897960"
                className="call-dial-item primary"
                aria-label="Call Vicky on 9035897960"
              >
                <div className="dial-item-icon">
                  <PhoneCall size={18} />
                </div>
                <div className="dial-item-text">
                  <span className="dial-item-name">Vicky (Primary)</span>
                  <span className="dial-item-num">+91 90358 97960</span>
                </div>
                <span className="dial-tag">Active</span>
              </a>

              <a
                href="tel:7338140524"
                className="call-dial-item secondary"
                aria-label="Call Alternate on 7338140524"
              >
                <div className="dial-item-icon">
                  <Phone size={18} />
                </div>
                <div className="dial-item-text">
                  <span className="dial-item-name">Alternate Support</span>
                  <span className="dial-item-num">+91 73381 40524</span>
                </div>
                <span className="dial-tag">24/7</span>
              </a>
            </div>
          </div>
        )}

        {/* WhatsApp Floating Button */}
        <a
          href={createWhatsAppQuickUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="float-action-btn float-wa"
          title="Chat with Vicky on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppSvgIcon size={26} />
          <span className="float-badge-pulse" />
        </a>

        {/* Call Floating Button */}
        <button
          type="button"
          onClick={() => {
            setIsCallMenuOpen(!isCallMenuOpen);
            setIsChatOpen(false);
          }}
          className={`float-action-btn float-call ${isCallMenuOpen ? 'active' : ''}`}
          title="Call SKB Tour and Travels"
          aria-label="Call Numbers"
        >
          <Phone size={22} />
        </button>
      </div>
    </>
  );
}
