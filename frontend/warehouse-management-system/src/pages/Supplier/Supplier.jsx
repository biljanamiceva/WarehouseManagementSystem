import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import SupplierService from "../../service/SupplierService/SupplierService";
import CardBox from "../../components/CardBox/CardBox";
import axios from "axios";

const Supplier = ({ isActive, toggleSidebar}) => {
  const [searchInput, setSearchInput] = useState("");
  const [totalSuppliers, setTotalSuppliers] = useState(0);

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };

  const handleSupliersChange = (value) => {
    console.log(value);
    console.log(value.length);
    setTotalSuppliers(value.length);
  }
  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar
          toggleSidebar={toggleSidebar}
          handleSearchInputChange={handleSearchInputChange}
        />
        <CardBox total={totalSuppliers} title={"Suppliers"} />
        <SupplierService
          searchInput={searchInput}
          handleSearchInputChange={handleSearchInputChange}
          handleSupliersChange={handleSupliersChange}
        />
      </div>
    </div>
  );
};

export default Supplier;
