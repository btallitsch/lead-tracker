# 🏎️ Lead Tracker

A lightweight car salesman lead tracking app built with React + TypeScript + Vite.

## Features

- **Lead management** — add, edit, delete potential buyers
- **Status tracking** — Hot 🔥 / Warm ⚡ / Cold ❄️ categorization
- **Vehicle preferences** — tag leads by car type (SUV, EV, Truck, Luxury, etc.)
- **Interaction log** — record calls, emails, visits, demo drives with timestamps
- **Follow-up reminders** — set date/time reminders with overdue alerts
- **Search & filter** — find leads by name, status, vehicle type, or sort order
- **Stats dashboard** — live counts of hot/warm/cold leads and overdue follow-ups

## Project Structure

```
src/
├── types/          # TypeScript interfaces & types
├── data/           # Constants and seed data
├── hooks/          # useLeads custom hook
├── utils/          # Date helpers and shared styles
└── components/     # UI components
    ├── StatusBadge.tsx
    ├── ReminderChip.tsx
    ├── Modal.tsx
    ├── StatsBar.tsx
    ├── FilterBar.tsx
    ├── LeadCard.tsx
    ├── LeadForm.tsx
    └── InteractionLog.tsx
```

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build for Production

```bash
npm run build
npm run preview
```

## Notes

- Data is stored **in-memory** (resets on page refresh).  
- To persist data, wire the `useLeads` hook to `localStorage` or a backend API — the hook interface is designed to make this easy.
