# Fly Nawww — Full-Stack Flight Reservation System with Stripe Checkout

A MERN-stack flight booking web app built as a capstone-style project for the **Advanced Computer Lab (ACL)** course at the **German University in Cairo (GUC)** in January 2022. Users browse round-trip flights, pick cabin classes, choose seats on a visual seat map, pay with a Stripe test-mode card, and receive an emailed confirmation. Admins manage the flight catalogue. The project earned a top grade (0.7 / A+).

This repository is a sanitized mirror of the original group project — the Stripe **secret** key that lived in `BackEnd/src/App.js` was scrubbed from history with `git filter-repo` before publishing.

---

## Features

### User-facing flow
- **Account creation + login** with bcrypt-hashed passwords (`/UserLogin`, `/CreateUserAccount`).
- **Continue as guest** path — browse and search flights without an account, but cannot manage bookings or edit a profile.
- **Round-trip flight search** with filters on origin, destination, date, cabin (Economy / Business / First), seat count, baggage, and price (`/UserSearchFlight`).
- **Flight selection** with separate "depart" and "return" picks; per-cabin pricing and baggage shown.
- **Passenger details** form for the reservation owner plus any number of additional adults / children (`/PassengersDetails`).
- **Visual seat picker** for both depart and return legs, backed by `react-seat-picker`. Seats already taken on a flight come from the `Available_Seats` boolean array on the flight document (`/UserSelectSeat`, `SeatMapComponent.js`).
- **Boarding pass preview** that renders all the reservation details once payment goes through (`/UserBoarding`).
- **Stripe checkout** in **test mode** — the React side uses `react-stripe-checkout` with a publishable test key; the backend handles `POST /payment` to create the customer + charge through the Stripe SDK (`/UserConfirmBooking`, `/UserUpdateBooking`).
- **Booking confirmation email** sent via Nodemailer (Gmail transport) with all flight + seat info itemised in HTML (`POST /sendmailconfirm`).
- **Manage existing bookings** — list, view, edit (change seats / passenger info), or cancel a reservation (`/UserManageBooking`, `/UserUpdateBooking`, `/UserEditFlight`).
- **Cancellation refund email** sent on delete (`POST /sendmail`).
- **Profile editing + password change** with old-password verification (`/UserEditProfile`, `/ChangePassword`).
- **Logout** that revokes the server-side refresh token entry (`DELETE /logout`).

### Admin-facing flow
- **Admin login** at a separate route (`/LoginPage`) backed by an `Admins` collection.
- **Create a flight** with cabin-class seat counts, baggage allowances, prices, terminal, duration, and date (`/CreateFlight`).
- **View all flights** in a table (`/ViewFlights`).
- **Update a flight's** details (`/UpdateFlight`).
- **Search flights** (`/SearchFlight`) — same query interface as the user search but admin-scoped.
- **Delete a flight**.

### Auth + session model
- JWT **access token** (10 min) + **refresh token** (12 h), both set as cookies and ALSO mirrored into `localStorage` by the React side.
- Refresh tokens are persisted server-side in the `RefreshTokens` collection (one row per user) so a logout can hard-revoke the session.
- A custom `authenticateToken` middleware checks the access token, transparently refreshes it from the refresh token if expired, re-issues the access cookie, and only returns 403 if the refresh token is also expired or missing.

---

## Frontend Stack

- **React 17.0.2** (Create React App, `react-scripts` 4.0.3)
- **react-router-dom 5.3** for client-side routing (`BrowserRouter` + `Switch` in `frontend/src/index.js`)
- **Ant Design 4.16** for forms, layout (`Layout` + `Sider` + `Menu`), modals, and message toasts
- **axios 0.24** for HTTP
- **react-stripe-checkout 2.6** for the payment button
- **react-seat-picker / react-seatmap** for the airline seat map
- **react-datepicker / react-hook-form / react-select / react-table / react-tooltip / react-scroll** assorted form + UI primitives
- **sweetalert2** + **react-swal** for confirmation dialogs
- **node-sass / sass** for the per-component SCSS modules under `frontend/src/css/`
- **moment** for date formatting
- **js-cookie / js-cookies / universal-cookie** for cookie reads (yes, three different cookie libraries — historical artefact, not by design)

