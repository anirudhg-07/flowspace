# Flowspace

Flowspace is a calm, minimal, cross-platform project management system for Web and Android.

## Tech Stack
- **Web**: React (Vite) + TypeScript
- **Mobile**: React Native (Expo) + TypeScript
- **Backend**: Express + Serverless API (Vercel)
- **Database**: PostgreSQL (Neon) + Prisma ORM

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
# Set up .env file with DATABASE_URL
npx prisma migrate dev
npm run dev
```

### 2. Web Setup
```bash
cd web
npm install
npm run dev
```

### 3. Mobile Setup
```bash
cd mobile
npm install
npm run android
# or npm run ios
```
