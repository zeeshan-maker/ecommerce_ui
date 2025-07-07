// pages/Success.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder } from '../../services/orderService';



const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();


 useEffect(() => {
     const query = new URLSearchParams(location.search);
    const shippingDetails = {
      address: query.get('address'),
      city: query.get('city'),
      postalCode: query.get('postalCode'),
      country: query.get('country'),
      paymentMethod:query.get("paymentMethod")
    };
     const saveOrder = async () => {
       try {
            const res = await createOrder(shippingDetails);
            toast.success(res.message)
            navigate("/my-orders")
          } catch (error) {
            toast.error(error.response.data.error || error.response.data.message)
          }
     }
     saveOrder();
    
  }, [location]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🎉 Payment Successful!</h2>
      <p>Thank you for your order.</p>
    </div>
  );
};

export default PaymentSuccess;
