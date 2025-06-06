# Project Management System

A full-stack project management application with a modern web UI and robust backend API. This monorepo contains both the frontend (client) and backend (server) codebases.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Monorepo Structure](#monorepo-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Database Schema](#database-schema)
- [API Overview](#api-overview)
- [License](#license)

---

## Features

- Project, team, and task management
- Multiple project views: List, Board, Timeline, Table
- Task assignment, status, priority, and comments
- User authentication (Cognito integration placeholder)
- Search functionality
- Responsive, modern UI with MUI and Tailwind CSS

## Tech Stack

- **Frontend:** Next.js, React, Redux Toolkit, MUI, Tailwind CSS, TypeScript
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, PostgreSQL
- **Other:** Docker (optional), dotenv, REST API

## Monorepo Structure

```
/ (root)
├── client/   # Next.js frontend
├── server/   # Express/Prisma backend
└── README.md # This file
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Yarn or npm
- PostgreSQL database (local or cloud)

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd server
   yarn install # or npm install
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env` and set your `DATABASE_URL`.
3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```
4. **Run migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```
5. **Seed the database (optional):**
   ```bash
   yarn seed
   ```
6. **Start the server:**
   ```bash
   yarn dev
   # or for production
   yarn build && yarn start
   ```
   The API will be available at `http://localhost:5000` by default.

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd client
   yarn install # or npm install
   ```
2. **Start the development server:**
   ```bash
   yarn dev
   ```
   The app will be available at `http://localhost:3000`.

---

## Database Schema

The backend uses Prisma ORM with a PostgreSQL database. Main models:

- **User**: users, with team and task relations
- **Team**: teams, with users and projects
- **Project**: projects, with tasks and teams
- **Task**: tasks, with assignment, status, priority, attachments, comments
- **Attachment, Comment, TaskAssignment**: supporting models

See `server/prisma/schema.prisma` for full details.

## API Overview

- `GET /api/projects` — List all projects
- `POST /api/projects` — Create a new project
- `GET /api/tasks` — List all tasks
- `POST /api/tasks` — Create a new task
- `PATCH /api/tasks/:taskId/status` — Update task status
- `GET /api/search` — Search projects/tasks

---

## License

[MIT](LICENSE)
