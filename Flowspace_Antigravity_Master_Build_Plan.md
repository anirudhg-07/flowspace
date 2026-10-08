# Flowspace --- Antigravity Master Build Plan

## 0. What We Are Building

Build a complete **Project Management System for Web + Android** called
**Flowspace**.

This is a full-stack assessment project. The application must allow
authenticated users to manage projects and tasks, view dashboard
statistics, search/filter their work, and use the **same account, same
backend, and same database** from both the web application and Android
application.

### Core product idea

Flowspace should feel like a **calm, minimal personal/work command
center**.

It should NOT look like:

-   A generic admin dashboard
-   A typical SaaS template
-   An "AI-generated" dashboard
-   A colorful productivity app
-   An AI chatbot product

There should be **no unnecessary AI feature or AI branding**.

The differentiation should come from:

1.  Calm, premium UI
2.  Strong typography and spacing
3.  Excellent interaction design
4.  Clean engineering architecture
5.  Strong security
6.  Seamless Web ↔ Android synchronization

------------------------------------------------------------------------

# 1. IMPORTANT DESIGN DIRECTION

## Theme: Calm Minimal

The entire application must follow a **calm, minimal,
editorial/productivity aesthetic**.

### Absolutely NO BLUE

Do not use blue as:

-   Primary color
-   Accent color
-   Main buttons
-   Links
-   Charts
-   Gradients
-   Background accents

Avoid the typical blue SaaS look completely.

### Recommended visual palette

Use a restrained palette around:

``` text
Warm Ivory / Off-white
Soft Beige
Warm Gray
Charcoal
Muted Sage Green
Olive
Very Soft Terracotta
Warm Amber for warnings
```

Suggested conceptual palette:

``` text
Background:       #F7F5EF
Surface:          #FCFBF7
Primary text:     #20231F
Secondary text:   #777A72
Border:           #E7E3D8
Primary accent:   #526A4D
Accent light:     #E4EADF
Success:          #5D8061
Warning:          #C28A43
Danger:           #B86A62
```

These are references, not rigid requirements. Keep the overall visual
feeling muted and natural.

### Color rule

Use color sparingly.

The interface should still look good if the saturation is reduced.

------------------------------------------------------------------------

# 2. VISUAL LANGUAGE

The UI should feel:

-   Calm
-   Minimal
-   Premium
-   Mature
-   Focused
-   Spacious
-   Natural
-   Professional
-   Human-designed

Avoid:

-   Neon colors
-   Excessive gradients
-   Glassmorphism everywhere
-   Huge rounded blobs
-   Excessive shadows
-   Excessive icons
-   Floating AI buttons
-   "Magic" labels
-   AI sparkle icons
-   Generic dashboard gradients
-   Overloaded cards

------------------------------------------------------------------------

# 3. TYPOGRAPHY

Use a clean modern sans-serif.

Recommended:

``` text
Inter
Manrope
DM Sans
```

Use:

-   Large but restrained page headings
-   Medium-weight section headings
-   Normal body text
-   Small uppercase metadata where useful
-   Strong visual hierarchy

Do not make everything bold.

Example:

``` text
Projects

Manage your work without the noise.
```

instead of:

``` text
🚀 PROJECT MANAGEMENT SUPER DASHBOARD
```

------------------------------------------------------------------------

# 4. WEB UI CONCEPT

## Desktop layout

Use a calm fixed/sidebar navigation structure.

``` text
┌───────────────────────────────────────────────────────────────┐
│ FLOWSPACE                                      Search   User  │
├───────────────┬───────────────────────────────────────────────┤
│               │                                               │
│  ◌ Flowspace  │  Good morning, Alex                          │
│               │  Here's what needs your attention.            │
│  Overview     │                                               │
│  Projects     │  12 Projects   38 Tasks   19 Done   14 Open │
│  Tasks        │                                               │
│               │  ┌─────────────────┐ ┌─────────────────────┐ │
│  Settings     │  │ Project Progress│ │ Upcoming Tasks      │ │
│               │  │                 │ │                     │ │
│               │  │      50%        │ │ Design login        │ │
│               │  │    progress     │ │ Fix navigation      │ │
│               │  │                 │ │ Database schema     │ │
│               │  └─────────────────┘ └─────────────────────┘ │
│               │                                               │
│               │  Recent Projects                              │
│               │  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│               │  │ Project 1│ │ Project 2│ │ Project 3│     │
│               │  └──────────┘ └──────────┘ └──────────┘     │
└───────────────┴───────────────────────────────────────────────┘
```

