import React, { useState } from "react";
import { FaHome, FaUser, FaBox, FaSignOutAlt, FaBars,FaMobile } from "react-icons/fa";
import HomePage from "./HomePage";
import EmployeePage from "./Employee/EmployeePage.jsx";
import ProductPage from "./Product/ProductPage.js";
import "../css-file/AdminPanel.css";
import CustomerList from "./App Customer/CustomerList.jsx";

const AdminPanel = ({ onLogout, users, addUser, products, addProduct }) => {
  const [activePage, setActivePage] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <h2 className="logo">Admin</h2>
        </div>
        <button onClick={() => setActivePage("home")}>
          <FaHome />
          <span>Overview</span>
        </button>
        <button onClick={() => setActivePage("users")}>
          <FaUser />
          <span>Employee</span>
        </button>
        <button onClick={() => setActivePage("products")}>
          <FaBox />
          <span>Products</span>
        </button>
        <button onClick={() => setActivePage("appCustomer")}>
          <FaMobile />
          <span>App Customer</span>
        </button>
        <div className="sidebar-footer">
          <button
            className="logout-btn"
            onClick={() =>
              window.confirm("Are you sure you want to logout?") && onLogout()
            }
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div
        className="toggle-sidebar-btn"
        onClick={toggleSidebar}
        style={{ left: sidebarCollapsed ? 72 : 240 }}
      >
        <FaBars />
      </div>

      <main
        className="main-panel"
      >
        <div className="content-grid">
          
          <section className="content-center">
            {activePage === "home" && <HomePage />}
            {activePage === "users" && (
              <EmployeePage users={users} onAddUser={addUser} />
            )}
            {activePage === "products" && (
              <ProductPage products={products} onAddProduct={addProduct} />
            )}
            {activePage === "appCustomer" && (
              <CustomerList/>
            )}


          </section>
         
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
