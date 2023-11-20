import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CardBox.css";
import { IoStatsChartOutline } from "react-icons/io5";
const CardBox = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [totalSuppliers, setTotalSuppliers] = useState(0);

  useEffect(() => {
    // Fetch the list of suppliers and update the count
    axios
      .get("https://localhost:7076/api/Supplier")
      .then((response) => {
        setSuppliers(response.data);
        setTotalSuppliers(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      });
  }, []);

  return (
    <div className="cardBox">
      <div className="card">
        <div>
          <div className="numbers">{totalSuppliers}</div>
          <div className="cardName">Total Suppliers</div>
        </div>
        <div className="iconBox">
          <IoStatsChartOutline className="cardIcon" />
        </div>
      </div>
    </div>
  );
};

export default CardBox;
