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
      validate: {
        validator: function (v) {
          // Indian 10-digit number or international with +91
          return /^(?:\+?91[\-\s]?)?[6789]\d{9}$/.test(v.replace(/\s+/g, ''));
        },
        message: (props) => `${props.value} is not a valid 10-digit phone number`,
      },
    },
    tripType: {
      type: String,
      required: [true, 'Trip type is required'],
      enum: [
        'airport_transfer',
        'local_4h_40km',
        'local_8h_80km',
        'outstation_oneway',
        'outstation_round',
        'pan_india',
        'group_travel',
      ],
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
      validate: {
        validator: function (v) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return v >= today;
        },
        message: 'Travel date cannot be in the past',
      },
    },
    pickupTime: {
      type: String,
      trim: true,
      default: '',
    },
    preferredVehicle: {
      type: String,
      required: [true, 'Preferred vehicle is required'],
      trim: true,
    },
    passengerCount: {
      type: Number,
      min: [1, 'At least 1 passenger is required'],
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
    status: {
      type: String,
      enum: ['enquiry_received', 'contacted', 'confirmed', 'cancelled'],
      default: 'enquiry_received',
    },
    fareConfirmed: {
      type: Boolean,
      default: false,
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
    this.bookingReference = `SKB-${dateStr}-${randomHex}`;
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
