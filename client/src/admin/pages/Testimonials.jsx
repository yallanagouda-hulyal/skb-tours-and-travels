import React, { useState, useEffect } from 'react';
import { Quote, Star, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../services/adminApi';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    customerName: '',
    rating: 5,
    comment: '',
    tripCategory: 'Airport Transfer',
    status: 'approved',
    isTestimonial: true,
    isFeatured: true,
  });

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const res = await getReviews({ isTestimonial: 'true' });
      setTestimonials(res || []);
    } catch (err) {
      console.error('loadTestimonials error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview({ ...form, isTestimonial: true, isFeatured: true });
    setIsModalOpen(false);
    loadTestimonials();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deleteReview(deleteId);
    setDeleteId(null);
    loadTestimonials();
  };

  return (
    <div className="admin-page-root">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1 className="admin-page-heading">Featured Testimonials</h1>
          <p className="admin-page-sub">
            Curate customer experiences and testimonials highlighted across the public website.
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
              isTestimonial: true,
              isFeatured: true,
            });
            setIsModalOpen(true);
          }}
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {testimonials.map((t) => (
          <div key={t._id} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#fef8eb',
                    color: '#b58019',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Quote size={16} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#071426', margin: 0 }}>
                    {t.customerName}
                  </h3>
                  <span style={{ fontSize: '0.74rem', color: '#64748b' }}>{t.tripCategory}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={13} fill="#eab308" stroke="#eab308" />
                ))}
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1, fontStyle: 'italic' }}>
              "{t.comment}"
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
              <span className="status-pill confirmed">Featured on Home</span>
              <button
                type="button"
                className="btn-icon-action"
                style={{ color: '#ef4444' }}
                onClick={() => setDeleteId(t._id)}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Website Testimonial"
        footer={
          <>
            <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn-admin-primary" onClick={handleSubmit}>
              Save Testimonial
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Client Name *</label>
              <input
                type="text"
                className="admin-form-input"
                value={form.customerName}
                onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Trip Category</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. Airport Transfer, Corporate Trip"
                value={form.tripCategory}
                onChange={(e) => setForm({ ...form, tripCategory: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Testimonial Quote *</label>
            <textarea
              className="admin-form-textarea"
              rows={3}
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
        title="Delete Testimonial"
        message="Are you sure you want to remove this testimonial from your website?"
      />
    </div>
  );
}