Keep the sidebar visually quiet.

------------------------------------------------------------------------

# 5. WEB SCREENS

## 5.1 Login

Must contain:

-   Email
-   Password
-   Show/hide password
-   Login button
-   Validation
-   Loading state
-   Error message
-   Link to registration

Visual direction:

``` text
                    Flowspace

             Welcome back

        Continue managing your work.

        Email
        ┌────────────────────────────┐
        │                            │
        └────────────────────────────┘

        Password
        ┌────────────────────────────┐
        │                       ◉    │
        └────────────────────────────┘

        ┌────────────────────────────┐
        │          Sign in            │
        └────────────────────────────┘

             Don't have an account?
                    Sign up
```

Use muted sage as the primary action color.

------------------------------------------------------------------------

# 6. WEB DASHBOARD

The dashboard must display:

-   Total Projects
-   Total Tasks
-   Completed Tasks
-   Pending Tasks
-   Projects In Progress

These are mandatory assessment requirements.

Do not simply create five colorful cards.

Instead use a calm metric row:

``` text
12
Total Projects

38
Total Tasks

19
Completed

14
Pending

8
In Progress
```

Then:

### Project Progress

Use a simple progress ring or horizontal progress indicator.

### Upcoming Tasks

Show tasks with:

-   Task name
-   Project
-   Priority
-   Due date
-   Status

### Recent Projects

Show project cards with:

-   Project name
-   Description
-   Status
-   Progress
-   Task count
-   Date range

------------------------------------------------------------------------

# 7. PROJECTS PAGE

The Projects page must support:

-   Create project
-   View project
-   Edit project
-   Delete project
-   Search projects by name
-   Filter projects by status

Use a clean list/grid hybrid.

Example:

``` text
Projects                              + New Project

Search projects...                   All  In Progress  Completed

---------------------------------------------------------------

Mobile App
Cross-platform task management
████████████████░░░░ 70%

12 tasks       Dec 30, 2026
In Progress
```

Project status values:

``` text
NOT_STARTED
IN_PROGRESS
COMPLETED
```

------------------------------------------------------------------------

# 8. PROJECT DETAILS

Project fields:

-   Project Name
-   Description
-   Status
-   Start Date
-   End Date
-   Created Date

The project detail page should have:

``` text
← Projects

Mobile App                              In Progress

Cross-platform task management

████████████████░░░░ 70%

Dec 01, 2026 → Dec 30, 2026

TASKS

Search tasks...        Status      Priority       + Add Task

☐ Design login screen            High        In Progress
☑ Create dashboard               High        Completed
☐ Implement authentication      Medium      Pending
☐ Add offline support             Low        Pending
```

------------------------------------------------------------------------

# 9. TASK UI

Task fields:

-   Task Name
-   Description
-   Priority
-   Status
-   Due Date
-   Created Date

Priority:

``` text
LOW
MEDIUM
HIGH
```

Status:

``` text
PENDING
IN_PROGRESS
COMPLETED
```

Task creation should use a clean drawer/modal on desktop.

On mobile, use a full-screen form.

------------------------------------------------------------------------

# 10. SEARCH AND FILTERING

## Projects

Required:

``` text
Search by project name
Filter by status
```

## Tasks

Required:

``` text
Search by task name
Filter by status
Filter by priority
```

Use debounced search where appropriate.

Keep filters visually simple.

Do not create a huge filter panel.

------------------------------------------------------------------------

# 11. MOBILE UI

The mobile application must be Android-compatible.

Use React Native + Expo.

The mobile UI should NOT be a squeezed version of the desktop website.

It should be designed specifically for touch.

## Bottom navigation

``` text
┌─────────────────────────────┐
│                             │
│         Screen content      │
│                             │
│                             │
├─────────────────────────────┤
│ Home  Projects  Tasks  Me   │
└─────────────────────────────┘
```

Use muted sage/charcoal rather than blue.

------------------------------------------------------------------------

# 12. MOBILE SCREENS

Build:

1.  Splash
2.  Login
3.  Register
4.  Dashboard
5.  Projects
6.  Project Details
7.  Tasks
8.  Add Task
9.  Edit Task
10. Profile/Settings

