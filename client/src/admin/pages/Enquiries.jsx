import React, { useState, useEffect } from 'react';
import {
  Search,
  MessageSquare,
  Phone,
  Send,
  CheckCircle,
  Eye,
  Edit2,
  Trash2,
  ArrowRightCircle,
  Clock,
} from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getEnquiries,
  createEnquiry,
  updateEnquiry,
  convertEnquiryToBooking,
  deleteEnquiry,
} from '../services/adminApi';

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [viewEnq, setViewEnq] = useState(null);
  const [editEnq, setEditEnq] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const res = await getEnquiries({ search, status: statusFilter });
      setEnquiries(res.enquiries || []);
    } catch (err) {
      console.error('loadEnquiries error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [search, statusFilter]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editEnq) return;
    await updateEnquiry(editEnq._id, editEnq);
    setEditEnq(null);
    loadEnquiries();
  };

  const handleConvert = async (id) => {
    await convertEnquiryToBooking(id);
    loadEnquiries();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deleteEnquiry(deleteId);
    setDeleteId(null);
    loadEnquiries();
  };

  const handleOpenWhatsApp = (enq) => {
    const cleanPhone = enq.phoneNumber.replace(/\D/g, '');
    const phoneWithCode = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = `Hello ${enq.customerName}, regarding your travel enquiry with SKB Tour and Travels (${enq.tripType || 'ride'} to ${enq.destination || 'destination'}). How may we assist you with vehicle availability and best fare?`;
    window.open(`https://wa.me/${phoneWithCode}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="admin-page-root">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1 className="admin-page-heading">Customer Enquiry Inbox</h1>
          <p className="admin-page-sub">
            Respond to travel queries, quote fares, dispatch on WhatsApp and convert enquiries into confirmed rides.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search enquiries by name, phone, destination..."
            className="toolbar-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="toolbar-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="quoted">Quoted</option>
          <option value="converted">Converted</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Table Card */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Enquiry ID</th>
                <th>Customer</th>
                <th>Trip Type</th>
                <th>Route / Destination</th>
                <th>Preference</th>
                <th>Time / Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    No customer enquiries found in this view.
                  </td>
                </tr>
              ) : (
                enquiries.map((e) => (
                  <tr key={e._id}>
                    <td style={{ fontWeight: 800, color: '#071426' }}>
                      {e.enquiryReference || 'ENQ-900'}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{e.customerName}</div>
                      <div style={{ fontSize: '0.78rem', color: '#0369a1' }}>{e.phoneNumber}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.78rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 4 }}>
                        {e.tripType || 'General'}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{e.destination || e.pickupLocation || 'Bangalore'}</div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#475569' }}>
                      {e.preferredVehicle || 'Any Vehicle'}
                    </td>
                    <td style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {e.timeAgo || (e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'Recent')}
                    </td>
                    <td>
                      <span className={`status-pill ${e.status || 'new'}`}>
                        {e.status || 'new'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.35rem', alignItems: 'center' }}>
                        {/* WhatsApp Quick Action */}
                        <button
                          type="button"
                          className="btn-icon-action"
                          style={{ color: '#16a34a' }}
                          title="Open WhatsApp Chat"
                          onClick={() => handleOpenWhatsApp(e)}
                        >
                          <Send size={15} />
                        </button>

                        {/* Call Quick Action */}
                        <a
                          href={`tel:${e.phoneNumber}`}
                          className="btn-icon-action"
                          style={{ color: '#0284c7' }}
                          title="Call Customer"
                        >
                          <Phone size={15} />
                        </a>

                        {/* Convert to Booking */}
                        {e.status !== 'converted' && (
                          <button
                            type="button"
                            className="btn-icon-action"
                            style={{ color: '#eab308' }}
                            title="Convert to Booking"
                            onClick={() => handleConvert(e._id)}
                          >
                            <ArrowRightCircle size={15} />
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn-icon-action"
                          title="View Details"
                          onClick={() => setViewEnq(e)}
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon-action"
                          title="Edit Status"
                          onClick={() => setEditEnq(e)}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon-action"
                          style={{ color: '#ef4444' }}
                          title="Delete"
                          onClick={() => setDeleteId(e._id)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Enquiry Details Modal */}
      {viewEnq && (
        <Modal
          isOpen={!!viewEnq}
          onClose={() => setViewEnq(null)}
          title={`Enquiry — ${viewEnq.customerName}`}
          footer={
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-admin-secondary"
                style={{ color: '#16a34a', borderColor: '#bbf7d0', background: '#f0fdf4' }}
                onClick={() => handleOpenWhatsApp(viewEnq)}
              >
                <Send size={14} />
                <span>Message on WhatsApp</span>
              </button>
              {viewEnq.status !== 'converted' && (
                <button
                  type="button"
                  className="btn-admin-primary"
                  onClick={() => {
                    handleConvert(viewEnq._id);
                    setViewEnq(null);
                  }}
                >
                  Convert to Booking
                </button>
              )}
            </div>
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.88rem' }}>
            <div>
              <span className="admin-form-label">CUSTOMER NAME</span>
              <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{viewEnq.customerName}</div>
            </div>
            <div>
              <span className="admin-form-label">PHONE NUMBER</span>
              <a href={`tel:${viewEnq.phoneNumber}`} style={{ fontWeight: 700, color: '#0369a1' }}>
                {viewEnq.phoneNumber}
              </a>
            </div>
            <div>
              <span className="admin-form-label">TRIP CATEGORY</span>
              <div>{viewEnq.tripType || 'General Enquiry'}</div>
            </div>
            <div>
              <span className="admin-form-label">STATUS</span>
              <span className={`status-pill ${viewEnq.status || 'new'}`}>{viewEnq.status || 'new'}</span>
            </div>
            <div>
              <span className="admin-form-label">PICKUP POINT</span>
              <div>{viewEnq.pickupLocation || 'Bengaluru'}</div>
            </div>
            <div>
              <span className="admin-form-label">DESTINATION</span>
              <div>{viewEnq.destination || 'Not specified'}</div>
            </div>
            <div>
              <span className="admin-form-label">PREFERRED VEHICLE</span>
              <div>{viewEnq.preferredVehicle || 'Any available'}</div>
            </div>
            <div>
              <span className="admin-form-label">SOURCE</span>
              <div style={{ textTransform: 'capitalize' }}>{viewEnq.source || 'Website'}</div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <span className="admin-form-label">CUSTOMER MESSAGE / SPECIAL REQUEST</span>
              <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: 8, border: '1px solid #e2e8f0', marginTop: 4 }}>
                {viewEnq.message || 'No additional note provided by customer.'}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Enquiry Modal */}
      {editEnq && (
        <Modal
          isOpen={!!editEnq}
          onClose={() => setEditEnq(null)}
          title={`Update Enquiry — ${editEnq.customerName}`}
          footer={
            <>
              <button type="button" className="btn-admin-secondary" onClick={() => setEditEnq(null)}>
                Cancel
              </button>
              <button type="button" className="btn-admin-primary" onClick={handleEditSubmit}>
                Save Changes
              </button>
            </>
          }
        >
          <form onSubmit={handleEditSubmit}>
            <div className="form-grid-2">
              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select
                  className="admin-form-select"
                  value={editEnq.status}
                  onChange={(e) => setEditEnq({ ...editEnq, status: e.target.value })}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Destination</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={editEnq.destination || ''}
                  onChange={(e) => setEditEnq({ ...editEnq, destination: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Internal Follow-up Notes</label>
              <textarea
                className="admin-form-textarea"
                rows={3}
                placeholder="Log customer quote details, response from Vicky or driver availability..."
                value={editEnq.internalNotes || ''}
                onChange={(e) => setEditEnq({ ...editEnq, internalNotes: e.target.value })}
              />
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Enquiry Record"
        message="Are you sure you want to delete this customer enquiry from your inbox?"
      />
    </div>
  );
}
