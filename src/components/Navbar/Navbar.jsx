import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBoxOpen } from 'react-icons/fa';
import './Navbar.css';
import useDispatcher from '../../redux/useDispatcher';
import { useCartSelector } from '../../redux/useSelectors';


const Navbar = () => {
  const { logout } = useDispatcher();
  const { cart } = useCartSelector();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const cartItemCount = cart.length;

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);
  });

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        {
          isLoggedIn && role === "Admin" ? <Link to="/admin/dashboard">🛍️ Admin Panel</Link> : <Link to="/">🛍️ ShopEase</Link>
        }
      </div>

      <ul className="nav-links">
        {/* <li><Link to="/">Home</Link></li> */}
      </ul>
      <div className="nav-actions">
        {isLoggedIn && role === "User" && (
          <>
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </Link>

            <Link to="/my-orders" className="orders-link">
              <FaBoxOpen size={18} style={{ marginRight: '5px' }} />
              My Orders
            </Link>
          </>
        )}

        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" className="login-btn">
            <FaUser style={{ marginRight: '5px' }} />
            Login
          </Link>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
