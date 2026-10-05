# PocketRoute — Backend API

RESTful API backend for PocketRoute powered by Node.js, Express, and MongoDB Atlas.

## Endpoints
- `POST /api/auth/register` — Create user account
- `POST /api/auth/login` — Sign in user
- `POST /api/auth/verify-otp` — Complete 5-digit OTP verification
- `POST /api/chat` — AI Travel assistant engine
- `GET /api/chat/history` — Session history
- `DELETE /api/chat/:sessionId` — Delete chat conversation
- `GET /api/trips` & `POST /api/trips` — Itinerary management
- `PUT /api/trips/:id/reorder` — Re-order stops
- `GET /api/trips/share/:shareCode` — Public shared trip view
- `GET /api/places` & `POST /api/places` — Community contributed places
- `POST /api/feedback` — User suggestions & reviews

## Getting Started
1. Configure `.env` with your MongoDB connection string and JWT secret:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```
2. Start server:
   ```bash
   npm install
   npm run dev
   ```
Runs on `http://localhost:5000`.