---

## Backend Stack

- **Node.js** (developed against ~14.x)
- **Express 4** with `cors`, `cookie-parser`, `cookies`, `express.json` + `express.urlencoded` middleware
- **mongoose 6** against a **MongoDB Atlas** cluster
- **bcrypt** for password hashing (10 rounds)
- **jsonwebtoken** for JWT access + refresh tokens
- **stripe** Node SDK in **TEST mode** — handles customer creation + charge in `POST /payment`
- **nodemailer** (Gmail SMTP) for booking confirmation + cancellation emails
- **moment** for the date-range search predicates
- **uuid** for idempotency keys (imported but commented out in the current Stripe handler)
- **dotenv** for env-var loading

---

## API Routes

All routes live in `BackEnd/src/App.js` and `BackEnd/src/Routes/userController.js`. Routes marked `[auth]` go through the `authenticateToken` middleware (cookie-based JWT with auto-refresh).

### Health
| Method | Path | Purpose |
|---|---|---|
| GET | `/home` | Liveness ping ("You have everything installed!") |

### Auth
| Method | Path | Purpose |
|---|---|---|
| POST | `/userlogin` | User sign-in — verifies bcrypt password, issues access + refresh JWTs, persists refresh token to DB |
| POST | `/loginpage` | Admin sign-in — same flow, but against the `Admins` collection |
| POST | `/createuseraccount` | Register new user — bcrypt-hashes password, rejects duplicate username / email |
| DELETE | `/logout` | Revokes the user's refresh token row |

### Profile
| Method | Path | Purpose |
|---|---|---|
| POST | `/GetUserInfo` `[auth]` | Search users by arbitrary field regex |
| POST | `/userinfo` `[auth]` | Fetch a single user by `_id` |
| PUT | `/updateuser` `[auth]` | Update profile fields; cascades to existing reservations if username/email changed |
| PUT | `/updatepassword` `[auth]` | Change password with old-password bcrypt verification |

### Flights (admin)
| Method | Path | Purpose |
|---|---|---|
| POST | `/createflight` `[auth]` | Create a new flight |
| GET | `/viewflights` `[auth]` | List all flights |
| PUT | `/updateflight` `[auth]` | Edit a flight by `_id` |
| DELETE | `/deleteflight` `[auth]` | Delete a flight by `_id` |
| POST | `/searchflight` `[auth]` | Admin flight search (same predicate as user search) |

### Flights (user)
| Method | Path | Purpose |
|---|---|---|
| POST | `/usersearchflight` | Public flight search — origin/dest/date/cabin/price filters with `moment` date-range matching |
| POST | `/searchflightid` `[auth]` | Fetch one flight by `_id` |
| POST | `/flightmap` `[auth]` | Fetch a flight's `Available_Seats` array for the seat picker |
| PUT | `/updateseats` `[auth]` | Set the `Available_Seats` boolean array on a flight after a booking commits |

### Reservations
| Method | Path | Purpose |
|---|---|---|
| POST | `/createnewReservation` `[auth]` | Create a reservation document |
| POST | `/reservationinfo` `[auth]` | List reservations for a username (owner records only) |
| POST | `/reservationinfoforpass` `[auth]` | List reservations for a username scoped to a sibling field (used by the boarding-pass flow) |
| PUT | `/updatereservationseats` `[auth]` | Update seat selection on an existing reservation |
| PUT | `/updateeditflight` `[auth]` | Edit reservation passenger / seat fields |
| DELETE | `/deletereservation` `[auth]` | Cancel a reservation |

