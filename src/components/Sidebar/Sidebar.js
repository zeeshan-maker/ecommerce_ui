import { NavLink } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa'; // icons
import { MdInventory2 } from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <ul>
      <li>
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
          <MdInventory2 className="sidebar-icon" />
          Product List
        </NavLink>
      </li>
      <li>
        <NavLink to="/admin/add-product" className={({ isActive }) => isActive ? 'active' : ''}>
          <FaPlus className="sidebar-icon" />
          Add Product
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Sidebar;
