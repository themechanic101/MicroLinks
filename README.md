# MicroLinks

A simple and lightweight URL shortener built with React, Node.js, Express, and MongoDB.

MicroLinks converts long URLs into short, shareable links and tracks the number of times each shortened URL is accessed.

## Features

- Create short URLs
- Redirect short URLs to the original URL
- Track URL click count
- View URL statistics
- Basic URL validation
- Responsive dark-mode frontend
- REST API
- MongoDB persistence

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- NanoID

### Database

- MongoDB
- Mongoose

### Deployment

- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

## Project Structure

```text
MicroLinks/
│
├── config/
│   └── db.js
│
├── models/
│   └── Url.js
│
├── routes/
│   └── urlRoutes.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .env
├── .gitignore
├── server.js
├── package.json
└── README.md