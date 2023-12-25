import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import CardBox from "../../components/CardBox/CardBox";
import OrderService from "../../service/OrderService/OrderService";
import axios from "axios";

const Order = ({ isActive, toggleSidebar, title }) => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7076/api/Order");
        setOrders(response.data);
        setTotalOrders(response.data.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [orders]);
  return(
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <CardBox total={totalOrders} title={"Orders"} />
        <OrderService />
      </div>
    </div>
  );
};

export default Order;
