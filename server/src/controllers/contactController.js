const Contact = require('../models/Contact');

const inMemoryContacts = [];

/**
 * @desc Create contact message
 * @route POST /api/contacts
 */
exports.createContactMessage = async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and message are required.',
      });
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      subject: subject ? subject.trim() : 'General Travel Enquiry',
      message: message.trim(),
    };

    let savedContact;
    let dbPersisted = true;

    try {
      savedContact = await Contact.create(payload);
    } catch (err) {
      console.warn('[Contact DB Warning] Saving in-memory:', err.message);
      dbPersisted = false;
      savedContact = { ...payload, _id: 'temp_' + Date.now(), createdAt: new Date() };
      inMemoryContacts.push(savedContact);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Vicky and the SKB team will contact you shortly.',
      dbPersisted,
      contact: savedContact,
    });
  } catch (error) {
    console.error('Error in createContactMessage:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit contact message. Please call or WhatsApp us directly.',
    });
  }
};

/**
 * @desc Get contact messages
 * @route GET /api/contacts
 */
exports.getContactMessages = async (req, res) => {
  try {
    let contacts = [];
    try {
      contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
    } catch (err) {
      contacts = inMemoryContacts.slice().reverse();
    }
    return res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching contacts.',
    });
  }
};