------------------------------------------------------------------------

# 13. MOBILE DASHBOARD

Show:

``` text
Good morning, Alex

12 Projects
38 Tasks
19 Completed
14 Pending

Project Progress

Mobile App
████████████░░░ 70%

Upcoming Tasks

Design login screen
Fix navigation
Database schema
```

Keep the screen uncluttered.

------------------------------------------------------------------------

# 14. MOBILE PROJECT DETAILS

The mobile project page should show:

``` text
← Mobile App

In Progress

Cross-platform task management

████████████░░ 70%

Tasks     Overview

☐ Design login screen
  HIGH · Dec 20

☑ Create dashboard
  HIGH · Dec 17

☐ Authentication
  MEDIUM · Dec 18

       + Add Task
```

------------------------------------------------------------------------

# 15. MOBILE ADD TASK

Full-screen form:

``` text
← Add Task

Task name
[                         ]

Description
[                         ]
[                         ]

Priority

Low      Medium      High

Status

Pending  In Progress  Completed

Due date

[ 20 Dec 2026 ]

[       Create Task       ]
```

Use touch-friendly controls.

------------------------------------------------------------------------

# 16. MOBILE AUTHENTICATION SECURITY

The mobile token must be stored using:

``` text
expo-secure-store
```

Do NOT use plain AsyncStorage/local storage for authentication tokens.

Flow:

``` text
Login
 ↓
Receive token
 ↓
SecureStore
 ↓
Authenticated API requests
 ↓
Token expires
 ↓
Clear token
 ↓
Return to Login
 ↓
"Your session has expired. Please log in again."
```

------------------------------------------------------------------------

# 17. MOBILE NETWORK HANDLING

If there is no network:

``` text
You're offline

Check your internet connection
and try again.

[ Retry ]
```

Do not allow:

-   Blank screen
-   Crash
-   Infinite loading
-   Unhandled error

Use NetInfo to detect network status.

------------------------------------------------------------------------

# 18. SERVERLESS ARCHITECTURE

The application must use a serverless backend.

``` text
                   ┌───────────────────┐
                   │    React Web      │
                   │      Vercel       │
                   └─────────┬─────────┘
                             │
                             │ HTTPS
                             ▼
                   ┌───────────────────┐
                   │ Express REST API  │
                   │ Vercel Functions  │
                   └─────────┬─────────┘
                             │
                             │ Prisma
                             ▼
                   ┌───────────────────┐
                   │ PostgreSQL        │
                   │ Neon Cloud        │
                   └─────────▲─────────┘
                             │
                             │ HTTPS
                   ┌─────────┴─────────┐
                   │ React Native      │
                   │ Android / Expo    │
                   └───────────────────┘
```

### Critical architecture rule

There is:

``` text
ONE backend
ONE PostgreSQL database
TWO clients
```

Do not create a separate backend for mobile.

The assessment explicitly requires the web and mobile applications to
use the same backend and database.

------------------------------------------------------------------------

# 19. DATABASE

Use:

``` text
PostgreSQL
```

Hosted on:

``` text
Neon Cloud
```

The database is persistent cloud infrastructure.

It is NOT stored in:

-   React
-   React Native
-   Vercel filesystem
-   GitHub
-   The user's computer

------------------------------------------------------------------------

# 20. DATABASE SCHEMA

## Users

``` text
users
---------------------
id              UUID PK
full_name       VARCHAR
email           VARCHAR UNIQUE
password_hash   VARCHAR
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

## Projects

``` text
projects
---------------------
id              UUID PK
user_id         UUID FK
name            VARCHAR
description     TEXT
status          ENUM
start_date      DATE
end_date        DATE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

## Tasks

``` text
tasks
---------------------
id              UUID PK
project_id      UUID FK
user_id         UUID FK
name            VARCHAR
description     TEXT
priority        ENUM
status          ENUM
due_date        DATE
created_at      TIMESTAMP
updated_at      TIMESTAMP
```

## Refresh Tokens

Recommended:

``` text
refresh_tokens
---------------------
id              UUID PK
user_id         UUID FK
token_hash      VARCHAR
expires_at      TIMESTAMP
revoked_at      TIMESTAMP
created_at      TIMESTAMP
```

------------------------------------------------------------------------

