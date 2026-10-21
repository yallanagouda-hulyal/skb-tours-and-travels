import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import ScrollToTop from './components/layout/ScrollToTop';

// Pages
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import Packages from './pages/Packages';
import Booking from './pages/Booking';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import './App.css';

export default function App() {
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
