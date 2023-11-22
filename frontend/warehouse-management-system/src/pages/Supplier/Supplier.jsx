import React from "react";
import "./Supplier.css"
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import SupplierService from "../../service/SupplierService/SupplierService"
import CardBox from "../../components/CardBox/CardBox";
import { useState } from "react";

const Supplier = ({ isActive, toggleSidebar }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };
  return (
   <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? 'active' : ''}`}>
      <Navbar
          toggleSidebar={toggleSidebar}
          handleSearchInputChange={handleSearchInputChange}
        />
        <CardBox />
        <SupplierService
          searchInput={searchInput}
          handleSearchInputChange={handleSearchInputChange}
        />
      </div>
     
    </div>
  );
};

export default Supplier;
