# ✈️ Fly Nawww — A Full-Stack Flight Reservation Platform

Fly Nawww is an end-to-end flight booking experience built on the MERN stack. Travelers search the catalogue, plan a round trip across two legs, choose their seats on a visual cabin map, pay securely through Stripe, and receive a polished email confirmation — all without leaving the browser. Behind the scenes, an admin surface keeps the entire flight inventory under control, and a token-based auth pipeline keeps every session safe.

## Highlights

- **Secure authentication** — signup and login flows powered by bcrypt password hashing, JWT access tokens, and refresh-token rotation for long-lived sessions.
- **Two-leg booking with a visual seat picker** — depart and return are treated as a single round trip, each with its own interactive cabin map rendered by `react-seat-picker` so passengers can see exactly where they'll be sitting.
- **Stripe checkout** — real card payments via the Stripe API, with on-screen confirmation the moment the charge clears.
- **HTML email confirmations** — every booking and cancellation triggers a designed Nodemailer email so travelers always have a copy of their itinerary.
- **Full admin surface** — administrators get complete CRUD over the flight catalogue: add new routes, edit schedules, retire sold-out flights, and adjust pricing on the fly.
- **Reservation management** — passengers can view, edit, or cancel any booking from their account at any time.

## User Flow

1. **Browse** — open the catalogue and filter by route, date, and price.
2. **Select flights** — pick a departure flight and a return flight to assemble a round trip.
3. **Pick seats** — the seat-picker map renders for each leg; tap to claim a seat, tap again to release it.
4. **Pay** — proceed to Stripe checkout and confirm the card charge.
5. **Email confirmation** — a styled HTML email lands in the inbox with the full itinerary, seat assignments, and reservation reference.

## API

The Express API is grouped into five clean surfaces:

- **Auth** — signup, login, token refresh, and session lifecycle.
- **Flights** — public read endpoints for the catalogue plus admin-only mutation endpoints for full CRUD.
- **Reservations** — create, view, edit, and cancel bookings; tied to the authenticated user.
- **Payment** — Stripe charge creation and confirmation.
- **Mail** — server-rendered HTML email dispatch on booking and cancellation events.

## Tech Stack

| Layer | Stack |
|---|---|
| Frontend | React, `react-seat-picker` |
| Backend | Node.js, Express |
| Database | MongoDB |
| Auth | JWT (access + refresh) · bcrypt |
| Payments | Stripe |
| Email | Nodemailer |

## Project Structure

```
ACL-React-Project/
├── frontend/      # React app — catalogue, booking flow, seat picker, Stripe checkout, account
└── BackEnd/       # Express API — auth, flights, reservations, payment, mail
```

## Getting Started

### Prerequisites

- Node.js 14+
- MongoDB (Atlas or local)
- A Stripe account
- A Gmail account (or any SMTP credentials Nodemailer accepts)

### Backend

```bash
cd BackEnd
npm install
```

Create a `.env` file in `BackEnd/` with:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
MAIL_USER=your-email-address
MAIL_PASS=your-email-password-or-app-password
```

Then start the API:

```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

The React app boots on `http://localhost:3000` and talks to the Express API.

## Course Context

Fly Nawww was built as the capstone for **Advanced Computer Lab (ACL)**, a senior project course in the B.Sc. Computer Science & Engineering program at the **German University in Cairo (GUC)**, January 2022. It earned a top grade as the course's flagship deliverable.

## Authors

- **Anas ElNemr**
- **Ahmed Eltawel**
