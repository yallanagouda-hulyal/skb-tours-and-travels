import React, { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Car,
  Users,
  Briefcase,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Send,
  Info,
} from 'lucide-react';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { submitBooking } from '../../services/api';
import { createWhatsAppBookingUrl } from '../../utils/whatsapp';
import { BUSINESS_INFO } from '../../data/businessInfo';
import './BookingForm.css';

export default function BookingForm({ initialValues = {} }) {
  // Today's date string YYYY-MM-DD for datepicker min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    fullName: initialValues.fullName || '',
    phoneNumber: initialValues.phoneNumber || '',
    tripType: initialValues.tripType || 'airport_transfer',
    pickupLocation: initialValues.pickupLocation || '',
    destination: initialValues.destination || '',
    travelDate: initialValues.travelDate || todayStr,
    pickupTime: initialValues.pickupTime || '',
    preferredVehicle: initialValues.preferredVehicle || 'Toyota Innova Crysta',
    passengerCount: initialValues.passengerCount || 1,
    returnDate: initialValues.returnDate || '',
    additionalStops: initialValues.additionalStops || '',
    luggageInfo: initialValues.luggageInfo || '',
    additionalInstructions: initialValues.additionalInstructions || '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null); // stores response object
  const [submissionError, setSubmissionError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const tripTypeOptions = [
    { value: 'airport_transfer', label: 'Airport Transfer (Pickup / Drop)' },
    { value: 'local_4h_40km', label: 'Local City Trip (4H / 40KM Package)' },
    { value: 'local_8h_80km', label: 'Local City Trip (8H / 80KM Package)' },
    { value: 'outstation_oneway', label: 'Outstation One-Way Drop' },
    { value: 'outstation_round', label: 'Outstation Round Trip' },
    { value: 'pan_india', label: 'PAN India Highway Travel' },
    { value: 'group_travel', label: 'Family & Group Travel' },
  ];

  const vehicleOptions = [
    'Toyota Innova Crysta',
    'Executive Sedan 4+1 (Dzire / Etios)',
    'Force Traveller / TT',
    'Luxury Urbania',
    'Other / Please advise suitable vehicle',
  ];

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    const cleanPhone = formData.phoneNumber.replace(/\s+/g, '');
    const phoneRegex = /^(?:\+?91[\-\s]?)?[6789]\d{9}$/;
    if (!cleanPhone) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required.';
    }

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required.';
    }

    if (!formData.travelDate) {
      newErrors.travelDate = 'Travel date is required.';
    } else if (formData.travelDate < todayStr) {
      newErrors.travelDate = 'Travel date cannot be in the past.';
    }

    if (!formData.preferredVehicle) {
      newErrors.preferredVehicle = 'Please choose a vehicle category.';
    }

    if (formData.tripType === 'outstation_round' && formData.returnDate) {
      if (formData.returnDate < formData.travelDate) {
        newErrors.returnDate = 'Return date cannot be earlier than travel date.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submissionError) {
      setSubmissionError('');
    }
  };

  // Submit via Database API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmissionError('');

    try {
      const response = await submitBooking(formData);
      setSubmissionSuccess(response);
      setModalOpen(true);
    } catch (err) {
      // If DB save failed, still generate clean WhatsApp flow without losing data
      console.warn('Booking submit error:', err.message);
      setSubmissionError(
        'Database connection took longer than expected. You can still confirm your booking immediately via WhatsApp below.'
      );
      // Construct fallback booking object
      const fallbackBooking = {
        ...formData,
        bookingReference: `SKB-${Date.now().toString().slice(-6)}`,
      };
      setSubmissionSuccess({
        success: true,
        booking: fallbackBooking,
        whatsappUrl: createWhatsAppBookingUrl(fallbackBooking),
      });
      setModalOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Direct WhatsApp Submission Button (Validates first, builds URL, opens WhatsApp)
  const handleDirectWhatsApp = () => {
    if (!validate()) return;

    const waUrl = createWhatsAppBookingUrl(formData);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="booking-form-wrapper">
      <div className="form-disclaimer-card">
        <Info size={18} className="disclaimer-icon text-gold" />
        <p className="disclaimer-text">
          <strong>Enquiry Notice:</strong> Submitting this form sends your travel requirements directly to Vicky. All bookings remain enquiries until vehicle availability and the exact written fare are confirmed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form" noValidate>
        {/* Section 1: Customer Details */}
        <div className="form-section-title">
          <span className="section-number">1</span>
          <h4>Customer & Contact Information</h4>
        </div>

        <div className="form-grid-2">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label required">
              <User size={15} className="input-icon" />
              <span>Full Name</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="e.g. Ramesh Kumar"
              value={formData.fullName}
              onChange={handleChange}
              className={`form-input ${errors.fullName ? 'input-error' : ''}`}
              aria-required="true"
              aria-invalid={!!errors.fullName}
            />
            {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label required">
              <Phone size={15} className="input-icon" />
              <span>Phone Number (10 Digits)</span>
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="e.g. 9035897960"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`form-input ${errors.phoneNumber ? 'input-error' : ''}`}
              aria-required="true"
              aria-invalid={!!errors.phoneNumber}
            />
            {errors.phoneNumber && <span className="field-error-msg">{errors.phoneNumber}</span>}
          </div>
        </div>

        {/* Section 2: Journey Details */}
        <div className="form-section-title">
          <span className="section-number">2</span>
          <h4>Trip & Route Specifications</h4>
        </div>

        <div className="form-grid-3">
          {/* Trip Type */}
          <div className="form-group">
            <label htmlFor="tripType" className="form-label required">
              <span>Trip Type</span>
            </label>
            <select
              id="tripType"
              name="tripType"
              value={formData.tripType}
              onChange={handleChange}
              className="form-select"
            >
              {tripTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Location */}
          <div className="form-group">
            <label htmlFor="pickupLocation" className="form-label required">
              <MapPin size={15} className="input-icon" />
              <span>Pickup Location</span>
            </label>
            <input
              id="pickupLocation"
              name="pickupLocation"
              type="text"
              placeholder="Airport T1 / T2, or City Address"
              value={formData.pickupLocation}
              onChange={handleChange}
              className={`form-input ${errors.pickupLocation ? 'input-error' : ''}`}
              aria-required="true"
            />
            {errors.pickupLocation && <span className="field-error-msg">{errors.pickupLocation}</span>}
          </div>

          {/* Destination */}
          <div className="form-group">
            <label htmlFor="destination" className="form-label required">
              <MapPin size={15} className="input-icon" />
              <span>Destination</span>
            </label>
            <input
              id="destination"
              name="destination"
              type="text"
              placeholder="e.g. Mysore, Whitefield, Ooty"
              value={formData.destination}
              onChange={handleChange}
              className={`form-input ${errors.destination ? 'input-error' : ''}`}
              aria-required="true"
            />
            {errors.destination && <span className="field-error-msg">{errors.destination}</span>}
          </div>
        </div>

        {/* Date & Time Row */}
        <div className="form-grid-3">
          {/* Travel Date */}
          <div className="form-group">
            <label htmlFor="travelDate" className="form-label required">
              <Calendar size={15} className="input-icon" />
              <span>Travel Date</span>
            </label>
            <input
              id="travelDate"
              name="travelDate"
              type="date"
              min={todayStr}
              value={formData.travelDate}
              onChange={handleChange}
              className={`form-input ${errors.travelDate ? 'input-error' : ''}`}
              aria-required="true"
            />
            {errors.travelDate && <span className="field-error-msg">{errors.travelDate}</span>}
          </div>

          {/* Pickup Time */}
          <div className="form-group">
            <label htmlFor="pickupTime" className="form-label">
              <Clock size={15} className="input-icon" />
              <span>Pickup Time (Optional)</span>
            </label>
            <input
              id="pickupTime"
              name="pickupTime"
              type="text"
              placeholder="e.g. 06:30 AM or 10:00 PM"
              value={formData.pickupTime}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Return Date (if Round trip) */}
          <div className="form-group">
            <label htmlFor="returnDate" className="form-label">
              <Calendar size={15} className="input-icon" />
              <span>Return Date (For Round Trips)</span>
            </label>
            <input
              id="returnDate"
              name="returnDate"
              type="date"
              min={formData.travelDate || todayStr}
              value={formData.returnDate}
              onChange={handleChange}
              className={`form-input ${errors.returnDate ? 'input-error' : ''}`}
            />
            {errors.returnDate && <span className="field-error-msg">{errors.returnDate}</span>}
          </div>
        </div>

        {/* Section 3: Vehicle & Luggage */}
        <div className="form-section-title">
          <span className="section-number">3</span>
          <h4>Vehicle Preference & Group Details</h4>
        </div>

        <div className="form-grid-3">
          {/* Preferred Vehicle */}
          <div className="form-group">
            <label htmlFor="preferredVehicle" className="form-label required">
              <Car size={15} className="input-icon" />
              <span>Preferred Vehicle</span>
            </label>
            <select
              id="preferredVehicle"
              name="preferredVehicle"
              value={formData.preferredVehicle}
              onChange={handleChange}
              className="form-select"
            >
              {vehicleOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {/* Passenger Count */}
          <div className="form-group">
            <label htmlFor="passengerCount" className="form-label">
              <Users size={15} className="input-icon" />
              <span>Number of Passengers</span>
            </label>
            <input
              id="passengerCount"
              name="passengerCount"
              type="number"
              min="1"
              max="35"
              value={formData.passengerCount}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Luggage Info */}
          <div className="form-group">
            <label htmlFor="luggageInfo" className="form-label">
              <Briefcase size={15} className="input-icon" />
              <span>Luggage Quantity (Optional)</span>
            </label>
            <input
              id="luggageInfo"
              name="luggageInfo"
              type="text"
              placeholder="e.g. 2 large bags, 1 pram"
              value={formData.luggageInfo}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* Additional Stops & Instructions */}
        <div className="form-grid-2">
          <div className="form-group">
            <label htmlFor="additionalStops" className="form-label">
              <span>Intermediate Stops / Via Route (Optional)</span>
            </label>
            <input
              id="additionalStops"
              name="additionalStops"
              type="text"
              placeholder="e.g. Via Mandya or Hebbal Flyover"
              value={formData.additionalStops}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="additionalInstructions" className="form-label">
              <span>Special Instructions / Flight Details</span>
            </label>
            <input
              id="additionalInstructions"
              name="additionalInstructions"
              type="text"
              placeholder="e.g. Flight 6E-241 landing at T2, need child seat"
              value={formData.additionalInstructions}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* Submission Actions */}
        <div className="form-submit-row">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={submitting}
            icon={<Send size={18} />}
            className="btn-main-submit"
          >
            Submit Booking Enquiry
          </Button>

          <Button
            type="button"
            variant="whatsapp"
            size="lg"
            icon={<MessageSquare size={18} />}
            onClick={handleDirectWhatsApp}
            className="btn-wa-submit"
          >
            Continue on WhatsApp
          </Button>
        </div>

        {submissionError && (
          <div className="submission-error-alert">
            <AlertCircle size={18} />
            <span>{submissionError}</span>
          </div>
        )}
      </form>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Travel Enquiry Successfully Submitted"
      >
        <div className="modal-success-content">
          <div className="success-icon-badge">
            <CheckCircle size={44} className="text-gold" />
          </div>

          <h3 className="success-title">Thank You, {submissionSuccess?.booking?.fullName}!</h3>
          
          <div className="ref-id-card">
            <span className="ref-label">Booking Reference ID:</span>
            <span className="ref-number">{submissionSuccess?.booking?.bookingReference}</span>
          </div>

          <p className="success-message-text">
            Your travel request has been logged. Vicky from <strong>SKB Tour and Travels</strong> will review vehicle availability and reach out with the exact written fare.
          </p>

          <div className="modal-summary-box">
            <div className="summary-row">
              <span className="summary-label">Route:</span>
              <span className="summary-val">{submissionSuccess?.booking?.pickupLocation} ➔ {submissionSuccess?.booking?.destination}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Vehicle:</span>
              <span className="summary-val">{submissionSuccess?.booking?.preferredVehicle}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Contact:</span>
              <span className="summary-val">{submissionSuccess?.booking?.phoneNumber}</span>
            </div>
          </div>

          <div className="modal-actions-stack">
            <a
              href={submissionSuccess?.whatsappUrl || createWhatsAppBookingUrl(formData)}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-wa-btn"
            >
              <MessageSquare size={18} />
              <span>Fast-Track Confirmation on WhatsApp</span>
            </a>

            <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="modal-call-btn">
              <Phone size={16} />
              <span>Call Vicky ({BUSINESS_INFO.primaryPhoneDisplay})</span>
            </a>

            <button
              type="button"
              className="modal-done-btn"
              onClick={() => setModalOpen(false)}
            >
              Done & Return to Site
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
