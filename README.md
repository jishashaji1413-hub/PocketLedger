# 💰 PocketLedger

A modern **Personal Finance Tracker** built with **Next.js**, **TypeScript**, **Prisma**, and **PostgreSQL** that helps users securely manage their daily income and expenses.

PocketLedger allows authenticated users to record transactions, visualize financial insights, generate downloadable reports, and monitor their financial health through an intuitive dashboard.

---

## 📖 Project Overview

PocketLedger is a full-stack web application that enables users to:

- Securely register and login
- Manage income and expenses
- View financial summaries
- Analyze spending habits
- Generate PDF & Excel reports
- Search and paginate transactions
- Maintain separate data for every authenticated user

---

# 🚀 Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure HTTP Cookies
- Logout Functionality
- User-specific Dashboard

---

## 💵 Transaction Management

- Add Transactions
- Edit Transactions
- Delete Transactions
- Transaction History
- Search Transactions
- Server-side Pagination
- Continuous Serial Number across pages

---

## 📊 Dashboard

- Current Balance
- Total Income
- Total Expense
- Real-time Financial Summary

---

## 📈 Analytics

Visual representations of user finances including:

- Expense Distribution
- Monthly Expense Chart
- Income vs Expense Comparison
- Biggest Income
- Biggest Expense
- Average Expense
- Savings Rate
- Category-wise Expense Analysis

---

## 📄 Reports

Generate downloadable reports within a selected date range.

Supported formats:

- PDF Report
- Excel Report

Report contains:

- User Details
- Income
- Expense
- Balance
- Transaction History

---

# 🛠 Tech Stack

### Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js Route Handlers
- Prisma ORM
- PostgreSQL

### Authentication

- JWT (JSON Web Token)
- HTTP-only Cookies

### Charts & Reports

- Recharts
- jsPDF
- jspdf-autotable
- SheetJS (xlsx)
- file-saver

---


# ⚙ Prerequisites

Install the following before running the project:

- Node.js (v18 or later)
- PostgreSQL
- Git
- npm

---

# 📥 Installation

## 1 Clone Repository

```bash
git clone https://github.com/jishashaji1413-hub/PocketLedger.git
```

---

## 2 Navigate into project

```bash
cd PocketLedger
```

---

## 3 Install Dependencies

# Install project dependencies
npm install

# Prisma ORM
npm install prisma @prisma/client

# Prisma CLI (Development)
npm install -D prisma

# Password Hashing
npm install bcryptjs

# JWT Authentication
npm install jsonwebtoken

# Cookie Management
npm install cookie

# Icons
npm install lucide-react

# Charts
npm install recharts

# PDF Generation
npm install jspdf jspdf-autotable

# Excel Generation
npm install xlsx file-saver

---

# 🔐 Environment Variables

Create a file named

```
.env
```

Add the following:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/db_name"

JWT_SECRET="your-secret-key" 
```

Generate your own JWT Secret using:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

# 🗄 Database Setup

Generate Prisma Client

```bash
npx prisma generate
```

Run Migrations

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# ▶ Running the Application

Start development server

```bash
npm run dev
```

Application will run at

```
http://localhost:3000
```

---

# 🔑 Authentication Flow

```
User Registers
       │
       ▼
Password Hashed using bcrypt
       │
       ▼
Saved in PostgreSQL
       │
       ▼
User Logs In
       │
       ▼
JWT Token Generated
       │
       ▼
Stored in HTTP-only Cookie
       │
       ▼
Protected Routes Verified
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/register | Register User |
| POST | /api/login | Login |
| GET | /api/user | Get Logged-in User |

---

## Transactions

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/transactions | Get Transactions |
| POST | /api/transactions | Add Transaction |
| PUT | /api/transactions | Update Transaction |
| DELETE | /api/transactions | Delete Transaction |

Supports:

- Pagination
- Search
- User-specific filtering

---

# 🔍 Search

Server-side searching is implemented.

Users can search by:

- Description
- Category

Search works seamlessly with pagination.

---

# 📑 Pagination

Server-side pagination is implemented.

Features:

- 5 records per page
- Previous / Next navigation
- Search compatible
- Continuous serial numbering



---

# 📊 Reports

Users can generate reports by selecting:

- From Date
- To Date

Available formats:

- PDF
- Excel

Each report includes:

- User Information
- Income
- Expense
- Balance
- Transactions

---

# 📈 Analytics

Analytics page provides:

- Income
- Expense
- Balance
- Savings Rate
- Monthly Expenses
- Expense Categories
- Biggest Income
- Biggest Expense
- Average Expense

---

# 🔒 Security Features

- Password Hashing (bcrypt)
- JWT Authentication
- HTTP-only Cookies
- Protected Routes
- User-specific Transactions
- Prisma ORM against SQL Injection

---

## 📸 Screenshots

### Home Page

![HomePage](screenshots/Homepage.png)

---
### Login Page

![Login](screenshots/Login.png)

---

### SignUp Page

![Signup](screenshots/SignUp.png)

---

### Dashboard

![Dashboard](screenshots/Dashboard.png)

---

### Transactions

![Transactions](screenshots/Transactions.png)

---

### Analytics

![Analytics](screenshots/Analytics.png)

---

### Reports

![Reports](screenshots/Report.png)
---

# 🚀 Future Enhancements

Planned improvements include:

- Email Verification during Registration
- Forgot Password functionality
- Password Reset via Email
- Email Validation using OTP
- Refresh Token Authentication
- User Profile Management
- Export Analytics Charts
- Dark Mode
- Monthly Budget Planner
- Savings Goals
- Expense Categories with Icons
- Multi-Currency Support
- Notifications & Reminders
- Responsive Mobile Optimization

---


# 👩‍💻 Author

**Jisha Shaji**

GitHub:
https://github.com/jishashaji1413-hub



---

# 📜 License

This project is created for educational and portfolio purposes.
