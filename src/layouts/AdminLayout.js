// src/layouts/AdminLayout.js
import Sidebar from "../components/Sidebar/Sidebar"
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
