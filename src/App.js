import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminExamForms from "./components/AdminExamForms";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./components/AdminDashboard";
import Dashboard from "./components/Dashboard";
import ExamForm from "./components/ExamForm";
import HallTicketList from "./components/HallTicketList";
import HallTicket from "./components/HallTicket";
import Profile from "./components/Profile";
import PrintExamForm from "./components/PrintExamForm";
import AdminSeatingChart from "./components/AdminSeatingChart";
import "./App.css";
import PrintExamFormPage from "./components/PrintExamFormPage";
import AdminSeatingChartPrint from "./components/AdminSeatingChartPrint";
import ChangePassword from "./components/ChangePassword";
import AdminSubjects from "./components/AdminSubjects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/print-exam-form-page/:id" element={<PrintExamFormPage />}/>
        <Route
  path="/admin-seating-chart-print"
  element={<AdminSeatingChartPrint />}
/>
        <Route path="/admin-seating-chart" element={<AdminSeatingChart />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-exam-forms" element={<AdminExamForms />} />
        <Route path="/print-exam-form/:id" element={<PrintExamFormPage />} />
       <Route path="/hall-tickets" element={<HallTicketList />} />
<Route path="/hall-ticket/:id" element={<HallTicket />} />
        {/* Student routes */}
       <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exam-form" element={<ExamForm />} />
  <Route path="/exam-form/:id" element={<ExamForm />} />
        <Route path="/hall-ticket" element={<HallTicket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/print-exam-form" element={<PrintExamForm />} />

        {/* Admin route */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-subjects" element={<AdminSubjects />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
