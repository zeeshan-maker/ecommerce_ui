import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import { getMyOrders } from "../../services/orderService";
import { toast } from "react-toastify";
import getImageURL from "../../utils/getImageURL";
import useDispatcher from "../../redux/useDispatcher";
import { getCart } from "../../services/cartService"; 

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const { setCart } = useDispatcher();

  const getOrderStage = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return 1;
      case "confirmed":
        return 2;
      case "shipped":
        return 3;
      case "delivered":
        return 4;
      default:
        return 0;
    }
  };

  const orderStages = ["Placed", "Confirmed", "Shipped", "Delivered"];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.orders);
        const cartData = await getCart();
        setCart(cartData.CartItems);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load orders");
      }
    };

    fetchOrders();

  
  }, [setCart]);

  return (
    <div className="my-orders-container">
      <h2 className="page-title">My Orders</h2>
      {orders.length === 0 ? (
        <p className="empty-message">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.order_id}>
            <div className="order-header">
              <div>
                <strong>Order ID:</strong> {order.order_id}
              </div>
              <div>
                <strong>Payment Status:</strong>{" "}
                <span className={`status ${order.payment_status.toLowerCase()}`}>
                  {order.payment_status}
                </span>
              </div>
              <div>
                <strong>Total:</strong> ₹{order.total_amount}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="order-items">
              {order.OrderItems.map((item) => (
                <div className="order-item" key={item.orderItem_id}>
                  <img
                    src={getImageURL(item.Product.image)}
                    alt={item.Product.name}
                  />
                  <div className="item-details">
                    <p className="item-name">{item.Product.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>₹{item.price} each</p>
                  </div>
                </div>
              ))}

              <div className="order-tracker">
                {orderStages.map((stage, index) => (
                  <div
                    className={`tracker-step ${
                      index < getOrderStage(order.status) ? "active" : ""
                    }`}
                    key={index}
                  >
                    <div className="circle">{index + 1}</div>
                    <span className="label">{stage}</span>
                    {index < orderStages.length - 1 && <div className="line" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
