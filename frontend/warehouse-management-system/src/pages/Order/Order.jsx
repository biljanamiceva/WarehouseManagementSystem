import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import CardBox from "../../components/CardBox/CardBox";
import OrderService from "../../service/OrderService/OrderService";

const Order = ({ isActive, toggleSidebar, title }) => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };
  const handleOrdersChange = (value) => {
    console.log(value);
    console.log(value.length);
    setTotalOrders(value.length);
  }

  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar}  handleSearchInputChange={handleSearchInputChange}/>
        <CardBox total={totalOrders} title={"Orders"} />
        <OrderService  searchInput={searchInput}
          handleSearchInputChange={handleSearchInputChange}
          handleOrdersChange={handleOrdersChange}/>
      </div>
    </div>
  );
};

export default Order;
