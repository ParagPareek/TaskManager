import React, { useState } from "react";
import axios from "axios";
import "./ForgetPassword.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/new/forgetpassword", {
        email,
        newpassword: newPassword,
      });
      setMessage("Password reset successful! You can now log in with your new password.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error resetting password. Please try again."
      );
    }
  };

  return (
    <div className="forget-password-container">
      <div className="forget-password-box">
        <h2>Reset Your Password</h2>
        <form onSubmit={handleForgetPassword}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="reset-password-button">
            Reset Password
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgetPassword;