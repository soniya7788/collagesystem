import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExamFormContent from "./ExamFormContent";
import "./PrintExamForm.css";

function PrintExamFormPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    axios.get(`https://collagesystem-backend.onrender.com/api/exam/exam-form/${id}`)
      .then(res => setForm(res.data));
  }, [id]);

  if (!form) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <ExamFormContent form={form} isAdmin={false} />
      <button
        className="print-btn"
        onClick={() => window.print()}
        style={{ backgroundColor: "#00ff88", marginTop: "20px" , width: "5%", height: "35px"}}
      >
        Print
      </button>
    </div>
  );
}

export default PrintExamFormPage;
