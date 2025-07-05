// pages/Success.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const PaymentSuccess = () => {
const navigate = useNavigate();
 useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/my-orders');
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>🎉 Payment Successful!</h2>
      <p>Thank you for your order.</p>
    </div>
  );
};

export default PaymentSuccess;
