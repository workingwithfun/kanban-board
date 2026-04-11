# 📊 AI Job Application Tracker

A full-stack job tracker with a Kanban board and AI-powered job description parsing.

---

## 🚀 Features
- Kanban board (Applied, Interview, Offer, Rejected)
- AI job description parsing (company, role, skills)
- Drag & drop status updates
- View & delete applications
- JWT authentication
- Optimistic UI with React Query

---

## 🧱 Tech Stack
- React (Vite), TypeScript, Tailwind
- Node.js, Express.js
- MongoDB, Mongoose
- React Query, Axios
- @hello-pangea/dnd

---

## ⚙️ Setup

### Backend
```bash
cd backend
npm install
npm start

Create .env:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000

Frontend
cd frontend
npm install
npm run dev
