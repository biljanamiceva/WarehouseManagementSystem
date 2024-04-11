import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import CardBox from "../../components/CardBox/CardBox";
import ReceiptService from "../../service/ReceiptService/ReceiptService";
import axios from "axios";

const Receipt = ({ isActive, toggleSidebar, title }) => {
  const [totalReceipts, setTotalReceipts] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  
  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };
  const handleReceiptsChange = (value) => {
    console.log(value);
    console.log(value.length);
    setTotalReceipts(value.length);
  }

  const [activeLink, setActiveLink] = useState("customer");

  useEffect(() => {
    setActiveLink("receipt"); 
  }, []);

  return (
    <div className="container">
        <Sidebar isActive={isActive} activeLink={activeLink} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar}  handleSearchInputChange={handleSearchInputChange} />
        <CardBox total={totalReceipts} title={"Receipts"} />
        <ReceiptService   searchInput={searchInput}
          handleSearchInputChange={handleSearchInputChange}
          handleReceiptsChange={handleReceiptsChange}/>
      </div>
    </div>
  );
};

export default Receipt;
