import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // CSS for styling
import { loginUser } from '../../services/authService';
import useDispatcher from '../../redux/useDispatcher';
import { toast } from 'react-toastify';
import { getCart } from '../../services/cartService';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login, setCart } = useDispatcher();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form.email, form.password);
      login(response);
      if (response.user.role === "Admin") {
        navigate('/admin/dashboard');
      } else {
        // Fetch cart from DB
        const cartData = await getCart();
        setCart(cartData.CartItems)
        setForm({ email: '', password: '' })
        navigate('/');
      }

    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong.")
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <p className="forgot-password-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <button type="submit">Login</button>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
