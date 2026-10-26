import React, { useState, useEffect } from 'react';
import { Plus, Tag, Calendar, Edit2, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from '../services/adminApi';

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 10,
    bannerImage: '/assets/images/airport-hero-banner.png',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '2026-12-31',
    isActive: true,
  });

  const loadOffers = async () => {
    try {
      setLoading(true);
      const res = await getOffers();
      setOffers(res || []);
    } catch (err) {
      console.error('loadOffers error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOffer(form);
    setIsModalOpen(false);
    loadOffers();
  };

  const handleToggle = async (offer) => {
    await updateOffer(offer._id, { isActive: !offer.isActive });
    loadOffers();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deleteOffer(deleteId);
    setDeleteId(null);
    loadOffers();
  };

  return (
    <div className="admin-page-root">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1 className="admin-page-heading">Offers & Banners</h1>
          <p className="admin-page-sub">
            Manage promotional campaigns, seasonal discount codes and homepage announcement banners.
          </p>
        </div>

        <button
          type="button"
          className="btn-admin-primary"
          onClick={() => {
            setForm({
              title: '',
              code: 'SKBFLY10',
              description: '',
              discountType: 'percentage',
              discountValue: 10,
              bannerImage: '/assets/images/airport-hero-banner.png',
              startDate: new Date().toISOString().split('T')[0],
              endDate: '2026-12-31',
              isActive: true,
            });
            setIsModalOpen(true);
          }}
        >
          <Plus size={16} />
          <span>Create New Offer</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {offers.map((offer) => (
          <div key={offer._id} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    background: '#fef8eb',
                    color: '#b58019',
                    border: '1px dashed #E7B84D',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 6,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.05em',
                    marginBottom: 4,
                  }}
                >
                  {offer.code || 'SPECIAL OFFER'}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#071426', margin: 0 }}>
                  {offer.title}
                </h3>
              </div>

              <span
                style={{
                  cursor: 'pointer',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 9999,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: offer.isActive ? '#dcfce7' : '#fee2e2',
                  color: offer.isActive ? '#15803d' : '#b91c1c',
                }}
                onClick={() => handleToggle(offer)}
              >
                {offer.isActive ? 'Active' : 'Disabled'}
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
              {offer.description}
            </p>

            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: 8, fontSize: '0.78rem', color: '#475569', marginBottom: '1rem', border: '1px solid #f1f5f9' }}>
              <div>Benefit: <strong>{offer.discountValue}% OFF</strong></div>
              <div style={{ marginTop: 2 }}>
                Valid: {offer.startDate ? new Date(offer.startDate).toLocaleDateString('en-GB') : 'Immediate'} to{' '}
                {offer.endDate ? new Date(offer.endDate).toLocaleDateString('en-GB') : 'Indefinite'}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
              <button
                type="button"
                className="btn-admin-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#fecaca' }}
                onClick={() => setDeleteId(offer._id)}
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Promotional Offer"
        footer={
          <>
            <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn-admin-primary" onClick={handleSubmit}>
              Save Offer
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Offer Title *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. Airport Transfer Early Bird"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Promo Code</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. FLYBLR10"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Offer Description *</label>
            <textarea
              className="admin-form-textarea"
              rows={2}
              placeholder="Terms and booking details..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Discount Percentage (%)</label>
              <input
                type="number"
                className="admin-form-input"
                value={form.discountValue}
                onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">End Date</label>
              <input
                type="date"
                className="admin-form-input"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Offer"
        message="Are you sure you want to delete this promotional offer?"
      />
    </div>
  );
}
