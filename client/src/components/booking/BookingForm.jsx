import React, { useState } from 'react';
import { MessageSquare, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitBooking } from '../../services/api';
import { createWhatsAppBookingUrl } from '../../utils/whatsapp';
import { BUSINESS_INFO } from '../../data/businessInfo';
import Modal from '../ui/Modal';
import './BookingForm.css';

export default function BookingForm({ initialValues = {} }) {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    fullName: initialValues.fullName || '',
    phoneNumber: initialValues.phoneNumber || '',
    tripType: initialValues.tripType || 'airport_transfer',
    pickupLocation: initialValues.pickupLocation || '',
    destination: initialValues.destination || '',
    travelDate: initialValues.travelDate || todayStr,
    preferredVehicle: initialValues.preferredVehicle || 'Toyota Innova Crysta',
    passengerCount: initialValues.passengerCount || 1,
    returnDate: initialValues.returnDate || '',
    additionalStops: initialValues.additionalStops || '',
    additionalInstructions: initialValues.additionalInstructions || '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const tripTypes = [
    { value: 'airport_transfer', label: 'Airport Transfer (Pickup / Drop)' },
    { value: 'local_4h_40km', label: 'Local City Trip (4H / 40KM)' },
    { value: 'local_8h_80km', label: 'Local City Trip (8H / 80KM)' },
    { value: 'outstation_oneway', label: 'Outstation One-Way Drop' },
    { value: 'outstation_round', label: 'Outstation Round Trip' },
    { value: 'group_travel', label: 'Family & Group Travel' },
  ];

  const vehicleOptions = [
    'Toyota Innova Crysta',
    'Sedan 4+1 (Dzire / Etios)',
    'Force Traveller',
    'Urbania',
    'Tempo Traveller (TT)',
    'Other / Custom Requirement',
  ];

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name.';
    const cleanPhone = formData.phoneNumber.replace(/\s+/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phoneNumber = 'Enter a valid 10-digit mobile number.';
    }
    if (!formData.pickupLocation.trim()) errs.pickupLocation = 'Enter pickup location.';
    if (!formData.destination.trim()) errs.destination = 'Enter destination.';
    if (!formData.travelDate) errs.travelDate = 'Select travel date.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    let waUrl = createWhatsAppBookingUrl(formData);

    try {
      const res = await submitBooking(formData);
      setSuccessData(res);
      if (res.whatsappUrl) {
        waUrl = res.whatsappUrl;
      }
    } catch (err) {
      console.warn('Backend offline fallback for WhatsApp submission');
    } finally {
      setSubmitting(false);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setModalOpen(true);
    }
  };

  return (
    <div className="booking-card-white-2col">
      <form onSubmit={handleWhatsAppSubmit} className="booking-form-split-grid" noValidate>
        {/* Left Column: Trip Information */}
        <div className="booking-left-column">
          <h3 className="column-header-title">Trip Information</h3>

          <div className="b-field-group">
            <label className="b-label">Trip Type *</label>
            <select
              name="tripType"
              value={formData.tripType}
              onChange={handleChange}
              className="b-select"
            >
              {tripTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="b-field-group">
            <label className="b-label">Pickup Location *</label>
            <input
              type="text"
              name="pickupLocation"
              placeholder="e.g. Bengaluru"
              value={formData.pickupLocation}
              onChange={handleChange}
              className={`b-input ${errors.pickupLocation ? 'b-err' : ''}`}
            />
            {errors.pickupLocation && <span className="b-err-text">{errors.pickupLocation}</span>}
          </div>

          <div className="b-field-group">
            <label className="b-label">Destination *</label>
            <input
              type="text"
              name="destination"
              placeholder="e.g. Mysore"
              value={formData.destination}
              onChange={handleChange}
              className={`b-input ${errors.destination ? 'b-err' : ''}`}
            />
            {errors.destination && <span className="b-err-text">{errors.destination}</span>}
          </div>

          <div className="b-field-group">
            <label className="b-label">Travel Date *</label>
            <input
              type="date"
              name="travelDate"
              min={todayStr}
              value={formData.travelDate}
              onChange={handleChange}
              className={`b-input ${errors.travelDate ? 'b-err' : ''}`}
            />
            {errors.travelDate && <span className="b-err-text">{errors.travelDate}</span>}
          </div>
        </div>

        {/* Right Column: Your Details */}
        <div className="booking-right-column">
          <h3 className="column-header-title">Your Details</h3>

          <div className="b-row-2">
            <div className="b-field-group">
              <label className="b-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleChange}
                className={`b-input ${errors.fullName ? 'b-err' : ''}`}
              />
              {errors.fullName && <span className="b-err-text">{errors.fullName}</span>}
            </div>

            <div className="b-field-group">
              <label className="b-label">Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter 10-digit mobile number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`b-input ${errors.phoneNumber ? 'b-err' : ''}`}
              />
              {errors.phoneNumber && <span className="b-err-text">{errors.phoneNumber}</span>}
            </div>
          </div>

          <div className="b-row-2">
            <div className="b-field-group">
              <label className="b-label">Preferred Vehicle *</label>
              <select
                name="preferredVehicle"
                value={formData.preferredVehicle}
                onChange={handleChange}
                className="b-select"
              >
                {vehicleOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div className="b-field-group">
              <label className="b-label">Passengers</label>
              <input
                type="number"
                name="passengerCount"
                min="1"
                placeholder="No. of Passengers"
                value={formData.passengerCount}
                onChange={handleChange}
                className="b-input"
              />
            </div>
          </div>

          <div className="b-field-group">
            <label className="b-label">Return Date (if applicable)</label>
            <input
              type="date"
              name="returnDate"
              min={formData.travelDate || todayStr}
              value={formData.returnDate}
              onChange={handleChange}
              className="b-input"
            />
          </div>

          <div className="b-field-group">
            <label className="b-label">Additional Stops</label>
            <input
              type="text"
              name="additionalStops"
              placeholder="e.g. Sightseeing, Multiple Locations"
              value={formData.additionalStops}
              onChange={handleChange}
              className="b-input"
            />
          </div>

          <div className="b-field-group">
            <label className="b-label">Additional Instructions</label>
            <textarea
              name="additionalInstructions"
              rows={3}
              placeholder="Any special requests?"
              value={formData.additionalInstructions}
              onChange={handleChange}
              className="b-input b-textarea"
            />
          </div>
        </div>

        {/* WhatsApp Direct Dispatch Box (Green Panel) - Placed at the very end as final submit */}
        <div className="booking-submit-fullwidth">
          <div className="b-wa-dispatch-card">
            <div className="b-wa-notice-row">
              <span className="wa-bubble-icon">💬</span>
              <div className="wa-notice-text">
                <span className="wa-small-tag">Your enquiry will be sent to</span>
                <span className="wa-bold-phone">{BUSINESS_INFO.primaryPhone}</span>
              </div>
            </div>

            <button type="submit" disabled={submitting} className="btn-continue-wa-green">
              <span>{submitting ? 'Preparing...' : 'Continue on WhatsApp'}</span>
            </button>

            <p className="wa-footer-note">
              You will be redirected to WhatsApp with your booking details.
            </p>
          </div>
        </div>
      </form>

      {/* Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Booking Enquiry Sent"
      >
        <div className="booking-modal-content">
          <CheckCircle2 size={44} className="text-gold mb-2" />
          <h3 className="modal-heading-clean">Enquiry Successfully Logged!</h3>
          <p className="modal-sub-clean">
            Reference ID: <strong>{successData?.booking?.bookingReference || 'SKB-BOOKING'}</strong>
          </p>
          <p className="modal-desc-clean">
            Your travel request has been recorded. Vicky will confirm vehicle availability and exact written fare on WhatsApp or phone.
          </p>
          <button
            type="button"
            className="btn-continue-wa-green mt-3"
            onClick={() => setModalOpen(false)}
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
}
