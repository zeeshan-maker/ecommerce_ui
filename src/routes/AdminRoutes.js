import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../pages/Admin/AdminDashboard/AdminDashboard";
import AddProduct from "../pages/Admin/AddProduct/AddProduct";
import AdminLayout from "../layouts/AdminLayout";
import AddCategory from "../pages/Admin/AddCategory/AddCategory"
const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add-product"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <AddProduct />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-category"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminLayout>
              <AddCategory />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AdminRoutes;
