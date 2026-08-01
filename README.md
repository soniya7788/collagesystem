# 🎓 Autonomous Institute Exam Portal

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application developed to automate the examination process of autonomous institutes. The system provides role-based access for Students and Administrators, allowing seamless exam form submission, subject management, hall ticket generation, seating arrangement, and examination administration.

🔗 **Live Demo:** https://collagesystem.vercel.app

🔗 **Backend API:** https://collagesystem-backend.onrender.com

---

## 📌 Features

### 👨‍🎓 Student Module
- Student Registration
- Student Login & Authentication
- Forgot Password (Email OTP)
- Reset Password
- Change Password
- Student Dashboard
- Profile Management
- Subject Selection
- Exam Form Submission
- Payment Verification
- Hall Ticket Download

### 👨‍💼 Admin Module
- Admin Login
- Dashboard with Statistics
- Student Management
- Subject Management
- Add Subjects
- Update Subjects
- Search & Filter Subjects
- Approve Exam Forms
- Payment Verification
- Hall Ticket Generation
- Seating Chart Generation
- Student Search & Filtering

---

## 🚀 Technologies Used

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript (ES6)
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT (JSON Web Token)

### Email Service
- Nodemailer
- Gmail App Password

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📂 Project Structure

```
COLLAGESYSTEM
│
├── Backend
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── utils
│   ├── server.js
│   └── package.json
│
├── public
│
├── src
│   ├── components
│   ├── App.js
│   └── index.js
│
├── package.json
└── README.md
```

---

## 📸 Major Modules

- Student Registration
- Student Login
- Admin Login
- Forgot Password
- Reset Password
- Student Dashboard
- Admin Dashboard
- Subject Management
- Exam Form
- Subject Selection
- Payment Verification
- Hall Ticket Generation
- Seating Chart Generation

---

## 🔐 Authentication

- JWT Authentication
- Protected Routes
- Password Encryption
- Email Password Recovery

---

## 🗄 Database Collections

- Admins
- Students
- Subjects
- Subject Short Codes
- Exam Forms
- Hall Tickets

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/soniya7788/collagesystem.git
```

---

### Install Frontend

```bash
npm install
```

---

### Install Backend

```bash
cd Backend
npm install
```

---

### Configure Environment Variables

Create a `.env` file inside the **Backend** folder.

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Start Backend

```bash
cd Backend
node server.js
```

---

### Start Frontend

```bash
npm start
```

---

## 🌟 Future Enhancements

- PDF Receipt Generation
- Student Profile Photo Upload
- SMS Notifications
- Online Payment Gateway Integration
- Attendance Management
- Examination Analytics Dashboard
- Multi-Admin Support
- Export Reports to Excel/PDF

---

## 📖 Learning Outcomes

This project helped in understanding:

- MERN Stack Development
- REST API Development
- MongoDB Atlas Integration
- Authentication using JWT
- Role-Based Access Control
- Email Integration using Nodemailer
- CRUD Operations
- React State Management
- Deployment using Vercel & Render
- Git & GitHub Version Control

---

## 👩‍💻 Developer

**Soniya Rukmichand Yadav**

📧 Email: soniyaryadav@gmail.com

💼 LinkedIn: https://www.linkedin.com/in/soniya-yadav19

💻 GitHub: https://github.com/soniya7788

---

## 📄 License

This project is developed for educational and academic purposes.
