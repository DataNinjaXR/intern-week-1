# EmployeeHub - Employee Management System (Day 7)

A clean, professional Employee Management Dashboard built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Node.js / Express.js REST API**.

---

## 🚀 Features

- 📊 **Dashboard Overview**: Dynamic statistics cards (Total Employees, Active Employees, Unique Departments) and Recent Employees list.
- 👥 **Employee List**: Employee table view with real-time client-side **Search** (by name, email, department, position) and **Filters** (by Department & Status).
- ➕ **Add Employee**: Full form validation, loading indicators, and error handling.
- 🔍 **Employee Profile**: Detailed employee view with status badge, salary, position, phone, and website.
- ✏️ **Edit Employee**: Live profile updating using `PUT /api/employees/:id`.
- 🗑️ **Delete Employee**: Safe deletion with a custom confirmation modal dialog.
- 📱 **Responsive Design**: Custom sidebar layout with smooth mobile drawer overlay.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js REST API (In-memory storage)
- **Architecture**: Decoupled Client-Server model (`http://localhost:3000` & `http://localhost:5000`)

---

## 📁 Project Structure

```
Day-7/
├── nextjs-app/               # Next.js Frontend Application
│   ├── app/
│   │   ├── page.tsx          # Dashboard Page (/)
│   │   ├── layout.tsx        # Root Layout
│   │   └── employees/
│   │       ├── page.tsx      # Employee List & Search/Filter (/employees)
│   │       ├── create/
│   │       │   └── page.tsx  # Create Employee Page (/employees/create)
│   │       └── [id]/
│   │           ├── page.tsx  # Employee Details Page (/employees/[id])
│   │           └── edit/
│   │               └── page.tsx # Edit Employee Page (/employees/[id]/edit)
│   ├── components/
│   │   ├── Sidebar.tsx       # Navigation Sidebar with Mobile Drawer
│   │   ├── Header.tsx        # Dashboard Top Header & Admin Avatar
│   │   ├── StatCard.tsx      # Reusable Metric Card
│   │   ├── EmployeeTable.tsx # Employee Table Component
│   │   ├── EmployeeForm.tsx  # Reusable Employee Form
│   │   └── DeleteModal.tsx   # Deletion Confirmation Modal
│   └── lib/
│       └── api.ts            # Centralized REST API Service Client
│
└── node-api/                 # Express REST API Backend
    ├── server.js             # Main server entry (Port 5000)
    ├── routes/               # API routes (/api/employees)
    ├── controllers/          # Request controllers
    ├── services/             # In-memory employee service
    └── models/               # Seed employee dataset
```

---

## ⚡ How to Run

### 1. Start the Express Backend (`node-api`)
```bash
cd node-api
npm install
npm start
```
*Backend will run at: `http://localhost:5000`*

### 2. Start the Next.js Frontend (`nextjs-app`)
```bash
cd nextjs-app
npm install
npm run dev
```
*Frontend will run at: `http://localhost:3000`*

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/api/employees` | Fetch all employees |
| **GET** | `/api/employees/:id` | Fetch employee by ID |
| **POST** | `/api/employees` | Create a new employee |
| **PUT** | `/api/employees/:id` | Update an existing employee |
| **DELETE** | `/api/employees/:id` | Delete an employee |

---
