import React, { useEffect, useState } from "react";
import "../css-file/HomePage.css";

const HomePage = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    var productData;
    var userData;
    try {
      const [productRes, userRes] = await Promise.allSettled([
        fetch("http://apparels360.in/api/Product/GetProductList"),
        fetch("http://apparels360.in/api/Account/GetEmployeeUsers")
      ]);

      if (productRes.status === "fulfilled" && productRes.value.ok) {
        productData = await productRes.value.json();
        console.log("Product Data:", productData);

      } else {
        console.error("Product API failed");
      }

      if (userRes.status === "fulfilled" && userRes.value.ok) {
        userData = userRes.value;

      } else {
        console.error("User API failed");
      }

      setStats({
        totalProducts: productData?.data?.length ?? 0,
        totalUsers: userData?.length ?? 0,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    }
  };

  return (
    <div className="dashboard">
      <h2>👋 Welcome to the Admin Panel</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h4>📦 Total Products</h4>
          <p>{stats.totalProducts}</p>
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
