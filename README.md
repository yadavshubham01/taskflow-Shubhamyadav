#  TaskFlow – Project Management App

## 1. Overview

TaskFlow is a modern project and task management web application built with **React + TypeScript**.
It allows users to create projects, manage tasks, and track progress using a **Kanban-style board with drag-and-drop support**.

### Features

*  Authentication (Login / Register with JWT)
*  Project management (Create, Edit, Delete)
*  Task management (CRUD operations)
*  Kanban board (Drag & Drop between statuses)
*  Filter tasks by status and assignee
*  Dark mode support
*  Optimistic UI updates (instant feedback)
*  Fully responsive design

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Hook Form + Zod
* dnd-kit (drag & drop)

### Mock Backend

* json-server (simulates REST API)

### DevOps

* Docker Compose

---

## 2. Architecture Decisions

###  Why this structure?

* **Frontend-first approach**: Since this is a frontend-focused implementation, I used `json-server` to simulate backend APIs instead of building a full backend.
* **Component-based architecture**: UI is split into reusable components (Navbar, Cards, Dialogs, Forms).
* **Feature-based structure**: Tasks and Projects are organized logically.
* **Optimistic UI updates**: Improves user experience by updating UI instantly before API response.

---

###  Tradeoffs

* ❌ No real backend (authentication is mocked)
* ❌ No database (json-server used instead)
* ❌ No real-time sync

---

###  What was intentionally skipped

* Full backend (PostgreSQL, migrations)
* Advanced auth (refresh tokens, roles)
* State management libraries (Redux/Zustand)

👉 These were skipped to keep focus on **frontend quality and UX**

---

## 3. Running Locally

###  Prerequisites

* Docker installed

---

###  Steps

```bash
git clone https://github.com/your-username/taskflow
cd taskflow

cp .env.example .env

docker compose up
```

---

###  Access

* Frontend: [http://localhost:3000](http://localhost:3000)
* API: [http://localhost:4000](http://localhost:4000)

---

## 4. Running Migrations

Not required.

👉 This project uses **json-server as a mock backend**, so no database migrations are needed.

---

## 5. Test Credentials

Use the following credentials to log in:

```text
Email:    test@example.com
Password: password123
```

---

## 6. API Reference

###  Auth

#### POST /auth/register

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

#### POST /auth/login

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

---

###  Projects

#### GET /projects

```json
{
  "projects": [...]
}
```

---

#### POST /projects

```json
{
  "name": "New Project",
  "description": "Optional"
}
```

---

#### GET /projects/:id

```json
{
  "id": "1",
  "name": "Project",
  "tasks": [...]
}
```

---

#### DELETE /projects/:id

---

###  Tasks

#### GET /projects/:id/tasks

#### POST /projects/:id/tasks

```json
{
  "title": "Task",
  "priority": "high",
  "status": "todo"
}
```

---

#### PATCH /tasks/:id

```json
{
  "status": "done"
}
```

---

#### DELETE /tasks/:id

---


##  Final Thoughts

This project focuses on **frontend engineering quality**, including:

* Clean architecture
* Scalable components
* Strong UX principles
* Real-world patterns (forms, drag-drop, optimistic updates)

---

#  Live Demo (optional)

*Add if deployed*

---

# ⭐ Author

**Shubham Yadav**






