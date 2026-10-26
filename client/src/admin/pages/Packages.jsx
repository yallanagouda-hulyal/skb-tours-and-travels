import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Tag, Clock, Navigation } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getPackages,
  createPackage,
  updatePackage,
  togglePackage,
  deletePackage,
} from '../services/adminApi';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    category: 'local',
    description: '',
    duration: '4 Hours',
    includedDistance: 40,
    basePrice: 1200,
    additionalHourRate: 150,
    additionalKmRate: 13,
    minDailyKm: 40,
    driverAllowance: 0,
    isFeatured: true,
    displayOrder: 1,
    image: '/assets/images/pkg-local-4h.jpg',
    isActive: true,
  });

  const loadPackages = async () => {
    try {
      setLoading(true);
      const res = await getPackages();
      setPackages(res || []);
    } catch (err) {
      console.error('loadPackages error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleOpenCreate = () => {
    setEditingPkg(null);
    setForm({
      name: '',
      category: 'local',
      description: '',
      duration: '4 Hours',
      includedDistance: 40,
      basePrice: 1200,
      additionalHourRate: 150,
      additionalKmRate: 13,
      minDailyKm: 40,
      driverAllowance: 0,
      isFeatured: true,
      displayOrder: 1,
      image: '/assets/images/pkg-local-4h.jpg',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg) => {
    setEditingPkg(pkg);
    setForm({ ...pkg });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingPkg) {
      await updatePackage(editingPkg._id, form);
    } else {
      await createPackage(form);
    }
    setIsModalOpen(false);
    loadPackages();
  };

  const handleToggle = async (id) => {
    await togglePackage(id);
    loadPackages();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deletePackage(deleteId);
    setDeleteId(null);
    loadPackages();
  };

  return (
    <div className="admin-page-root">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1 className="admin-page-heading">Travel Packages & Rates</h1>
          <p className="admin-page-sub">
            Configure local, outstation, and airport packages with transparent business pricing rules.
          </p>
        </div>

        <button type="button" className="btn-admin-primary" onClick={handleOpenCreate}>
          <Plus size={16} />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Grid of Packages */}
      <div className="admin-packages-grid">
        {packages.map((pkg) => (
          <div key={pkg._id} className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: '#b58019',
                    letterSpacing: '0.06em',
                  }}
                >
                  {pkg.category} Package
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#071426', marginTop: 2 }}>
                  {pkg.name}
                </h3>
              </div>

              <span
                style={{
                  cursor: 'pointer',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 9999,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: pkg.isActive ? '#dcfce7' : '#fee2e2',
                  color: pkg.isActive ? '#15803d' : '#b91c1c',
                }}
                onClick={() => handleToggle(pkg._id)}
                title="Click to toggle active"
              >
                {pkg.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
              {pkg.description}
            </p>

            <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: 8, marginBottom: '1.25rem', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Base Price</span>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#071426' }}>₹{pkg.basePrice}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.78rem', color: '#475569' }}>
                <div>⏱ Duration: <strong>{pkg.duration}</strong></div>
                <div>🛣 Included: <strong>{pkg.includedDistance} KM</strong></div>
                {pkg.additionalHourRate > 0 && <div>+ Extra Hr: <strong>₹{pkg.additionalHourRate}</strong></div>}
                {pkg.additionalKmRate > 0 && <div>+ Extra KM: <strong>₹{pkg.additionalKmRate}</strong></div>}
                {pkg.driverAllowance > 0 && <div>🌙 Night Allowance: <strong>₹{pkg.driverAllowance}</strong></div>}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
              <button
                type="button"
                className="btn-admin-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                onClick={() => handleOpenEdit(pkg)}
              >
                <Edit2 size={13} />
                <span>Edit</span>
              </button>
              <button
                type="button"
                className="btn-admin-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#fecaca' }}
                onClick={() => setDeleteId(pkg._id)}
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Package Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPkg ? 'Edit Package' : 'Create Travel Package'}
        footer={
          <>
            <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn-admin-primary" onClick={handleSubmit}>
              {editingPkg ? 'Update Package' : 'Create Package'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Package Name *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. Local City Trip (4H / 40KM)"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Category</label>
              <select
                className="admin-form-select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="local">Local City Trip</option>
                <option value="outstation">Outstation Trip</option>
                <option value="airport">Airport Transfer</option>
                <option value="custom">Custom Package</option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Description *</label>
            <textarea
              className="admin-form-textarea"
              rows={2}
              placeholder="Package description, vehicle suggestions, route information..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Duration</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. 4 Hours, 8 Hours, Per Day"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Included Distance (KM)</label>
              <input
                type="number"
                className="admin-form-input"
                value={form.includedDistance}
                onChange={(e) => setForm({ ...form, includedDistance: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Base Price (₹) *</label>
              <input
                type="number"
                className="admin-form-input"
                placeholder="e.g. 1200"
                value={form.basePrice}
                onChange={(e) => setForm({ ...form, basePrice: Number(e.target.value) })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Extra Hour Rate (₹)</label>
              <input
                type="number"
                className="admin-form-input"
                placeholder="e.g. 150"
                value={form.additionalHourRate}
                onChange={(e) => setForm({ ...form, additionalHourRate: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Extra KM Rate (₹)</label>
              <input
                type="number"
                className="admin-form-input"
                placeholder="e.g. 13"
                value={form.additionalKmRate}
                onChange={(e) => setForm({ ...form, additionalKmRate: Number(e.target.value) })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Driver Night Allowance (₹)</label>
              <input
                type="number"
                className="admin-form-input"
                placeholder="e.g. 400"
                value={form.driverAllowance}
                onChange={(e) => setForm({ ...form, driverAllowance: Number(e.target.value) })}
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
        title="Delete Package"
        message="Are you sure you want to remove this package? It will no longer be visible on the public website."
      />
    </div>
  );
}