### Payments + email
| Method | Path | Purpose |
|---|---|---|
| POST | `/payment` | Stripe TEST checkout — creates a `stripe.customers` record from the token + charges `product.price * 100` USD against it |
| POST | `/sendmail` | Send a cancellation email (HTML body lists flight + reservation details + refund amount) via Gmail SMTP |
| POST | `/sendmailconfirm` | Send a booking confirmation email with seat numbers + total |

---

## Project Structure

```
ACL-React-Project/
├── BackEnd/
│   └── src/
│       ├── App.js                 — Express server, all top-level routes + Stripe + email transport + JWT middleware
│       ├── Models/
│       │   ├── Admins.js          — Mongoose schema: { Username, Password }
│       │   ├── User.js            — { FirstName, LastName, Email, Date_of_Birth, PassPort_No, Username, Password }
│       │   ├── Flights.js         — { Flight_No, From, To, Flight_Date, Terminal, Flight_Duration,
│       │   │                        Economy/Business/First × Seats/Baggage/Price, Available_Seats: [Boolean] }
│       │   ├── Reservation.js     — Round-trip booking: depart leg, return leg, passenger info, seats, total price
│       │   └── RefreshTokens.js   — { UserID (unique), RefreshToken } — server-side refresh-token store
│       ├── Routes/
│       │   └── userController.js  — All non-auth route handlers (CRUD for flights, reservations, users, search)
│       └── config/
│           ├── db.js              — Optional `connectDB()` helper (currently unused — App.js inlines the connection)
│           └── default.json       — Legacy config-loader URI (kept for reference; the live URI is built from env vars)
│
├── frontend/
│   ├── public/                    — CRA static assets (index.html, manifest, favicon)
│   └── src/
│       ├── index.js               — Routing root: BrowserRouter + Switch with 21 routes
│       ├── App.js                 — Largely empty shell (routes are mounted in index.js)
│       ├── index.css
│       │
│       ├── page/                  — Admin pages
│       │   ├── FlightHome.js      — Landing page with Admin / User entry buttons
│       │   ├── HomePage.js        — Admin dashboard
│       │   ├── LoginPage.js       — Admin sign-in
│       │   ├── CreateFlight.js    — Admin: create flight
│       │   ├── ViewFlights.js     — Admin: list flights
│       │   ├── UpdateFlight.js    — Admin: edit flight
│       │   └── SearchFlight.js    — Admin: search flights
│       │
│       ├── UserPages/             — User pages
│       │   ├── UserLogin.js
│       │   ├── CreateUserAccount.js
│       │   ├── UserHomePage.js
│       │   ├── ReservationHomePage.js (~2.2k lines — main reservation hub)
│       │   ├── UserSearchFlight.js
│       │   ├── PassengersDetails.js
│       │   ├── UserSelectSeat.js (~2.4k lines — seat picker)
│       │   ├── SeatMapComponent.js — react-seat-picker wrapper
│       │   ├── UserConfirmBooking.js — Stripe checkout button + final review
│       │   ├── UserBoarding.js   — Boarding-pass preview
│       │   ├── UserManageBooking.js — Existing-bookings list + actions
│       │   ├── UserUpdateBooking.js — Edit / re-pay an existing booking
│       │   ├── UserEditFlight.js
│       │   ├── UserEditProfile.js
│       │   ├── ChangePassword.js
│       │   └── PopUp.js          — Reusable modal helper
│       │
│       ├── css/                   — Per-page SCSS modules (App.css, BoardingPass.scss, EditUser.css, etc.)
│       └── colorlib-search-11/    — Vendored "Colorlib Search 11" HTML/CSS template (forms-only assets)
│
├── package.json                   — Root convenience package
├── README.md                      — (this file)
└── target/npmlist.json            — Snapshot of installed packages (artefact, can be ignored)
```

---

## How to Build & Run

