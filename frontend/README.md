# 🚀 TaskFlow — Full-Stack Task Management Platform

TaskFlow is a full-stack task management application designed to help users
create, organize, search, update, and manage their tasks through a secure and
responsive web interface.

The application follows a modern client-server architecture with a
React + TypeScript frontend and a Spring Boot REST API backend, with JWT-based
authentication and persistent database storage.

---

## ✨ Features

### 🔐 Authentication & Security

- User registration and login
- JWT-based authentication
- Protected dashboard routes
- Secure API access using Bearer tokens
- User-specific task management
- Automatic handling of unauthorized sessions

### 📋 Task Management

- Create new tasks
- View existing tasks
- Update task details
- Delete tasks
- Task status management
- Task priority management

### 🔎 Search & Pagination

- Search tasks by title
- Paginated task retrieval
- Previous/Next pagination controls
- Efficient handling of larger task collections

### 🎨 Modern Frontend

- Responsive React interface
- TypeScript-based frontend
- Clean dashboard experience
- Responsive task cards
- Interactive forms
- Status and priority indicators
- Login and registration interfaces
- User-friendly error and success messages

### 📚 API Documentation

- RESTful backend APIs
- Swagger/OpenAPI documentation
- API testing through Swagger UI

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Axios
- React Router
- CSS

### Backend

- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- REST APIs
- JWT Authentication

### Database

- MySQL

### Development & Tools

- Git
- GitHub
- Maven
- Swagger / OpenAPI
- IntelliJ IDEA
- VS Code

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │       User          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ React + TypeScript  │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                              Axios / REST
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Spring Boot API   │
                         │      Backend        │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ▼               ▼               ▼
             Authentication     Task APIs       Validation
                / JWT          CRUD/Search      & Security
                    │               │
                    └───────┬───────┘
                            │
                            ▼
                    ┌─────────────────┐
                    │      MySQL      │
                    │    Database     │
                    └─────────────────┘

🔐 Authentication Flow

TaskFlow uses JWT-based authentication.

User
 │
 ▼
Login / Register
 │
 ▼
Spring Boot Authentication
 │
 ▼
JWT Token
 │
 ▼
Frontend stores token
 │
 ▼
Axios attaches Bearer Token
 │
 ▼
Protected REST APIs
 │
 ▼
User-specific Tasks
📌 Core API Endpoints
Authentication
POST /api/users/register
POST /api/users/login
Tasks
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
Search
GET /api/tasks/search?title={title}
Pagination
GET /api/tasks/page?page={page}&size={size}
📖 Swagger API Documentation

Once the backend is running, Swagger UI can be used to explore and test
the available REST APIs.

http://localhost:8080/swagger-ui/index.html

Swagger provides an interactive interface for testing endpoints and viewing
their request and response structures.

📁 Project Structure
TaskFlow/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
⚙️ Getting Started
Prerequisites

Make sure the following are installed:

Java 17+
Maven
Node.js
npm
MySQL
Git
1. Clone the Repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd TaskFlow
2. Configure the Database

Create a MySQL database for the application.

Example:

CREATE DATABASE taskflow;

Configure the database credentials in the Spring Boot application's
configuration file.

3. Run the Backend

Navigate to the backend:

cd backend

Run:

mvn spring-boot:run

The backend will run on:

http://localhost:8080
4. Run the Frontend

Open another terminal and navigate to:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend will normally be available at:

http://localhost:5173
🧪 Build Verification

The frontend production build can be verified using:

npm run build

A successful build confirms that the TypeScript application compiles
successfully for production.

🎯 Key Technical Highlights

TaskFlow demonstrates practical implementation of:

Full-stack application development
REST API design
JWT authentication
Spring Security
React component architecture
TypeScript
Axios API integration
CRUD operations
Database persistence
Search functionality
Pagination
Protected frontend routes
API documentation using Swagger/OpenAPI
Responsive frontend design