# 21. API REQUIREMENTS

The following endpoints are mandatory.

## Authentication

``` http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

## Projects

``` http
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

## Tasks

``` http
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

## Dashboard

``` http
GET /api/dashboard
```

Both web and mobile must use these same APIs.

------------------------------------------------------------------------

# 22. API SEARCH/FILTERS

Projects:

``` http
GET /api/projects?search=mobile
GET /api/projects?status=IN_PROGRESS
```

Tasks:

``` http
GET /api/tasks?search=login
GET /api/tasks?status=PENDING
GET /api/tasks?priority=HIGH
GET /api/tasks?projectId=123
```

Combined:

``` http
GET /api/tasks?status=IN_PROGRESS&priority=HIGH
```

------------------------------------------------------------------------

# 23. API RESPONSE FORMAT

Success:

``` json
{
  "success": true,
  "data": {}
}
```

Error:

``` json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid task status"
  }
}
```

Use appropriate HTTP status codes.

------------------------------------------------------------------------

# 24. SECURITY REQUIREMENTS

## Passwords

Use bcrypt.

Never store:

``` text
password = "..."
```

Store:

``` text
password_hash = bcrypt(...)
```

## Authentication

Use JWT.

## Authorization

Every project/task operation must verify ownership.

Example:

``` text
authenticatedUser.id
        ↓
project.userId
        ↓
must match
```

A user must never be able to access another user's data.

## Validation

Validate on the backend:

-   Required fields
-   Email format
-   Password
-   Empty strings
-   Dates
-   Enum values
-   Query parameters

## API Security

Implement:

-   JWT middleware
-   Helmet
-   CORS
-   Rate limiting
-   Centralized error handling
-   Logging
-   No sensitive information in responses

## Database Security

Use Prisma ORM / parameterized database operations.

Do not concatenate raw user input into SQL.

------------------------------------------------------------------------

# 25. RECOMMENDED PROJECT STRUCTURE

``` text
flowspace/
│
├── backend/
│   ├── api/
│   │   └── index.ts
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   └── dashboard/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   ├── tests/
│   ├── .env.example
│   ├── vercel.json
│   └── package.json
│
├── web/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   └── App.tsx
│   └── package.json
│
├── mobile/
│   ├── app/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   └── storage/
│   ├── app.json
│   └── package.json
│
├── docs/
│   ├── API.md
│   ├── ERD.md
│   ├── ARCHITECTURE.md
│   ├── SECURITY.md
│   └── DEPLOYMENT.md
│
└── README.md
```

------------------------------------------------------------------------

# 26. PHASE-BY-PHASE IMPLEMENTATION PLAN

The implementation must happen in this order.

Do NOT ask Antigravity to build the entire project in one giant
generation.

Build and test each phase before moving to the next.

------------------------------------------------------------------------

# PHASE 0 --- Product Foundation & Design System

## Objective

Establish the visual identity and project architecture before building
features.

## Build

Create:

-   Global typography
-   Color tokens
-   Spacing system
-   Border radius
-   Shadows
-   Buttons
-   Inputs
-   Selects
-   Badges
-   Cards
-   Modals
-   Drawers
-   Toasts
-   Skeleton loaders
-   Empty states
-   Error states

## Important

The UI must follow:

``` text
CALM
MINIMAL
WARM
NATURAL
PREMIUM
```

No blue.

No AI visual language.

No unnecessary gradients.

No excessive animations.

## Acceptance criteria

-   Design system works on desktop and mobile.
-   Components are reusable.
-   Colors are centralized in theme tokens.
-   No hardcoded random colors across components.

------------------------------------------------------------------------

# PHASE 1 --- Repository & Environment Setup

## Objective

Create the complete project structure.

## Build

``` text
backend
web
mobile
docs
```

Configure:

-   Git
-   GitHub
-   TypeScript
-   Environment files
-   `.gitignore`
-   README base

Create:

``` text
.env.example
```

Do not put real secrets into GitHub.

## Acceptance criteria

All three applications start independently.

------------------------------------------------------------------------

# PHASE 2 --- PostgreSQL + Prisma

## Objective

Create the persistent data layer.

## Build

1.  Create Neon PostgreSQL database.
2.  Configure `DATABASE_URL`.
3.  Install Prisma.
4.  Create schema.
5.  Create migrations.
6.  Create seed data.

Models:

``` text
User
Project
Task
RefreshToken
```

Relationships:

``` text
User 1:N Project
Project 1:N Task
User 1:N Task
User 1:N RefreshToken
```

## Acceptance criteria

-   Migration succeeds.
-   Database can be connected.
-   User/project/task relationships work.
-   Email is unique.
-   Foreign keys work.
-   Seed data can be inserted.

------------------------------------------------------------------------

# PHASE 3 --- Express Serverless Backend

## Objective

Create the REST API foundation and deploy it serverlessly.

## Build

-   Express
-   TypeScript
-   Serverless entry point
-   CORS
-   Helmet
-   Logging
-   Error middleware
-   Validation middleware
-   Rate limiting
-   Health route

Create:

``` http
GET /api/health
```

## Acceptance criteria

Production endpoint returns:

``` json
{
  "status": "ok"
}
```

The backend must be publicly reachable so both web and mobile can use
it.

------------------------------------------------------------------------

# PHASE 4 --- Authentication & Authorization

## Objective

Build secure authentication before protected business APIs.

## Build

### Register

``` http
POST /api/auth/register
```

### Login

``` http
POST /api/auth/login
```

### Logout

``` http
POST /api/auth/logout
```

### Current user

``` http
GET /api/auth/me
```

Implement:

-   bcrypt
-   JWT
-   Refresh tokens
-   Authentication middleware
-   Rate limiting
-   Input validation
-   Safe responses

## Acceptance criteria

Test:

``` text
Register → Login → /me → Logout
```

After logout, protected routes must reject the session.

------------------------------------------------------------------------

# PHASE 5 --- Project Backend

## Objective

Implement complete project management.

## Build

``` http
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

