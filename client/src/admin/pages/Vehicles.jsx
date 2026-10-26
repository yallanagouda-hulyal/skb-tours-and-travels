import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Car, Users, Check, AlertCircle } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  updateVehicleStatus,
  deleteVehicle,
} from '../services/adminApi';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    category: 'Toyota Innova Crysta',
    registrationNumber: '',
    passengerCapacity: '6+1 Seater',
    hasAc: true,
    description: '',
    image: '/assets/images/card-innova.png',
    availabilityStatus: 'available',
    indicativePrice: '₹18 - ₹22 / KM',
    isActive: true,
  });

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const res = await getVehicles();
      setVehicles(res || []);
    } catch (err) {
      console.error('loadVehicles error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleOpenCreate = () => {
    setEditingVehicle(null);
    setForm({
      name: '',
      category: 'Toyota Innova Crysta',
      registrationNumber: '',
      passengerCapacity: '6+1 Seater',
      hasAc: true,
      description: '',
      image: '/assets/images/card-innova.png',
      availabilityStatus: 'available',
      indicativePrice: '₹18 - ₹22 / KM',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v) => {
    setEditingVehicle(v);
    setForm({ ...v });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingVehicle) {
      await updateVehicle(editingVehicle._id, form);
    } else {
      await createVehicle(form);
    }
    setIsModalOpen(false);
    loadVehicles();
  };

  const handleStatusChange = async (id, status) => {
    await updateVehicleStatus(id, status);
    loadVehicles();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deleteVehicle(deleteId);
    setDeleteId(null);
    loadVehicles();
  };

  return (
    <div className="admin-page-root">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1 className="admin-page-heading">Vehicle Fleet Management</h1>
          <p className="admin-page-sub">
            Monitor registration details, seating capacity, live dispatch availability and maintenance status.
          </p>
        </div>

        <button type="button" className="btn-admin-primary" onClick={handleOpenCreate}>
          <Plus size={16} />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Fleet Cards Grid */}
      <div className="admin-vehicles-grid">
        {vehicles.map((v) => (
          <div key={v._id} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b58019' }}>
                {v.category}
              </span>
              <select
                value={v.availabilityStatus || 'available'}
                onChange={(e) => handleStatusChange(v._id, e.target.value)}
                className={`status-pill ${v.availabilityStatus || 'available'}`}
                style={{ border: 'none', outline: 'none', cursor: 'pointer' }}
              >
                <option value="available">Available</option>
                <option value="on_trip">On Trip</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <img
                src={v.image || '/assets/images/card-innova.png'}
                alt={v.name}
                style={{ width: 85, height: 60, objectFit: 'contain', background: '#f8fafc', borderRadius: 8, padding: 4 }}
              />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#071426', margin: 0 }}>
                  {v.name}
                </h3>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', letterSpacing: '0.04em', marginTop: 2 }}>
                  {v.registrationNumber || 'KA 01 AB 1234'}
                </div>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: 8, marginBottom: '1rem', fontSize: '0.8rem', color: '#475569', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>Seating:</span>
                <strong>{v.passengerCapacity || '6+1 Seater'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>Air Conditioning:</span>
                <strong>{v.hasAc ? 'Dual AC' : 'Standard'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Indicative Rate:</span>
                <strong>{v.indicativePrice || 'Upon Request'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
              <button
                type="button"
                className="btn-admin-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                onClick={() => handleOpenEdit(v)}
              >
                <Edit2 size={13} />
                <span>Edit</span>
              </button>
              <button
                type="button"
                className="btn-admin-secondary"
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', color: '#ef4444', borderColor: '#fecaca' }}
                onClick={() => setDeleteId(v._id)}
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Vehicle Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingVehicle ? 'Edit Vehicle' : 'Add Fleet Vehicle'}
        footer={
          <>
            <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn-admin-primary" onClick={handleSubmit}>
              {editingVehicle ? 'Update Vehicle' : 'Save Vehicle'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Vehicle Model Name *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. Toyota Innova Crysta"
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
                <option value="Toyota Innova Crysta">Toyota Innova Crysta</option>
                <option value="Sedan 4+1">Sedan 4+1 (Dzire / Etios)</option>
                <option value="Force Traveller">Force Traveller</option>
                <option value="TT">Tempo Traveller (TT)</option>
                <option value="Urbania">Force Urbania</option>
                <option value="Other">Other Vehicle</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Registration Number (Plate) *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. KA 01 AB 1234"
                value={form.registrationNumber}
                onChange={(e) => setForm({ ...form, registrationNumber: e.target.value.toUpperCase() })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Seating Capacity</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. 6+1 Seater, 12 Seater"
                value={form.passengerCapacity}
                onChange={(e) => setForm({ ...form, passengerCapacity: e.target.value })}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Availability Status</label>
              <select
                className="admin-form-select"
                value={form.availabilityStatus}
                onChange={(e) => setForm({ ...form, availabilityStatus: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="on_trip">On Trip</option>
                <option value="maintenance">Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Indicative Pricing</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. ₹18 - ₹22 / KM"
                value={form.indicativePrice}
                onChange={(e) => setForm({ ...form, indicativePrice: e.target.value })}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Description & Amenities</label>
            <textarea
              className="admin-form-textarea"
              rows={2}
              placeholder="Luggage boot, captain seats, individual AC vents..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Fleet Vehicle"
        message="Are you sure you want to remove this vehicle from your active fleet?"
      />
    </div>
  );
}
