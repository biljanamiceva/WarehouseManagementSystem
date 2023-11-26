import React, { useEffect, useState } from "react";
import Sidebar from '../../components/Slidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import CardBox from '../../components/CardBox/CardBox'
import ProductService from '../../service/ProductService/ProductService'

import axios from "axios";

const Inventory = ({ isActive, toggleSidebar, title }) => {

  const [totalProducts, setTotalProducts] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("https://localhost:7076/api/Product");
        setProducts(response.data);
        setTotalProducts(response.data.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [products]);
  return (
    <div className="container">
    <Sidebar isActive={isActive} />
    <div className={`main ${isActive ? "active" : ""}`}>
      <Navbar toggleSidebar={toggleSidebar} />
      <CardBox total={totalProducts} title={"Products"} />
     <ProductService />
    </div>
  </div>
  )
}

export default Inventory
