# Flow Task API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express-API-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)
![Swagger](https://img.shields.io/badge/Swagger-Docs-brightgreen)
![Zod](https://img.shields.io/badge/Zod-Validation-purple)
![License](https://img.shields.io/badge/License-ISC-lightgrey)

A RESTful backend API for task management built with Node.js and Express. It includes authentication, validation, and a structured architecture designed for scalability and maintainability.

---

## Overview

Flow Task API provides endpoints to manage tasks with user authentication. It follows a modular structure separating concerns such as routes, controllers, services, and schemas.

---

## Features

- JWT-based authentication
- Task CRUD operations
- Request validation using Zod
- Layered architecture (controller, service, schema)
- PostgreSQL database integration
- Error handling with custom error classes
- API documentation with Swagger
- Testing with Vitest and Supertest

---

## Technologies

- Node.js
- Express.js
- PostgreSQL
- Zod
- JSON Web Tokens (JWT)
- Swagger

---

## Requirements

- Node.js (v18 or higher recommended)
- npm
- PostgreSQL

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/AlexisPA01/flow-task.git
cd flow-task
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
HOST=your_host_postgresql_connection
DATABASE=your_database_postgresql_connection
DB_USER=your_userdatabase_postgresql_connection
DB_PASSWORD=your_passworddatabase_postgresql_connection
JWT_SECRET=your_secret_key
REFRESH_SECRET_JWT=your_secret_refresh_key
```

---

## Development

Run the project in development mode:

```bash
npm run dev
```

---

## Production

Start the server:

```bash
npm start
```

---

## API Documentation

Swagger documentation is available at:

```
/api-docs
```

---

## Project Structure

```
flow-task/
├── src/
│   ├── config/
│   ├── docs/
│   ├── errors/
│   ├── middleware/
│   ├── config/
│   └── modules/
│   └── routes/
│   └── tests/
│   └── utils/
│   └── validators/
│   └── app.js
│   └── server.js
├── .env
├── .gitignore
├── eslint.config.mjs
├── nodemon.json
├── package.json
├── README.md
└── vitest.config.mjs
```

---

### Auth Endpoint

- POST /auth/login

---

## How It Works

- Requests are validated using Zod schemas before reaching controllers.
- Controllers handle HTTP logic and delegate business logic to services.
- Services interact with the database.
- Middleware handles authentication and error management.

---

## Author

AlexisPA01

---

## License

ISC