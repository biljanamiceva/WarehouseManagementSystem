import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import SupplierService from "../../service/SupplierService/SupplierService";
import CardBox from "../../components/CardBox/CardBox";
import axios from "axios";

const Supplier = ({ isActive, toggleSidebar, title }) => {
  const [searchInput, setSearchInput] = useState("");
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [suppliers, setSuppliers] = useState([]);

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7076/api/Supplier");
        setSuppliers(response.data);
        setTotalSuppliers(response.data.length);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchData();
  }, [suppliers]);

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
        />
      </div>
    </div>
  );
};

export default Supplier;
