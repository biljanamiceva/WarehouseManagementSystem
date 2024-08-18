import React from "react";
import { useState, useEffect } from "react";
import CustomerService from "../../service/CustomerService/CustomerService";
import Sidebar from "../../components/Slidebar/Sidebar";
import CardBox from "../../components/CardBox/CardBox";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const Customer = ({ isActive, toggleSidebar, title }) => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };

  const [activeLink, setActiveLink] = useState("customer");

  useEffect(() => {
    setActiveLink("customer");
  }, []);
  
  const handleCustomersChange = (value) => {
    console.log(value);
    console.log(value.length);
    setTotalCustomers(value.length);
  }
  return (
    <div className="container">
      <Sidebar isActive={isActive} activeLink={activeLink} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar}  handleSearchInputChange={handleSearchInputChange}/>
        <CardBox total={totalCustomers} title={"Customers"} />
        <CustomerService searchInput={searchInput}
          handleSearchInputChange={handleSearchInputChange}
          handleCustomersChange={handleCustomersChange} />
      </div>
    </div>
  );
};

export default Customer;
