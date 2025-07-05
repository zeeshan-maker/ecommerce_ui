import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './ResetPassword.css'; // ✅ Import styles
import { resetPassword } from '../../services/authService';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(token,password)
      toast.success(response.message || "Password reset successful");
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
