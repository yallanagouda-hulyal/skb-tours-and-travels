import React, { useState, useEffect } from 'react';
import { Plus, UserCog, Shield, Trash2, Key } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { getUsers, createUser, deleteUser } from '../services/adminApi';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'booking_manager',
    phone: '',
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      setUsers(res || []);
    } catch (err) {
      console.error('loadUsers error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    setIsModalOpen(false);
    loadUsers();
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    await deleteUser(deleteId);
    setDeleteId(null);
    loadUsers();
  };

  return (
    <div className="admin-page-root">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1 className="admin-page-heading">Administrator User Accounts</h1>
          <p className="admin-page-sub">
            Manage administrative credentials, assign roles (Super Admin, Booking Manager, Fleet Manager).
          </p>
        </div>

        <button
          type="button"
          className="btn-admin-primary"
          onClick={() => {
            setForm({
              name: '',
              email: '',
              password: '',
              role: 'booking_manager',
              phone: '',
            });
            setIsModalOpen(true);
          }}
        >
          <Plus size={16} />
          <span>Add Admin User</span>
        </button>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Administrator</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div className="item-avatar-user">
                        {u.name?.charAt(0) || 'A'}
                      </div>
                      <span style={{ fontWeight: 700 }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ color: '#0369a1', fontWeight: 500 }}>{u.email}</td>
                  <td>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: 4,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: u.role === 'super_admin' ? '#fef8eb' : '#f1f5f9',
                        color: u.role === 'super_admin' ? '#b58019' : '#475569',
                      }}
                    >
                      {u.role === 'super_admin' ? 'Super Admin' : u.role === 'booking_manager' ? 'Booking Manager' : 'Fleet Manager'}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill confirmed">Active</span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-GB') : 'Initial'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {u.email !== 'admin@skbtravels.com' && (
                      <button
                        type="button"
                        className="btn-icon-action"
                        style={{ color: '#ef4444' }}
                        onClick={() => setDeleteId(u._id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Administrator Account"
        footer={
          <>
            <button type="button" className="btn-admin-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="btn-admin-primary" onClick={handleSubmit}>
              Create Admin
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Name *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="Admin Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Email Address *</label>
              <input
                type="email"
                className="admin-form-input"
                placeholder="admin@skbtravels.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="admin-form-group">
              <label className="admin-form-label">Password *</label>
              <input
                type="password"
                className="admin-form-input"
                placeholder="At least 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
              />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Role</label>
              <select
                className="admin-form-select"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              >
                <option value="super_admin">Super Admin (Full Access)</option>
                <option value="booking_manager">Booking Manager</option>
                <option value="fleet_manager">Fleet Manager</option>
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
        title="Delete Admin Account"
        message="Are you sure you want to delete this administrator account?"
      />
    </div>
  );
}