Add:

-   Search
-   Status filter
-   Validation
-   Ownership checks
-   Date validation

## Critical test

User A cannot access User B's project.

------------------------------------------------------------------------

# PHASE 6 --- Task Backend

## Objective

Implement task management.

## Build

``` http
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

Add:

-   Search
-   Status filter
-   Priority filter
-   Project filter
-   Complete task
-   Ownership checks
-   Project ownership validation

## Critical logic

When creating a task:

``` text
Authenticated user
       ↓
Project ID
       ↓
Check project belongs to user
       ↓
Create task
```

Never trust a client-supplied project ID.

------------------------------------------------------------------------

# PHASE 7 --- Dashboard Backend

## Objective

Create the dashboard statistics API.

``` http
GET /api/dashboard
```

Return:

``` text
Total Projects
Total Tasks
Completed Tasks
Pending Tasks
Projects In Progress
```

All statistics must be scoped to the authenticated user.

------------------------------------------------------------------------

# PHASE 8 --- Web Authentication

## Objective

Connect React authentication to the real backend.

Build:

-   Login page
-   Register page
-   Form validation
-   Loading states
-   API errors
-   Protected routes
-   Logout
-   Session restoration
-   Expired-token handling

## UI rule

Keep authentication pages extremely minimal.

Use warm off-white backgrounds and muted sage primary actions.

------------------------------------------------------------------------

# PHASE 9 --- Web Dashboard

## Objective

Build the main Flowspace experience.

Build:

-   Sidebar
-   Header
-   Metric row
-   Project progress
-   Upcoming tasks
-   Recent projects
-   User menu
-   Loading skeleton
-   Empty state
-   Error state

The dashboard must consume:

``` http
GET /api/dashboard
```

and real project/task data.

Do not hardcode dashboard numbers.

------------------------------------------------------------------------

# PHASE 10 --- Web Projects

## Objective

Implement project management visually.

Build:

-   Projects page
-   Search
-   Status filter
-   Project cards/list
-   Create project
-   Edit project
-   Delete confirmation
-   Project details
-   Progress calculation

Every action must call the backend.

No fake local-only project data.

------------------------------------------------------------------------

# PHASE 11 --- Web Tasks

## Objective

Implement complete task management.

Build:

-   Task list
-   Search
-   Status filter
-   Priority filter
-   Create task
-   Edit task
-   Delete task
-   Mark completed
-   Due date
-   Loading states
-   Empty states

Use reusable task components.

------------------------------------------------------------------------

# PHASE 12 --- Mobile Foundation

## Objective

Create the Android application.

Use:

``` text
React Native + Expo + TypeScript
```

Build:

-   Navigation
-   API client
-   Theme
-   Reusable components
-   Loading states
-   Error states
-   Secure storage layer
-   Network detection

------------------------------------------------------------------------

# PHASE 13 --- Mobile Authentication

## Objective

Connect Android authentication to the same backend.

Build:

-   Register
-   Login
-   Logout
-   Session restoration
-   Secure token storage
-   Expired token handling

Use:

``` text
expo-secure-store
```

Do not use plain AsyncStorage for authentication tokens.

------------------------------------------------------------------------

# PHASE 14 --- Mobile Dashboard + Projects

## Objective

Build the core mobile experience.

Build:

-   Dashboard
-   Projects
-   Project details
-   Tasks under projects
-   Bottom navigation
-   Pull-to-refresh
-   Loading states
-   Empty states
-   Offline state

The app must call the same deployed API as the web application.

------------------------------------------------------------------------

# PHASE 15 --- Mobile Tasks

## Objective

Complete all required task functionality on Android.

Build:

-   Create task
-   Edit task
-   Delete task
-   Mark completed
-   Change status
-   Change priority
-   Search
-   Filter by status
-   Filter by priority
-   Pull-to-refresh

------------------------------------------------------------------------

# PHASE 16 --- Cross-Platform Synchronization

## Objective

Prove that web and mobile share the same backend/database.

## Test A

``` text
Web
 ↓
