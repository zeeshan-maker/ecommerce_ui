import { Routes, Route } from 'react-router-dom';
import Cart from "../pages/Cart/Cart"
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import AdminRoutes from './AdminRoutes';
import ProtectedRoute from './ProtectedRoute';
import Checkout from '../pages/Checkout/Checkout';
import MyOrders from '../pages/MyOrders/MyOrders';
import PaymentSuccess from '../pages/Success/Success';

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/cart" element={< Cart />} />
      <Route path="/register" element={< Register />} />
      <Route path="/products/:product_id" element={<ProductDetail />} />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRoles={["User"]}>
            <Checkout />
          </ProtectedRoute>
          } 
        />

         <Route
        path="/my-orders"
        element={
          <ProtectedRoute allowedRoles={["User"]}>
            <MyOrders />
          </ProtectedRoute>
          } 
        />

        <Route path="/payment-success" element={<PaymentSuccess />} />



      {/* Admin and User Routes */}
      <Route path="/*" element={<AdminRoutes />} />

    </Routes>
  );
};

export default AppRoutes;
