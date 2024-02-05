import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import CardBox from "../../components/CardBox/CardBox";
import InvoiceService from "../../service/InvoiceService/InvoiceService";
import axios from "axios";

const Invoice = ({ isActive, toggleSidebar}) => {
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7076/api/Invoice");
        setInvoices(response.data);
        setTotalInvoices(response.data.length);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchData();
  }, [invoices]);
  
  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <CardBox total={totalInvoices} title={"Invoices"} />
        <InvoiceService />
      </div>
    </div>
  );
};

export default Invoice;
