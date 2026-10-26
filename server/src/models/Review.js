const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
      default: 5,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
    },
    tripCategory: {
      type: String,
      default: 'Airport Transfer',
    },
    isTestimonial: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'approved',
    },
    source: {
      type: String,
      enum: ['google', 'website', 'whatsapp', 'admin_entry'],
      default: 'website',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
