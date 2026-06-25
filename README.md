# WIRE – Product Launch Website

A product launch website for [WIRE](https://github.com/animeshknows/wire-landing), a peer-to-peer real-time chat app using WebRTC and Firebase for secure, serverless messaging in the browser.

Built with Spring Boot, React, and MySQL as part of the Maincrafts Internship Program at Amity University.

---

## Tech Stack

- **Frontend** — HTML, CSS, JavaScript → React (Vite) + React Router v6
- **Backend** — Spring Boot 3.x, Spring Security, JWT
- **Database** — MySQL (Railway)
- **ORM** — Spring Data JPA

---

## Features

- Responsive landing page with hero, features, and services sections
- Contact form with client-side validation
- REST API backend (`POST /submit`, `GET /contacts`)
- JWT-based user authentication and protected routes
- Task Manager Dashboard with full CRUD, search, and filtering
- Full frontend-to-backend integration via REST API calls

---

## Getting Started

### Backend

```bash
cd wire-backend
./mvnw spring-boot:run
```

Runs at `http://localhost:8080`

### Frontend (React)

```bash
cd wire-frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/submit` | Save contact form submission |
| GET | `/contacts` | Get all submissions |
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

---

## Live Demo

Static landing page (Task 1) → https://animeshknows.github.io/wire-landing/

---

## Developer

**Animesh Kumar Pandey** — B.Tech CS&E, Amity University  
Enrollment: A7605223074 | Faculty Guide: Dr. Sheenu Rizvi