import React, { useEffect, useState } from "react";
import "./css-file/HomePage.css";

const HomePage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    newProducts: 0,
    saleProducts: 0,
    totalUsers: 0,
  });  

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const productRes = await fetch("http://apparels360.in/api/Product/GetProductList");
      const userRes = await fetch("http://apparels360.in/api/Account/GetEmployeeUsers");

      const productData = await productRes.json();
      const userData = await userRes.json();

      const newProducts = productData.filter(p => p.isNew === 1).length;
      const saleProducts = productData.filter(p => p.isSale === 1).length;

      setStats({
        totalProducts: productData.length,
        newProducts,
        saleProducts,
        totalUsers: userData.length,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>👋 Welcome to the Admin Panel</h2>
      <div className="overview-row">
        <div className="card">
          <h4>📦 Total Products</h4>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="card">
          <h4>🆕 New Products</h4>
          <p>{stats.newProducts}</p>
        </div>
        <div className="card">
          <h4>🔖 On Sale</h4>
          <p>{stats.saleProducts}</p>
        </div>
        <div className="card">
          <h4>👥 Total Users</h4>
          <p>{stats.totalUsers}</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
