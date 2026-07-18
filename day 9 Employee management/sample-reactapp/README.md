# Employee Management System

A modern React application migrated to use a JSON Server mock REST API with Axios.

## Getting Started

### 1. Installation

First, install the project dependencies in the `sample-reactapp` directory:

```bash
npm install
```

### 2. Run React App

Start the Vite development server:

```bash
npm run dev
```

### 3. Run Mock API Server

Start the JSON Server on port 3001:

```bash
npm run server
```

Both servers must run simultaneously for the application to function correctly.

---

## API Documentation

You can test all endpoints using Postman.

### Base URL

```
http://localhost:3001
```

### Endpoints

#### 1. Get All Employees
* **Method:** `GET`
* **URL:** `http://localhost:3001/employees`
* **Response:** Array of employee records.

#### 2. Get Employee by ID
* **Method:** `GET`
* **URL:** `http://localhost:3001/employees/1`
* **Response:** Single employee record matching the specified ID.

#### 3. Add New Employee
* **Method:** `POST`
* **URL:** `http://localhost:3001/employees`
* **Headers:** `Content-Type: application/json`
* **Request Body Example:**
  ```json
  {
    "employeeId": "EMP013",
    "name": "Arun Kumar",
    "email": "arun.k@company.com",
    "phone": "+91 98765 43222",
    "department": "Development",
    "designation": "Backend Developer",
    "role": "Backend Developer",
    "salary": "900000",
    "joiningDate": "2024-06-01",
    "joinDate": "2024-06-01",
    "status": "Active",
    "address": "Bangalore, India",
    "location": "Bangalore, India",
    "profileImage": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    "manager": "Rahul",
    "skills": "Node.js, Express, SQL",
    "rating": 4
  }
  ```

#### 4. Update Employee
* **Method:** `PUT`
* **URL:** `http://localhost:3001/employees/1`
* **Headers:** `Content-Type: application/json`
* **Request Body Example:**
  ```json
  {
    "employeeId": "EMP001",
    "name": "Rahul",
    "email": "rahul@company.com",
    "phone": "+91 98765 43210",
    "department": "Development",
    "designation": "Team Lead",
    "role": "Team Lead",
    "salary": "1500000",
    "joiningDate": "2024-01-15",
    "joinDate": "2024-01-15",
    "status": "Active",
    "address": "Bangalore, India",
    "location": "Bangalore, India",
    "profileImage": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120",
    "manager": "Keerthana",
    "skills": "React, Node.js, JavaScript, System Design",
    "rating": 5
  }
  ```

#### 5. Delete Employee
* **Method:** `DELETE`
* **URL:** `http://localhost:3001/employees/1`
* **Response:** `{}` (empty object)
