import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Package,
  Car,
  UserCheck,
  Users,
  Star,
  UserCog,
  FileBarChart,
  Settings,
  LogOut,
  ChevronRight,
  X,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminSidebar({ collapsed, mobileOpen, onCloseMobile }) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Nav Items with Offers & Banners removed as requested
  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/bookings', icon: Calendar, label: 'Bookings' },
    { to: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
    { to: '/admin/packages', icon: Package, label: 'Packages', hasSub: true },
    { to: '/admin/vehicles', icon: Car, label: 'Vehicles', hasSub: true },
    { to: '/admin/drivers', icon: UserCheck, label: 'Drivers' },
    { to: '/admin/customers', icon: Users, label: 'Customers' },
    { to: '/admin/reviews', icon: Star, label: 'Reviews' },
    { to: '/admin/reports', icon: FileBarChart, label: 'Reports' },
    { to: '/admin/users', icon: UserCog, label: 'Users' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Header with SKB Brand Logo */}
      <div className="admin-sidebar-header">
        <NavLink to="/admin/dashboard" className="admin-sidebar-logo" onClick={onCloseMobile}>
          <div className="admin-logo-mark">
            <img
              src="/assets/images/skb-logo.jpeg"
              alt="SKB Tour and Travels"
              className="admin-brand-logo-img"
            />
          </div>
          {!collapsed && (
            <div className="admin-logo-text">
              <span className="admin-logo-title">SKB TOUR AND TRAVELS</span>
              <span className="admin-logo-sub">PREMIUM ADMIN</span>
            </div>
          )}
        </NavLink>

        {/* Close Button on Mobile Drawer */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="admin-sidebar-close-btn"
          aria-label="Close mobile navigation menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="admin-sidebar-nav">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={idx}
              to={item.to}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={onCloseMobile}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={19} className="nav-icon" />
              {!collapsed && (
                <>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.hasSub && <ChevronRight size={14} style={{ opacity: 0.6 }} />}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Divider above Logout */}
        <div className="admin-sidebar-divider" />

        {/* Logout Button with single consistent color */}
        <button
          type="button"
          onClick={handleLogout}
          className="admin-logout-btn"
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={19} className="nav-icon" />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* Decorative Bottom Artwork matching reference visual */}
        {!collapsed && (
          <div className="admin-sidebar-bottom-artwork">
            <img
              src="/assets/images/sidebar-footer-innova.png"
              alt="SKB Tour and Travels Fleet"
              className="sidebar-bottom-art-img"
            />
          </div>
        )}
      </nav>
    </aside>
  );
}
