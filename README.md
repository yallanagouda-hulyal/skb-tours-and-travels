# SKB Tour and Travels — Premium MERN Travel Booking Platform

> **Brand Identity:** Deep Midnight Navy (`#071426`), Champagne Gold (`#E7B84D`), Pearl White (`#F7F9FC`)  
> **Tagline:** *"Your Journey, Our Priority"*  
> **Owner:** Vicky | **Operational Hub:** Airport Area, Bengaluru (PIN 560300)  
> **Hotlines:** +91 9035897960, +91 7338140524 | **Email:** vickymegha903@gmail.com

---

## 🚗 Project Overview

A production-grade, glassmorphic, multi-page MERN travel booking web application designed and built for **SKB Tour and Travels**. 

Features authentic fleet photographs, verified vehicle capacities, indicative transparent pricing, direct WhatsApp enquiry deep-linking, interactive Google Maps location search, and full MongoDB persistence with dual-flow fallback.

---

## 🌐 Public Routes

| Route | Page | Key Features |
|---|---|---|
| `/` | **Home** | Luxury Hero, Quick Trip Search, 4 Service Cards, Featured Fleet, Popular Packages, Service Commitments, Travel CTA |
| `/fleet` | **Our Fleet** | Innova Crysta, Sedan 4+1, Force Traveller, Tempo Traveller (TT), Urbania, verified capacities, custom fleet WhatsApp enquiry |
| `/packages` | **Packages & Pricing** | Local 4H/40KM (₹1,200), Local 8H/80KM (₹1,900), Outstation (₹13/km), Airport (₹21/km indicative), transparent pricing conditions |
| `/booking` | **Booking Enquiry** | Complete booking form, 10-digit validation, past-date prevention, dual WhatsApp + MongoDB submission with unique reference IDs (`SKB-YYYYMMDD-XXXX`) |
| `/about` | **About SKB** | Brand story, owner Vicky's commitments, zero fake ratings or claims, authentic service pillars |
| `/contact` | **Contact & Location** | Direct hotline cards, interactive Google Maps search for Airport 560300 & terminal presets, contact inquiry form |

---

## 🛠️ Technology Stack

- **Frontend:**
  - React 19 + Vite 8
  - React Router DOM v7
  - Lucide React Icons
  - Pure CSS3 modules & glassmorphic tokens (No heavy UI frameworks)
  - Google Fonts: *Manrope* (Headings) & *DM Sans* (Body)
- **Backend:**
  - Node.js + Express 5
  - MongoDB + Mongoose 9 ODM
  - CORS, Dotenv, REST API endpoints
  - Static client serving with SPA fallback (`{*splat}`)

---

## 🚀 Running the Project

### Prerequisites
- Node.js (v18+)
- MongoDB running locally on `mongodb://127.0.0.1:27017`

### 1. Start the Backend Server
```powershell
cd "c:\Users\YALLANAGOUDA\Downloads\skb travels\server"
npm install
node server.js
```
*Backend runs on:* `http://localhost:5000`  
*Health Check:* `http://localhost:5000/api/health`

### 2. Start the Frontend Client
```powershell
cd "c:\Users\YALLANAGOUDA\Downloads\skb travels\client"
npm install
npm run dev
```
*Frontend runs on:* `http://localhost:5173` (proxies `/api` to port 5000)

### 3. Build for Production
```powershell
cd "c:\Users\YALLANAGOUDA\Downloads\skb travels\client"
npm run build
```
Once built, the Express backend serves `client/dist` directly at `http://localhost:5000` with full SPA client-side routing.

---

## 📱 WhatsApp Integration

- **Primary WhatsApp Number:** `919035897960`
- Forms generate human-readable, URL-encoded messages with:
  - Booking Reference ID
  - Customer name & phone number
  - Trip type & preferred vehicle
  - Pickup location & destination
  - Travel date & time
  - Passenger count, luggage notes & special instructions
  - Request for written fare & availability confirmation

---

## 🔒 Service Principles & Honest Transparency

- **No Fabricated Claims:** Zero fake review counts, star ratings, or imaginary business awards.
- **Fair Pricing Terms:** Tolls & parking are clearly stated as separate actuals. Outstation minimum daily billing (300 km/day) and driver night allowances (₹400) are explicitly explained upfront.
- **Direct Accountability:** Enquiries are handled directly by proprietor Vicky.
