import React from "react";
import { useState, useEffect } from "react";
import CustomerService from "../../service/CustomerService/CustomerService";
import Sidebar from "../../components/Slidebar/Sidebar";
import CardBox from "../../components/CardBox/CardBox";
import Navbar from "../../components/Navbar/Navbar";
import Users from "./Users";

const Employees = ({ isActive, toggleSidebar, title }) => {
  const [totalEmployees, settotalEmployees] = useState(0);



  const [activeLink, setActiveLink] = useState("employees");

  useEffect(() => {
    setActiveLink("employees"); 
  }, []);

  const handleEmployeesChange = (value) => {
    console.log(value);
    console.log(value.length);
    settotalEmployees(value.length);
  }
  return (
    <div className="container">
      <Sidebar isActive={isActive} activeLink={activeLink} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} 
         />
        <CardBox total={totalEmployees} title={"Employees"} />
     <Users   handleEmployeesChange={handleEmployeesChange} />
      </div>
    </div>
  );
};

export default Employees;
