# GoHighLevel (GHL) Revenue Operations Platform

An enterprise-grade, boutique agency showcase web application engineered to demonstrate advanced GoHighLevel (GHL) Revenue Operations, custom automation workflows, pipeline stage velocity, smart calendar bookings, database reactivation campaigns, and API v2 integration architecture.

---

## Integration Architecture & Status

- **Default Engine**: **DEMO ENGINE ACTIVE** (Runs out-of-the-box with zero credentials required; all interactive visualizers operate with realistic simulated telemetry).
- **Integration Status**: **REAL GHL API READY** (Server-side proxy handlers in `server/index.js` and frontend API client in `src/services/ghlApi.ts` are fully implemented to communicate with official LeadConnector API v2 endpoints).
- **Testing Disclaimer**: No real GHL credentials are included with this repository, and no authenticated GHL account testing has been performed in this environment. All features are categorized as **REAL READY** or **DEMO ONLY**.

---

## Key Features & Interactive Visualizers

1. **Lead Capture & Contact Ingestion Engine**:
   - Form intake simulator creating custom GHL contacts with UTM source attribution (`google_cpc_retargeting`), automatic tag assignments, and lead scoring (`88/100`).
2. **Kinetic Pipeline Stage Velocity Track**:
   - Stage migration deck (*New Lead → Contacted → Booking Requested → Appointment Booked → Closed Won*) displaying real-time deal movement and total pipeline value calculation (`$153,000`).
3. **Workflow Logic Circuit Simulator**:
   - Multi-channel logic map (*Trigger → Wait → SMS → Condition → Booking*) with step-by-step pulse execution and a dark telemetry console (`#1A2B37`) streaming JSON event logs.
4. **Smart Calendar & Instant SMS Preview**:
   - Concierge slot selector with timezone auto-detect (`EST`, `PST`, `GMT`, `AEST`), 2-way calendar sync simulation, and instant mobile SMS confirmation message thread.
5. **14-Day Lead Nurture Scrubber**:
   - Interactive 14-day timeline scrubber demonstrating multi-touchpoint drip sequences (SMS, Email, Voicemail) with dynamic lead score escalation (`35` → `95/100`).
6. **500-Lead Database Reactivation Blast**:
   - Tactical control panel simulating a 500-cold-lead SMS reactivation blast with real-time progress meters and recovered pipeline revenue calculation (`$45,000`).
7. **360° CRM Contact Lifecycle Audit Trail**:
   - Complete 30-day single-source-of-truth customer audit scrubber tracking contact history from initial ad click to `$12.5k` MRR closed-won retainer deal.

---

## Secure Proxy Architecture (`server/index.js`)

To protect GHL Location API Keys, Private Integration Tokens, and Location IDs from client-side exposure, all GHL API v2 communications are routed through a server-side proxy layer.

```text
[ React + TS Frontend ]
       │
       ▼ (HTTP requests to proxy: http://localhost:3002/api/ghl/*)
[ Standalone Server Proxy (server/index.js) ] ── (reads process.env.GHL_API_KEY, GHL_LOCATION_ID)
       │
       ▼ (Server-to-Server HTTPS Requests)
[ Official GoHighLevel API v2 / Webhooks ]
  • POST https://services.leadconnectorhq.com/contacts/
  • PUT  https://services.leadconnectorhq.com/opportunities/{id}
  • GET  https://services.leadconnectorhq.com/calendars/{id}/free-slots
  • POST https://services.leadconnectorhq.com/appointments/
```

---

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite 6, Tailwind CSS, Lucide React
- **Backend Proxy**: Node.js (Standalone Native HTTP API Proxy)
- **API Specification**: LeadConnector API v2 (`Version: 2021-07-28`)
- **Typography**: Manrope, Instrument Serif, Inter, IBM Plex Mono
- **Design Palette**: `#243B4A` (Deep Slate), `#2D4654` (Secondary Slate), `#4E4D5C` (Hairlines), `#805E73` (Action Mauve), `#87BCDE` (Soft Blue Highlight)

---

## Project Structure

```text
ghl-portfolio-showcase/
├── .env.example                # Environment variables template
├── .gitignore                  # Git exclusions (.env, node_modules, dist)
├── GHL_INTEGRATION_GUIDE.md    # GHL API v2 integration setup & specification guide
├── README.md                   # Project documentation
├── index.html                  # HTML entry point with Google Fonts
├── package.json                # Dependencies & build scripts
├── server/
│   └── index.js                # Standalone Node.js Express proxy server for GHL API v2
├── src/
│   ├── App.tsx                 # Main application container
│   ├── components/             # Visualizer components
│   ├── services/
│   │   └── ghlApi.ts            # Client API service & health check handler
│   ├── types/
│   │   └── ghl.ts               # GHL Data Interfaces & Types
│   ├── main.tsx                # Application entry point
│   └── index.css               # Tailwind CSS & grid hairlines
└── vite.config.ts              # Vite build configuration
```

---

## Setup & Running Instructions

### 1. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/ghl-revenue-operations-showcase.git
cd ghl-revenue-operations-showcase
npm install
```

### 2. Environment Configuration (Optional for Real Mode)
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

If you wish to configure real GHL API calls locally, add your credentials to `.env`:

```ini
PORT=3002
GHL_API_KEY=your_location_api_key_or_pit_token_here
GHL_LOCATION_ID=your_location_id_here
GHL_CALENDAR_ID=your_calendar_id_here
GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/your_webhook_hash
```

> **Note**: If `.env` is unconfigured, the application runs in **DEMO ENGINE ACTIVE** mode with simulated telemetry data.

### 3. Launching the Proxy Server & Application

- **Run Server Proxy**:
  ```bash
  node server/index.js
  ```
- **Run Frontend Application**:
  ```bash
  npm run dev
  ```
  Open `http://localhost:3000` in your browser.

- **Build Production Bundle**:
  ```bash
  npm run build
  ```

---

## License

Designed for portfolio demonstration and agency client presentations. All rights reserved.
