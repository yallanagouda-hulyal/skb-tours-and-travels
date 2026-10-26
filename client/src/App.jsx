import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import ScrollToTop from './components/layout/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import Packages from './pages/Packages';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Context & Layout
import { AdminAuthProvider } from './admin/context/AdminAuthContext';
import AdminLayout from './admin/layout/AdminLayout';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import Bookings from './admin/pages/Bookings';
import Enquiries from './admin/pages/Enquiries';
import AdminPackages from './admin/pages/Packages';
import Vehicles from './admin/pages/Vehicles';
import Drivers from './admin/pages/Drivers';
import Customers from './admin/pages/Customers';
import Reviews from './admin/pages/Reviews';
import Reports from './admin/pages/Reports';
import Settings from './admin/pages/Settings';
import Users from './admin/pages/Users';

import './App.css';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // If in /admin, render inside AdminAuthProvider without public chrome
  if (isAdminRoute) {
    return (
      <AdminAuthProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="customers" element={<Customers />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
            {/* Redirect removed routes */}
            <Route path="offers" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="testimonials" element={<Navigate to="/admin/reviews" replace />} />
            <Route path="gallery" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          <Route path="/admin/*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </AdminAuthProvider>
    );
  }

  // Otherwise, render Public Website
  return (
    <div className="app-layout">
      <ScrollToTop />
      {/* 1. Unobtrusive 24/7 Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Premium Frosted Glass Navbar */}
      <Navbar />

      {/* 3. Main Route Views */}
      <main className="main-content" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* 4. Shared Comprehensive Footer */}
      <Footer />

      {/* 5. Floating Quick Action Controls (WhatsApp + Phone) */}
      <FloatingActions />
    </div>
  );
}
