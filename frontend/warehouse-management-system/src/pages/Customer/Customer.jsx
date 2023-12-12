import React from "react";
import { useState, useEffect } from "react";
import CustomerService from "../../service/CustomerService/CustomerService";
import Sidebar from "../../components/Slidebar/Sidebar";
import CardBox from "../../components/CardBox/CardBox";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const Customer = ({ isActive, toggleSidebar, title }) => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7076/api/Customer");
        setCustomers(response.data);
        setTotalCustomers(response.data.length);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchData();
  }, [customers]);
  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <CardBox total={totalCustomers} title={"Customers"} />
        <CustomerService />
      </div>
    </div>
  );
};

export default Customer;
