/**
 * REST API client for SKB Tour and Travels
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export async function submitBooking(bookingPayload) {
  try {
    const res = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingPayload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Server rejected the booking enquiry.');
    }
    return data;
  } catch (error) {
    console.warn('[API Warning] submitBooking failed, falling back to local processing:', error.message);
    throw error;
  }
}

export async function submitContact(contactPayload) {
  try {
    const res = await fetch(`${API_BASE}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Failed to submit contact message.');
    }
    return data;
  } catch (error) {
    console.warn('[API Warning] submitContact failed:', error.message);
    throw error;
  }
}

export async function fetchFleet() {
  try {
    const res = await fetch(`${API_BASE}/fleet`);
    const data = await res.json();
    return data.fleet;
  } catch (error) {
    console.warn('[API Warning] fetchFleet failed, using static data:', error.message);
    return null;
  }
}
