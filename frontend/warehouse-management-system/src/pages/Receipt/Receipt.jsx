import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import CardBox from "../../components/CardBox/CardBox";
import ReceiptService from "../../service/ReceiptService/ReceiptService";
import axios from "axios";

const Receipt = ({ isActive, toggleSidebar, title }) => {
  const [totalReceipts, setTotalReceipts] = useState(0);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7076/api/Receipt");
        setReceipts(response.data);
        setTotalReceipts(response.data.length);
      } catch (error) {
        console.error("Error fetching receipts:", error);
      }
    };

    fetchData();
  }, [receipts]);
  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <CardBox total={totalReceipts} title={"Receipts"} />
        <ReceiptService />
      </div>
    </div>
  );
};

export default Receipt;
