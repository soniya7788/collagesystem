# 🎓 Autonomous Institute Exam Portal

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application developed to automate the examination process of autonomous institutes. The system provides role-based access for Students and Administrators, allowing seamless exam form submission, subject management, hall ticket generation, seating arrangement, and examination administration.

---

## ✨ Features

`🔐 Authentication`
`📝 Exam Forms`
`🎫 Hall Tickets`
`🪑 Seating Chart`
`📚 Subject Management`
`📊 Dashboard`
`💳 Payment Verification`
`📧 Email OTP`
`👨‍🎓 Student Portal`
`👨‍💼 Admin Portal`

---

## 🛠 Tech Stack

### Frontend 
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)  ![JavaScript (https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)  ![HTML5 (https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)  ![CSS3](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
### Backend
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
### Database
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
### Tools
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

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
