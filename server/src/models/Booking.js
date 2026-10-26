const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
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
      required: [true, 'Trip type is required'],
      default: 'airport_transfer',
    },
    tripTypeLabel: {
      type: String,
      default: '',
    },
    pickupLocation: {
      type: String,
      required: [true, 'Pickup location is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    travelDate: {
      type: Date,
      required: [true, 'Travel date is required'],
    },
    pickupTime: {
      type: String,
      trim: true,
      default: '',
    },
    preferredVehicle: {
      type: String,
      default: 'Toyota Innova Crysta',
      trim: true,
    },
    passengerCount: {
      type: Number,
      min: 1,
      default: 1,
    },
    returnDate: {
      type: Date,
      default: null,
    },
    additionalStops: {
      type: String,
      trim: true,
      default: '',
    },
    luggageInfo: {
      type: String,
      trim: true,
      default: '',
    },
    additionalInstructions: {
      type: String,
      trim: true,
      default: '',
    },
    packageName: {
      type: String,
      default: '',
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      default: null,
    },
    assignedVehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicle',
      default: null,
    },
    assignedDriver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      default: null,
    },
    status: {
      type: String,
      enum: ['new', 'pending', 'confirmed', 'completed', 'cancelled', 'enquiry_received', 'contacted'],
      default: 'new',
    },
    estimatedFare: {
      type: Number,
      default: 0,
    },
    finalFare: {
      type: Number,
      default: 0,
    },
    fareConfirmed: {
      type: Boolean,
      default: false,
    },
    internalNotes: {
      type: String,
      default: '',
    },
    indicativeNotes: {
      type: String,
      default: 'Pending review by SKB Tour and Travels owner for availability and exact fare.',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate human-friendly reference ID before saving
bookingSchema.pre('save', function () {
  if (!this.bookingReference) {
    const d = new Date();
    const dateStr = d.toISOString().slice(0, 10).replace(/-/g, '');
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    this.bookingReference = `BK-${randomHex}`;
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
