import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, ExternalLink, Settings, LogOut, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminHeader({ onToggleSidebar }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/admin/bookings?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const notifications = [
    { id: 1, title: 'New Booking Request', desc: 'Ramesh Kumar booked Outstation Trip to Mysore', time: '10 mins ago' },
    { id: 2, title: 'Customer Enquiry', desc: 'Vikram S requested Innova Crysta for Ooty', time: '25 mins ago' },
    { id: 3, title: 'Vehicle Status Update', desc: 'Force Urbania (KA 05 CD 5678) marked On Trip', time: '1 hour ago' },
  ];

  return (
    <header className="admin-header">
      {/* Left: Hamburger, Brand Logo & Page Title */}
      <div className="admin-header-left">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="admin-toggle-btn"
          aria-label="Toggle navigation sidebar"
        >
          <Menu size={22} />
        </button>

        <img
          src="/assets/images/skb-logo.jpeg"
          alt="SKB Tour and Travels"
          className="admin-header-logo-badge"
        />

        <div className="admin-header-titles">
          <span className="admin-header-main-title">SKB Tour and Travels</span>
          <span className="admin-header-sub-title">Admin Panel</span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <form onSubmit={handleSearchSubmit} className="admin-header-search">
        <Search size={16} className="admin-search-icon" />
        <input
          type="text"
          placeholder="Search bookings, customers, vehicles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search-input"
        />
      </form>

      {/* Right: Notifications & Profile */}
      <div className="admin-header-right" ref={dropdownRef}>
        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="admin-icon-pill-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="View notifications"
          >
            <Bell size={18} />
            <span className="admin-badge-count">3</span>
          </button>

          {notificationsOpen && (
            <div className="admin-dropdown-menu" style={{ width: 290, right: 0 }}>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f1f5f9', fontWeight: 700, fontSize: '0.85rem' }}>
                Notifications (3 New)
              </div>
              {notifications.map((n) => (
                <div key={n.id} style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f8fafc', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 700, color: '#071426', marginBottom: 2 }}>{n.title}</div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{n.desc}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: 4 }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div style={{ position: 'relative' }}>
          <div
            className="admin-user-profile-menu"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            role="button"
            tabIndex={0}
          >
            <div className="admin-avatar">
              <span>{admin?.name?.charAt(0) || 'A'}</span>
              <span className="admin-online-dot" />
            </div>
            <div className="admin-profile-meta">
              <span className="admin-profile-name">{admin?.name || 'Admin'}</span>
              <span className="admin-profile-role">
                {admin?.role === 'super_admin' ? 'Administrator' : admin?.role || 'Administrator'}
              </span>
            </div>
          </div>

          {dropdownOpen && (
            <div className="admin-dropdown-menu">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="dropdown-item"
                onClick={() => setDropdownOpen(false)}
              >
                <ExternalLink size={15} />
                <span>View Website</span>
              </a>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate('/admin/settings');
                }}
              >
                <Settings size={15} />
                <span>Settings</span>
              </button>
              <div style={{ height: 1, background: '#f1f5f9', margin: '4px 0' }} />
              <button
                type="button"
                className="dropdown-item danger"
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                  navigate('/admin/login');
                }}
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
