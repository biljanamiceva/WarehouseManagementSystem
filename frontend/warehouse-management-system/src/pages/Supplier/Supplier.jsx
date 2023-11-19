import React from "react";
import "./Supplier.css"
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import SupplierService from "../../service/SupplierService/SupplierService"
import CardBox from "../../components/CardBox/CardBox";

const Supplier = ({ isActive, toggleSidebar }) => {
    
  return (
   <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? 'active' : ''}`}>
      <Navbar toggleSidebar={toggleSidebar} />
      <CardBox />
      <SupplierService />
      </div>
     
    </div>
  );
};

export default Supplier;
