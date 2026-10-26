import React, { useState, useEffect } from 'react';
import { Star, Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../services/adminApi';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    customerName: '',
    rating: 5,
    comment: '',
    tripCategory: 'Airport Transfer',
    status: 'approved',
    isTestimonial: false,
    isFeatured: false,
    source: 'website',
  });

  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await getReviews();
      setReviews(res || []);
    } catch (err) {
      console.error('loadReviews error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateReview(id, { status });
    loadReviews();
  };

  const handleToggleFeature = async (id, currentVal) => {
    await updateReview(id, { isFeatured: !currentVal });
    loadReviews();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview(form);
    setIsModalOpen(false);
    loadReviews();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deleteReview(deleteId);
    setDeleteId(null);
    loadReviews();
  };

  return (
    <div className="admin-page-root">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1 className="admin-page-heading">Customer Reviews & Ratings</h1>
          <p className="admin-page-sub">
            Moderate genuine passenger reviews, check star ratings, and feature approved feedback.
          </p>
        </div>

        <button
          type="button"
          className="btn-admin-primary"
          onClick={() => {
            setForm({
              customerName: '',
              rating: 5,
              comment: '',
              tripCategory: 'Airport Transfer',
              status: 'approved',
              isTestimonial: false,
              isFeatured: false,
              source: 'website',
            });
            setIsModalOpen(true);
          }}
        >
          <Plus size={16} />
          <span>Add Verified Review</span>
        </button>
      </div>

      <div className="admin-reviews-grid">
        {reviews.map((r) => (
          <div key={r._id} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#071426', margin: 0 }}>
                  {r.customerName}
                </h3>
                <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  {r.tripCategory || 'Trip'} • via {r.source || 'Website'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    fill={s <= r.rating ? '#eab308' : '#e2e8f0'}
                    stroke={s <= r.rating ? '#eab308' : '#cbd5e1'}
                  />
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1, fontStyle: 'italic' }}>
              "{r.comment}"
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
              <select
                value={r.status || 'approved'}
                onChange={(e) => handleStatusChange(r._id, e.target.value)}
                className={`status-pill ${r.status || 'approved'}`}
                style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>

              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <button
                  type="button"
                  className="btn-icon-action"
                  style={{ color: r.isFeatured ? '#15803d' : '#94a3b8' }}
                  title={r.isFeatured ? 'Featured on Home' : 'Click to feature on Home'}
                  onClick={() => handleToggleFeature(r._id, r.isFeatured)}
                >
                  <Star size={15} fill={r.isFeatured ? '#15803d' : 'none'} />
                </button>
                <button
                  type="button"
                  className="btn-icon-action"
                  style={{ color: '#ef4444' }}
                  title="Delete Review"
                  onClick={() => setDeleteId(r._id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Customer Review"
        footer={
          <>
            <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn-admin-primary" onClick={handleSubmit}>
              Save Review
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Customer Name *</label>
              <input
                type="text"
                className="admin-form-input"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Rating (1 to 5 Stars)</label>
              <select
                className="admin-form-select"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              >
                <option value={5}>5 Stars (Excellent)</option>
                <option value={4}>4 Stars (Very Good)</option>
                <option value={3}>3 Stars (Average)</option>
                <option value={2}>2 Stars (Poor)</option>
                <option value={1}>1 Star (Unsatisfactory)</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Trip Category</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. Airport Transfer, Mysore Tour"
                value={form.tripCategory}
                onChange={(e) => setForm({ ...form, tripCategory: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Review Source</label>
              <select
                className="admin-form-select"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              >
                <option value="website">Website</option>
                <option value="google">Google Maps</option>
                <option value="whatsapp">WhatsApp Feedback</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Customer Review Text *</label>
            <textarea
              className="admin-form-textarea"
              rows={3}
              placeholder="Passenger comments regarding punctuality, cleanliness and chauffeur behavior..."
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              required
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Review"
        message="Are you sure you want to permanently delete this customer review?"
      />
    </div>
  );
}
