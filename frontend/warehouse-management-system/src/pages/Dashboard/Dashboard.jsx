import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DashboardBoxes from "../../components/SummaryBoxes/DashboardBoxes";
import OrderDash from "./OrderDash";
import './Dashboard.css'
import ProductDash from "./ProductDash";

const Dashboard = ({ isActive, toggleSidebar, title }) => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`https://localhost:7076/api/dashboard`); // Use Axios for GET request
        const data = response.data; // Extract data from Axios response
        setTotalCustomers(data.totalCustomers);
        setTotalProducts(data.totalProducts);
        setTotalSuppliers(data.totalSuppliers);
        setTotalOrders(data.totalOrders);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <DashboardBoxes
          boxOne={totalCustomers}
          boxTwo={totalSuppliers}
          boxThree={totalOrders}
          boxFour={totalProducts}
        />
        <div className="dashContent">
          <div className="dashOrders">
            <OrderDash />
          </div>
          <div className="dashProducts">
            <ProductDash />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
