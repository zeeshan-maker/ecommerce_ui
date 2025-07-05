import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) return <Navigate to="/login" />;
  try {
   
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" />;
    }

    return children;
  }
   catch (error) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
