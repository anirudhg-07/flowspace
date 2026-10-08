# Flowspace 🌊

Flowspace is a beautiful, full-stack project and task management system. It features a fully responsive React Web Application, a cross-platform Mobile Application (iOS/Android) built with Expo, and a robust Express.js backend powered by Prisma and PostgreSQL.

## 🚀 Features

- **Cross-Platform Access**: Manage your projects seamlessly from your browser or your phone.
- **Secure Authentication**: Built-in JWT-based authentication system.
- **Dashboard Analytics**: Get an instant overview of your task progress, upcoming deadlines, and project statuses.
- **Project Management**: Create, edit, and organize projects effortlessly.
- **Task Tracking**: Assign priorities, track statuses, and set deadlines for your tasks.
- **Modern UI**: Designed with a sleek, warm aesthetic using ivory, charcoal, and muted sage.

## 🛠 Tech Stack

### Monorepo Structure
- **Frontend (Web)**: React, Vite, Lucide Icons, Axios
- **Mobile**: React Native, Expo, React Navigation
- **Backend**: Node.js, Express, Prisma ORM, Zod Validation, JWT
- **Database**: PostgreSQL (hosted on Neon)
- **Deployment**: Vercel (Web + Serverless API)

## 📁 Repository Structure

```text
flowspace/
├── backend/       # Express.js REST API & Prisma schema
├── web/           # React + Vite web frontend
├── mobile/        # React Native (Expo) mobile application
├── vercel.json    # Vercel deployment configuration
└── DEPLOYMENT.md  # Detailed instructions for deploying to Vercel
```

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- A PostgreSQL Database (e.g., Neon.tech, Supabase, or local)

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `/backend` directory:
```env
DATABASE_URL="your_postgresql_database_url"
JWT_SECRET="your_secure_random_string"
PORT=3000
```
Run database migrations and start the server:
```bash
npx prisma db push
npx prisma generate
npm run dev
```

### 2. Web Frontend Setup
```bash
cd web
npm install
```
Start the Vite development server:
```bash
npm run dev
```

### 3. Mobile App Setup
```bash
cd mobile
npm install
```
Start the Expo bundler:
```bash
npx expo start
```
*Note: Make sure to update `/mobile/src/api/client.ts` to point to your local machine's IP address or backend tunnel when developing locally.*

## ☁️ Deployment

Flowspace is configured to be deployed as a unified project on **Vercel**. 
The `vercel.json` file handles routing, serving the static web app on the main domain, and mapping `/api/*` requests to the serverless Express backend.

For a full step-by-step guide on how to deploy this project, please see the [DEPLOYMENT.md](./DEPLOYMENT.md) guide.

## 📄 License
This project is open-source and available under the MIT License.