### Prerequisites
- Node.js 14+ and npm
- A MongoDB Atlas cluster (or local `mongod`) — the schema is created lazily on first write
- A Stripe **test-mode** account for the API keys

### 1. Clone
```bash
git clone https://github.com/anaselnemr/ACL-React-Project.git
cd ACL-React-Project
```

### 2. Backend
```bash
cd BackEnd/src
npm install   # picks up express, mongoose, stripe, bcrypt, jsonwebtoken, nodemailer, cors, cookie-parser, dotenv, etc.
```

Create `BackEnd/src/.env`:
```env
DB_USERNAME=your_atlas_user
DB_PASSWORD=your_atlas_password
ACCESS_TOKEN_SECRET=any-long-random-string
REFRESH_TOKEN_SECRET=another-long-random-string
PORT=8000
```

You **also need to set the Stripe secret key** because it was scrubbed from `BackEnd/src/App.js` (look for `sk_test_REDACTED_BY_GITHUB_PUSH_PROTECTION` on or near line 19). Two options:

- **Quick fix:** replace the literal placeholder with your own `sk_test_...` key.
- **Cleaner fix:** load it from env — change the line to `const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);` and add `STRIPE_SECRET_KEY=sk_test_...` to your `.env`.

The Nodemailer transport in `App.js` is hard-coded to a Gmail account. If you want emails to actually send, swap the `auth.user` / `auth.pass` (or, again, lift them into `.env`).

Run it:
```bash
node App.js
# Listening to requests on http://localhost:8000
```

### 3. Frontend
```bash
cd ../../frontend
npm install
npm start
# Opens http://localhost:3000
```

The React app calls the backend at the absolute URL `http://localhost:8000/...` (see `axios.post('http://localhost:8000/userlogin', ...)` etc.), so no CRA proxy is configured — but CORS is whitelisted server-side for `http://localhost:3000` with `credentials: true`.

The frontend ships a Stripe **publishable** test key inline in `UserConfirmBooking.js` and `UserUpdateBooking.js`. Publishable keys are safe to commit, but you can swap it for your own if you want charges to land in your dashboard instead.

### 4. Try it
- Visit `http://localhost:3000` → choose **User** or **Admin**.
- Admin must already exist in the `Admins` collection (seed one manually with a bcrypt-hashed password).
- Users can self-register from the User Login page.
- Use a Stripe test card such as `4242 4242 4242 4242`, any future expiry, any CVC, any postal code.

---

## Coursework Context

This was the term project for **CSEN 704 — Advanced Computer Lab (ACL)**, a project-based capstone-style course at the **German University in Cairo (GUC)** in winter semester 2021/2022. ACL teaches the full MERN stack (MongoDB, Express, React, Node.js) end-to-end and is graded on a single multi-week deliverable. The brief was to build a complete flight reservation system with admin tooling, payment, and email notifications — and the submission earned the top grade (0.7 / A+).

---

## Authors

Built jointly by:
- **Anas ElNemr** — [@anaselnemr](https://github.com/anaselnemr)
- **Ahmed Eltawel** — [@ahmedeltawel](https://github.com/ahmedeltawel)

The original group submission also credits Donia, Ahmed Farouk, and Ibrahim El Galfy for early collaboration; the codebase as it stands here was driven by Anas + Ahmed.

---

## Acknowledgements

This repository is a friendly mirror of the original at [github.com/ahmedeltawel/ACL-React-Project-](https://github.com/ahmedeltawel/ACL-React-Project-) (note the trailing dash). The Stripe **test secret key** was removed from `BackEnd/src/App.js` and from the repository's git history with `git filter-repo` before publishing — set your own key as described in the Build & Run section above.

Special thanks to TA **Ahmad Alaa** for support throughout the course, and to the [LogRocket MERN tutorial](https://blog.logrocket.com/mern-stack-tutorial/) which was a useful reference while we were learning the stack.
