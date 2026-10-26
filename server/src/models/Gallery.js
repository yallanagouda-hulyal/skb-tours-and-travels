const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['vehicles', 'destinations', 'trips', 'events'],
      default: 'vehicles',
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    altText: {
      type: String,
      default: '',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Gallery', gallerySchema);