Create task
 ↓
PostgreSQL
 ↓
Mobile
 ↓
Pull to refresh
 ↓
Task appears
```

## Test B

``` text
Mobile
 ↓
Complete task
 ↓
PostgreSQL
 ↓
Web
 ↓
Refresh
 ↓
Task shows Completed
```

This must work without a separate mobile backend.

------------------------------------------------------------------------

# PHASE 17 --- Security Hardening

## Objective

Perform a dedicated security pass.

Check:

-   bcrypt
-   JWT
-   Refresh token handling
-   Token expiration
-   Logout/revocation
-   Authorization
-   User ownership
-   Validation
-   Helmet
-   CORS
-   Rate limiting
-   Error handling
-   Sensitive response filtering
-   Prisma database access
-   Environment variables

Test unauthorized access deliberately.

------------------------------------------------------------------------

# PHASE 18 --- Testing

## Objective

Prove the system works beyond the happy path.

### Authentication

-   Register
-   Duplicate email
-   Invalid email
-   Invalid password
-   Wrong login
-   Expired token
-   Logout

### Projects

-   Create
-   Read
-   Update
-   Delete
-   Search
-   Filter
-   Unauthorized access

### Tasks

-   Create
-   Read
-   Update
-   Delete
-   Complete
-   Search
-   Filter
-   Unauthorized access

### Mobile

-   No network
-   Token expiration
-   Pull-to-refresh
-   API error
-   Login/logout

------------------------------------------------------------------------

# PHASE 19 --- UI Polish

## Objective

Make the project look intentionally designed.

Add:

-   Subtle hover states
-   Smooth transitions
-   Skeleton loading
-   Toast feedback
-   Confirmation dialogs
-   Responsive layout
-   Keyboard accessibility
-   Focus states
-   Touch-friendly controls
-   Clean empty states
-   Clean error states

## Important

Do not add visual effects just for the sake of effects.

Every animation should communicate:

``` text
Feedback
Transition
Hierarchy
State
```

------------------------------------------------------------------------

# PHASE 20 --- Deployment

## Backend

Deploy Express serverless API.

``` text
Vercel
```

Environment:

``` env
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
CORS_ORIGIN=
NODE_ENV=production
```

## Database

Deploy PostgreSQL:

``` text
Neon
```

Run:

``` bash
npx prisma migrate deploy
```

## Web

Deploy React:

``` text
Vercel
```

Environment:

``` env
VITE_API_URL=https://your-api-domain.com
```

## Mobile

Build Android:

``` bash
eas build -p android
```

Configure the deployed backend URL.

------------------------------------------------------------------------

# 27. Documentation

Create:

``` text
docs/API.md
docs/ERD.md
docs/ARCHITECTURE.md
docs/SECURITY.md
docs/DEPLOYMENT.md
```

README must contain:

-   Project overview
-   Features
-   Tech stack
-   Architecture
-   Database schema
-   ER diagram
-   Environment variables
-   Backend setup
-   Web setup
-   Mobile setup
-   Database setup
-   API documentation
-   Deployment
-   Testing
-   Security
-   Screenshots
-   Demo video
-   Design decisions

The assessment requires the project to be easy for another developer to
run.

------------------------------------------------------------------------

# 28. API Documentation Format

For every API endpoint document:

``` text
Method
URL
Authentication
Description
Request body
Query parameters
Success response
Error response
Example
```

Example:

``` md
## Create Task

