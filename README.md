# 📌 Profile-Based Task Manager API

## 📖 Description

This is a backend-based **Profile-Based Task Manager Application** built using Node.js, Express, and MySQL.
The application allows users to manage their tasks with proper authentication and authorization.

Each user can create, update, delete, and view only their own tasks, while admin users have extended control over the system.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based login & registration)
* 🔑 Password hashing using bcrypt
* 👤 Profile-based access control
* 🛡️ Role-Based Authorization (Admin & User)
* 📌 Full CRUD operations for tasks
* 🔍 Filter tasks by status (To Do, In Progress, Completed)
* 🗄️ MySQL database integration (without ORM)
* ⚙️ RESTful API design

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* MySQL
* JWT (JSON Web Token)
* bcrypt
* dotenv

---

## 🗄️ Database Schema

### Users Table

* id
* username (unique)
* email (unique)
* password (hashed)
* role (admin / user)

### Tasks Table

* id
* title
* description
* status
* user_id (foreign key)

---

## 🔐 Authentication

* Users can register and login
* Passwords are securely hashed using bcrypt
* JWT token is generated after login
* Token must be included in headers for protected routes

---

## 👮 Authorization

* Only authenticated users can access task routes
* Users can only manage their own tasks
* Admin can access all tasks

---

## 📡 API Endpoints

### 🔑 Auth Routes

* POST `/api/register` → Register user
* POST `/api/login` → Login user

### 📌 Task Routes

* POST `/api/tasks` → Create task
* GET `/api/tasks` → Get user tasks
* PUT `/api/tasks/:id` → Update task
* DELETE `/api/tasks/:id` → Delete task

---

## ⚙️ Installation & Setup

1. Clone the repository:

[```bash]git clone <(https://github.com/apu-22/Profile_Based-Task-Manager-App)>
cd profile-task-manager
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
PORT=5000
JWT_SECRET=your_secret_key
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=task_manager
```

4. Setup MySQL database:

* Create database `task_manager`
* Run SQL schema

5. Run server:

```bash
npm run dev
```

---

## 🧪 Testing

Use Postman to test API endpoints.

---

## 📌 Future Improvements

* Password reset with email verification
* Pagination & search
* Logging system
* Rate limiting

---

## 👨‍💻 Author

Apu Rayhan
Software Engineering Student

---
