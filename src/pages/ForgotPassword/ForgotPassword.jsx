import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './ForgotPassword.css'; // ✅ Import this
import { forgetPassword } from '../../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgetPassword(email);
      setEmail("")
      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