POST /api/tasks

Authentication:
Bearer JWT

Request:

{
  "projectId": "uuid",
  "name": "Fix navigation",
  "description": "Fix mobile navigation",
  "priority": "HIGH",
  "status": "PENDING",
  "dueDate": "2026-10-20"
}

Response:

201 Created
```

------------------------------------------------------------------------

# 29. ER DIAGRAM

Include:

``` text
USER
 │
 ├──────────────< PROJECT
 │                    │
 │                    └──────────────< TASK
 │
 └──────────────< REFRESH_TOKEN
```

Document:

-   Primary keys
-   Foreign keys
-   Relationships
-   Unique constraints
-   Enums

------------------------------------------------------------------------

# 30. ENVIRONMENT VARIABLES

## Backend

``` env
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
ACCESS_TOKEN_EXPIRES_IN=
REFRESH_TOKEN_EXPIRES_IN=
CORS_ORIGIN=
NODE_ENV=
```

## Web

``` env
VITE_API_URL=
```

## Mobile

Use the deployed API URL.

Never commit actual credentials.

------------------------------------------------------------------------

# 31. REQUIREMENT COVERAGE

  Assessment Requirement      Implementation
  --------------------------- ------------------------------
  User Registration           Web + Android
  User Login                  Web + Android
  User Logout                 Web + Android
  Unique Email                PostgreSQL unique constraint
  Password Hashing            bcrypt
  Persistent Authentication   JWT + refresh token
  Create Project              Web
  View Project                Web
  Edit Project                Web
  Delete Project              Web
  View Own Projects           Authorized API
  Create Task                 Web + Android
  Edit Task                   Web + Android
  Delete Task                 Web + Android
  Mark Completed              Web + Android
  View Project Tasks          Web + Android
  Dashboard                   Web + Android
  Search Projects             Web
  Search Tasks                Web + Android
  Filter Project Status       Web
  Filter Task Status          Web + Android
  Filter Task Priority        Web + Android
  Shared Backend              Serverless Express API
  Shared Database             Neon PostgreSQL
  Android                     React Native Expo
  Pull-to-Refresh             React Native
  Secure Token Storage        Expo SecureStore
  Expired Login               Token handling + redirect
  No Network                  NetInfo + error UI
  Responsive Web              React
  Component Structure         Reusable components
  Form Validation             Zod + React Hook Form
  Loading Indicators          Skeleton/loading states
  Error Handling              Client + backend
  REST API                    Express
  Middleware                  Auth/validation/security
  Logging                     Pino/Morgan
  CORS                        Express CORS
  Relational DB               PostgreSQL
  Foreign Keys                Prisma/PostgreSQL
  Normalization               Relational schema
  SQL Injection Protection    Prisma
  Rate Limiting               express-rate-limit
  API Documentation           docs/API.md
  Database Setup              Prisma migrations
  ER Diagram                  docs/ERD.md
  Deployment URL              README
  Android APK                 Expo/EAS
  5-minute Recording          Demo recording

------------------------------------------------------------------------

# 32. BONUS FEATURES

Only build these after all mandatory requirements are complete.

Recommended order:

1.  Pagination
2.  Sorting
3.  Refresh token rotation
4.  Unit tests
5.  Integration tests
6.  Audit logs
7.  CI/CD
8.  Docker
9.  Push notifications
10. Offline viewing
11. Shared validation schemas

Do not sacrifice mandatory functionality for bonus features.

------------------------------------------------------------------------

# 33. 5-MINUTE DEMO

The final video should prove the important requirements.

## 0:00--0:30

Open web.

``` text
Login
↓
Dashboard
```

Show the calm minimal UI.

## 0:30--1:15

Create project:

``` text
Website Redesign
Status: In Progress
```

Show project details.

## 1:15--2:00

Create task:

``` text
Fix responsive navigation
Priority: High
Status: In Progress
```

## 2:00--2:30

Use:

``` text
Search
Status filter
Priority filter
```

## 2:30--3:15

Open Android.

Login using the same account.

Show the same task.

## 3:15--4:00

On Android:

``` text
Mark task Completed
Pull to refresh
```

Return to web.

Refresh.

Show the updated task/dashboard.

## 4:00--4:30

Show:

-   Form validation
-   Logout
-   Protected route
-   Network error handling
-   Secure token storage implementation

## 4:30--5:00

Show architecture:

``` text
React Web
     ↓
