import React, { useState } from 'react';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';
import { useCartSelector } from "../../redux/useSelectors";
import getImageURL from "../../utils/getImageURL";
import { createOrder } from '../../services/orderService';
import { toast } from 'react-toastify';
import { createStripeSession } from '../../services/paymentService';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useCartSelector();

  const [form, setForm] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'COD',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    // Handle order placement logic
    if (form.paymentMethod === 'Online') {
      try {
        const res = await createStripeSession();
        window.location.href = res.url; // Redirect to Stripe
      } catch (err) {
        toast.error('Stripe error: ' + err.response?.data?.message || err.message);
      }
    }
    else {
      try {
        const res = await createOrder(form);
        toast.success(res.message)
        navigate("/my-orders")
        setForm({
          address: '',
          city: '',
          postalCode: '',
          country: '',
          paymentMethod: 'COD',
        })

      } catch (error) {
        toast.error(error.response.data.error || error.response.data.message)
      }
    }

  };

  const totalPrice = cart.reduce((total, item) => total + item.Product.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h2 className='checkout-heading'>Checkout</h2>

      <div className="checkout-content">
        {/* Order Summary Section */}
        <div className="order-summary-items">
          {cart.map((item) => (
            <div className="summary-item" key={item.product_id}>
              <img
                src={item.Product.image ? getImageURL(item.Product.image) : ""}
                alt={item.Product.name}
                className="summary-image"
              />
              <div className="summary-details">
                <p className="summary-name">{item.Product.name}</p>
                <p className="summary-price">Price: {item.Product.price}</p>
                <p className="summary-qty">Qty: {item.quantity}</p>
                <p className="summary-price">₹ {item.Product.price * item.quantity}</p>
              </div>

            </div>
          ))}
          <div className="order-total">
            <h3>Total Amount: ₹ {totalPrice}</h3>
          </div>
        </div>



        {/* Shipping Address Form */}
        <form onSubmit={handlePlaceOrder} className="checkout-form">
          <h3>Shipping Address</h3>

          <div className="form-group">
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>City</label>
            <input name="city" value={form.city} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Postal Code</label>
            <input name="postalCode" value={form.postalCode} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input name="country" value={form.country} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
              <option value="COD">Cash on Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <button type="submit" className="place-order-btn">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
