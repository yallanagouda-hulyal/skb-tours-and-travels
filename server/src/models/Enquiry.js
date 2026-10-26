const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    enquiryReference: {
      type: String,
      unique: true,
      index: true,
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    tripType: {
      type: String,
      default: 'airport_transfer',
    },
    pickupLocation: {
      type: String,
      default: '',
      trim: true,
    },
    destination: {
      type: String,
      default: '',
      trim: true,
    },
    preferredDate: {
      type: Date,
      default: null,
    },
    preferredVehicle: {
      type: String,
      default: '',
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'converted', 'closed'],
      default: 'new',
    },
    internalNotes: {
      type: String,
      default: '',
    },
    source: {
      type: String,
      enum: ['website_form', 'whatsapp_click', 'contact_page', 'direct_call', 'admin_entry'],
      default: 'website_form',
    },
    convertedBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.pre('save', function () {
  if (!this.enquiryReference) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.enquiryReference = `ENQ-${randomNum}`;
  }
});

module.exports = mongoose.model('Enquiry', enquirySchema);