Express Serverless API
     ↓
Prisma
     ↓
Neon PostgreSQL
     ↑
React Native Android
```

------------------------------------------------------------------------

# 34. FINAL DEFINITION OF DONE

## Backend

-   [ ] All mandatory APIs implemented
-   [ ] Serverless deployment working
-   [ ] PostgreSQL connected
-   [ ] Authentication secure
-   [ ] Authorization secure
-   [ ] Validation implemented
-   [ ] Rate limiting implemented
-   [ ] Logging implemented
-   [ ] CORS configured
-   [ ] Error handling implemented

## Web

-   [ ] Register
-   [ ] Login
-   [ ] Logout
-   [ ] Dashboard
-   [ ] Project CRUD
-   [ ] Task CRUD
-   [ ] Search
-   [ ] Filters
-   [ ] Responsive design
-   [ ] Loading states
-   [ ] Error states
-   [ ] Empty states
-   [ ] Calm minimal visual system

## Android

-   [ ] Register
-   [ ] Login
-   [ ] Logout
-   [ ] Dashboard
-   [ ] Projects
-   [ ] Tasks
-   [ ] Create task
-   [ ] Edit task
-   [ ] Delete task
-   [ ] Complete task
-   [ ] Search
-   [ ] Filters
-   [ ] Pull-to-refresh
-   [ ] Secure token storage
-   [ ] Expired-token handling
-   [ ] Offline/no-network handling

## Submission

-   [ ] Public GitHub repository
-   [ ] ER diagram
-   [ ] API documentation
-   [ ] README
-   [ ] Web deployment URL
-   [ ] Backend deployment URL
-   [ ] Android APK/distribution link
-   [ ] 5-minute recording

------------------------------------------------------------------------

# 35. FINAL INSTRUCTION FOR ANTIGRAVITY

When implementing this project, follow these rules:

### Rule 1 --- Do not build everything in one generation.

Implement one phase at a time.

### Rule 2 --- Do not fake functionality.

Dashboard values, projects and tasks must come from the real
API/database.

### Rule 3 --- Do not create a second backend for mobile.

Web and Android must call the exact same deployed REST API.

### Rule 4 --- Do not store passwords in plaintext.

Use bcrypt.

### Rule 5 --- Do not trust frontend authorization.

Authorization must be enforced on the backend.

### Rule 6 --- Do not store mobile authentication tokens in plain storage.

Use SecureStore.

### Rule 7 --- Do not use blue.

The visual identity is warm, neutral, muted sage/olive and minimal.

### Rule 8 --- Do not add AI branding.

No chatbot, AI assistant, sparkle icons, "AI-powered" labels, or fake AI
features.

### Rule 9 --- Keep the UI calm.

Prefer:

``` text
Whitespace
Typography
Hierarchy
Subtle borders
Muted colors
Simple motion
```

over:

``` text
Gradients
Neon colors
Huge cards
Excessive shadows
Visual noise
```

### Rule 10 --- Explain decisions in code/documentation.

The final project should be easy to defend in a technical interview.

------------------------------------------------------------------------

# 36. PRODUCT SUMMARY

**Flowspace** is a calm, minimal, cross-platform project management
system.

``` text
                 FLOWSPACE

        "Plan. Organize. Progress."

             ┌──────────────┐
             │  React Web   │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │   Express    │
             │  Serverless  │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │   Prisma     │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │   Neon       │
             │ PostgreSQL   │
             └──────▲───────┘
                    │
             ┌──────┴───────┐
             │ React Native │
             │   Android    │
             └──────────────┘
```

The final product should demonstrate:

**Good design + full-stack engineering + security + serverless
deployment + cross-platform synchronization.**

That is the core of the project.
