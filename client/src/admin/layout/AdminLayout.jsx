import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import { useAdminAuth } from '../context/AdminAuthContext';
import '../styles/admin.css';

export default function AdminLayout() {
  const { isAuthenticated, loading } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#071426', color: '#E7B84D' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>SKB Tour and Travels</div>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Loading Admin Console...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleToggleSidebar = () => {
    if (window.innerWidth <= 860) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className="admin-app-root">
      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className={`admin-main-wrapper ${collapsed ? 'expanded' : ''}`}>
        <AdminHeader onToggleSidebar={handleToggleSidebar} />

        <main className="admin-content-container">
          <Outlet />
        </main>
      </div>

      {/* Backdrop for mobile drawer */}
      {mobileOpen && (
        <div
          className="admin-mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
