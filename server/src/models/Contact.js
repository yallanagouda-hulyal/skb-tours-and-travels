const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    subject: {
      type: String,
      trim: true,
      default: 'General Travel Enquiry',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['unread', 'responded', 'closed'],
      default: 'unread',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
