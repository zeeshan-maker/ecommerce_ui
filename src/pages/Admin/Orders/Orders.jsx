import { getAllOrders } from '../../../services/orderService';
import './Orders.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrder = async () => {
      try {
        const res = await getAllOrders();
        setOrders(res);
      } catch (error) {
        toast.error(error.response?.data?.error || 'Failed to fetch orders');
      }
    };
    fetchAllOrder();
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-heading">All Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order.order_id}>
                <td>{index + 1}</td>
                <td>{order.order_id}</td>
                <td>{order.user_id}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>₹{order.total_amount}</td>
                <td>{order.payment_status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="empty">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
