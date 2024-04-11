import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import CardBox from "../../components/CardBox/CardBox";
import InvoiceService from "../../service/InvoiceService/InvoiceService";
import axios from "axios";

const Invoice = ({ isActive, toggleSidebar }) => {
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };

  const handleInvoicesChange = (value) => {
    console.log(value);
    console.log(value.length);
    setTotalInvoices(value.length);
  }

  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar}    handleSearchInputChange={handleSearchInputChange}/>
        <CardBox total={totalInvoices} title={"Invoices"} />
        <InvoiceService
        searchInput={searchInput}
        handleSearchInputChange={handleSearchInputChange}
        handleInvoicesChange={handleInvoicesChange} />
      </div>
    </div>
  );
};

export default Invoice;
