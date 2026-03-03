HRMS Lite – Full-Stack Human Resource Management System

Project Overview

HRMS Lite is a lightweight web-based Human Resource Management System designed to manage employee records and track daily attendance. The system simulates a basic internal HR tool and focuses strictly on essential HR operations without unnecessary complexity.

The objective of this project is to demonstrate end-to-end full-stack development capability including frontend development, backend API design, database modeling, validation, error handling, and production deployment.

The application is fully functional, modular, and deployed for public access.

Tech Stack

Frontend React (Vite) Axios CSS (custom styling)

Backend Node.js Express.js

Database MongoDB Atlas (Cloud NoSQL database)

Deployment Render (Backend – Web Service) Render (Frontend – Static Site)

Core Features

Employee Management

Add new employee

Unique Employee ID enforcement

Unique Email enforcement

Server-side email validation

Required field validation

View employee list

Delete employee

Attendance Management

Mark attendance (Present / Absent)

Unique attendance per employee per date

View attendance history per employee

Proper duplicate prevention

System Architecture

High-Level Flow

Frontend (React) | v Backend API (Express) | v MongoDB Atlas (Database)

Architecture Diagram (Mermaid)

Deployment Architecture

API Design

Employee Endpoints

POST /api/employees Creates a new employee

GET /api/employees Returns all employees

DELETE /api/employees/:id Deletes an employee

Attendance Endpoints

POST /api/attendance Marks attendance

GET /api/attendance/:employeeId Returns attendance history for employee

Database Schema Design

Employee Schema

employeeId (String, required, unique)

fullName (String, required)

email (String, required, unique)

department (String, required)

timestamps

Attendance Schema

employee (ObjectId reference to Employee)

date (Date, required)

status (Enum: Present, Absent)

timestamps

Unique compound index on (employee + date)

Data Integrity Model

Validation & Error Handling

Server-side validation includes:

Required field checks

Email format validation (regex)

Duplicate employee prevention

Duplicate attendance prevention

Proper HTTP status codes:

201 Created

400 Bad Request

404 Not Found

409 Conflict

500 Server Error

All errors return structured JSON responses:

{ success: false, message: "Descriptive error message" }

UI Features

Clean, centered layout

Card-based sections

Professional color palette

Loading states

Empty state messages

Error message display

Intuitive navigation (Employees / Attendance tabs)

UI Flow Overview

Project Structure

Root Structure

hrms-lite/ │ ├── backend/ │ ├── controllers/ │ ├── models/ │ ├── routes/ │ ├── config/ │ ├── server.js │ └── package.json │ ├── frontend/ │ ├── src/ │ │ ├── pages/ │ │ ├── services/ │ │ ├── App.jsx │ │ └── styles.css │ └── package.json

Backend follows MVC-style separation: Models → Controllers → Routes

Frontend follows modular component-based structure.

How to Run Locally

Clone the repository

git clone https://github.com/yourusername/hrms-lite.git

cd hrms-lite

Setup Backend

cd backend npm install

Create .env file inside backend:

MONGO_URI=your_mongodb_connection_string

Start backend:

npm run dev

Backend runs on: http://localhost:5000

Setup Frontend

Open new terminal:

cd frontend npm install npm run dev

Frontend runs on: http://localhost:5173

Production Deployment

Backend deployed as a Web Service on Render Frontend deployed as a Static Site on Render MongoDB Atlas used for cloud database hosting

Both services are publicly accessible and connected via live API endpoints.

Assumptions & Limitations

Single admin user (no authentication required as per assignment)

No payroll, leave management, or advanced HR modules

Designed for demonstration of core HR workflows

No role-based access control

No pagination implemented (can be added easily)

Scalability Considerations

Current system is lightweight but can be extended with:

Authentication (JWT-based admin login)

Role-based access control

Pagination for large datasets

Attendance analytics dashboard

Date filtering and reporting

Docker containerization

CI/CD pipeline

Conclusion

HRMS Lite fulfills all mandatory functional requirements of the assignment:

Clean full-stack implementation

RESTful API architecture

Data persistence with validation

Error handling

Production deployment

Modular and maintainable codebase

The system is stable, realistic, and usable as a basic internal HR management tool.
