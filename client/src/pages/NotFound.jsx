import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import { BUSINESS_INFO } from '../data/businessInfo';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <div className="container notfound-container">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">Route Not Found</h1>
        <div className="gold-divider gold-divider-center" />
        <p className="notfound-desc">
          The page or travel route you are looking for has moved or does not exist. Let's get you back on the right road.
        </p>

        <div className="notfound-actions">
          <Button to="/" variant="primary" size="lg" icon={<Home size={18} />}>
            Return to Homepage
          </Button>
          <Button to="/fleet" variant="secondary" size="lg" icon={<Compass size={18} />}>
            Explore Our Fleet
          </Button>
        </div>

        <div className="notfound-phone-box">
          <p>Need urgent assistance? Contact Vicky directly:</p>
          <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="notfound-phone">
            <Phone size={16} />
            <span>{BUSINESS_INFO.primaryPhoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
