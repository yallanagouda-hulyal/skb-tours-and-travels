import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Phone, ShieldCheck, AlertTriangle, UserCheck } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from '../services/adminApi';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    phoneNumber: '',
    licenceNumber: '',
    licenceExpiryDate: '2028-12-31',
    assignedVehicleName: 'Toyota Innova Crysta',
    availabilityStatus: 'available',
    experienceYears: 5,
    address: 'Devanahalli, Bengaluru',
    notes: '',
  });

  const loadDrivers = async () => {
    try {
      setLoading(true);
      const res = await getDrivers();
      setDrivers(res || []);
    } catch (err) {
      console.error('loadDrivers error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleOpenCreate = () => {
    setEditingDriver(null);
    setForm({
      name: '',
      phoneNumber: '',
      licenceNumber: '',
      licenceExpiryDate: '2028-12-31',
      assignedVehicleName: 'Toyota Innova Crysta',
      availabilityStatus: 'available',
      experienceYears: 5,
      address: 'Devanahalli, Bengaluru',
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (d) => {
    setEditingDriver(d);
    setForm({
      ...d,
      licenceExpiryDate: d.licenceExpiryDate ? new Date(d.licenceExpiryDate).toISOString().split('T')[0] : '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingDriver) {
      await updateDriver(editingDriver._id, form);
    } else {
      await createDriver(form);
    }
    setIsModalOpen(false);
    loadDrivers();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deleteDriver(deleteId);
    setDeleteId(null);
    loadDrivers();
  };

  return (
    <div className="admin-page-root">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1 className="admin-page-heading">Chauffeur & Driver Management</h1>
          <p className="admin-page-sub">
            Track commercial driving licences, contact information, duty assignments and availability.
          </p>
        </div>

        <button type="button" className="btn-admin-primary" onClick={handleOpenCreate}>
          <Plus size={16} />
          <span>Add New Driver</span>
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Driver Name</th>
                <th>Phone Number</th>
                <th>Licence Number</th>
                <th>Licence Expiry</th>
                <th>Assigned Fleet</th>
                <th>Experience</th>
                <th>Duty Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                    No drivers recorded. Add your first chauffeur using the button above.
                  </td>
                </tr>
              ) : (
                drivers.map((d) => (
                  <tr key={d._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div className="item-avatar-user">
                          {d.name?.charAt(0) || 'D'}
                        </div>
                        <span style={{ fontWeight: 700 }}>{d.name}</span>
                      </div>
                    </td>
                    <td>
                      <a href={`tel:${d.phoneNumber}`} style={{ color: '#0369a1', textDecoration: 'none', fontWeight: 600 }}>
                        {d.phoneNumber}
                      </a>
                    </td>
                    <td style={{ fontWeight: 600, color: '#334155', letterSpacing: '0.04em' }}>
                      {d.licenceNumber}
                    </td>
                    <td>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem' }}>
                        <ShieldCheck size={14} style={{ color: '#16a34a' }} />
                        <span>{d.licenceExpiryDate ? new Date(d.licenceExpiryDate).toLocaleDateString('en-GB') : 'Valid'}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#475569' }}>
                      {d.assignedVehicleName || 'Unassigned'}
                    </td>
                    <td>{d.experienceYears ? `${d.experienceYears} Yrs` : '5+ Yrs'}</td>
                    <td>
                      <span className={`status-pill ${d.availabilityStatus === 'available' ? 'confirmed' : 'pending'}`}>
                        {d.availabilityStatus === 'available' ? 'Available' : 'On Duty'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          className="btn-icon-action"
                          onClick={() => handleOpenEdit(d)}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          type="button"
                          className="btn-icon-action"
                          style={{ color: '#ef4444' }}
                          onClick={() => setDeleteId(d._id)}
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

      {/* Add / Edit Driver Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDriver ? 'Edit Chauffeur' : 'Add Chauffeur'}
        footer={
          <>
            <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn-admin-primary" onClick={handleSubmit}>
              {editingDriver ? 'Update Chauffeur' : 'Save Chauffeur'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Full Name *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="Driver Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Mobile Number *</label>
              <input
                type="tel"
                className="admin-form-input"
                placeholder="10-digit phone"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Commercial Licence Number *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. KA0120180012345"
                value={form.licenceNumber}
                onChange={(e) => setForm({ ...form, licenceNumber: e.target.value.toUpperCase() })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Licence Expiry Date *</label>
              <input
                type="date"
                className="admin-form-input"
                value={form.licenceExpiryDate}
                onChange={(e) => setForm({ ...form, licenceExpiryDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Assigned Vehicle</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. Toyota Innova Crysta (KA 01 AB 1234)"
                value={form.assignedVehicleName}
                onChange={(e) => setForm({ ...form, assignedVehicleName: e.target.value })}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Duty Status</label>
              <select
                className="admin-form-select"
                value={form.availabilityStatus}
                onChange={(e) => setForm({ ...form, availabilityStatus: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="on_duty">On Duty</option>
                <option value="off_duty">Off Duty</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Driver"
        message="Are you sure you want to remove this driver profile?"
      />
    </div>
  );
}
