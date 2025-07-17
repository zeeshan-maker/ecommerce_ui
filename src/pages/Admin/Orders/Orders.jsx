import { getAllOrders } from "../../../services/orderService";
import "./Orders.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateOrder } from "../../../services/orderService";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const statusOptions = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const fetchAllOrder = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch orders");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await updateOrder(orderId, newStatus);
      toast.success(res.message);
      fetchAllOrder();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
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
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.order_id, e.target.value)
                    }
                    className="status-dropdown"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td>₹{order.total_amount}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.payment_status}
                  </span>
                  
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="empty">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
