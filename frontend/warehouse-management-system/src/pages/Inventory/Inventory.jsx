import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import CardBox from "../../components/CardBox/CardBox";
import ProductService from "../../service/ProductService/ProductService";

const Inventory = ({ isActive, toggleSidebar, title }) => {
  const [searchInput, setSearchInput] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);


  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };

  const handleProductsChange = (value) => {
    console.log(value);
    console.log(value.length);
    setTotalProducts(value.length);
  }
  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar}    handleSearchInputChange={handleSearchInputChange}/>
        <CardBox total={totalProducts} title={"Products"} />
        <ProductService   
          searchInput={searchInput}
          handleSearchInputChange={handleSearchInputChange} 
          handleProductsChange={handleProductsChange} />
        
      </div>
    </div>
  );
};

export default Inventory;
