import { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [prn, setPrn] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const submit = async () => {

    if (!prn || !oldPassword || !newPassword || !confirm) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/change-password",
        { prn, oldPassword, newPassword }
      );

      alert(res.data.message);

    } catch (err) {
      alert(err.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="auth-box">
      <h3>Change Password</h3>

      <input placeholder="PRN" onChange={e => setPrn(e.target.value)} />
      <input type="password" placeholder="Old Password"
        onChange={e => setOldPassword(e.target.value)} />
      <input type="password" placeholder="New Password"
        onChange={e => setNewPassword(e.target.value)} />
      <input type="password" placeholder="Confirm New Password"
        onChange={e => setConfirm(e.target.value)} />

      <button onClick={submit}>Change Password</button>
    </div>
  );
}

export default ChangePassword;