import React from "react";
import "./CardBox.css";
import { IoStatsChartOutline } from "react-icons/io5";
const CardBox = () => {
  return (
    <div className="cardBox">
      <div className="card">
        <div>
        <div className="numbers">444</div>
        <div className="cardName">Total Suppliers</div>
        </div>
        <div className="iconBox">
          <IoStatsChartOutline className="cardIcon"/>
        </div>
      </div>
      <div className="card">
        <div>
        <div className="numbers">444</div>
        <div className="cardName">Total Suppliers</div>
        </div>
        <div className="iconBox">
          <IoStatsChartOutline className="cardIcon" />
        </div>
      </div>

      <div className="card">
        <div>
        <div className="numbers">444</div>
        <div className="cardName">Total Suppliers</div>
        </div>
        <div className="iconBox">
          <IoStatsChartOutline className="cardIcon" />
        </div>
      </div>

      <div className="card">
        <div>
        <div className="numbers">444</div>
        <div className="cardName">Total Suppliers</div>
        </div>
        <div className="iconBox">
          <IoStatsChartOutline className="cardIcon"/>
        </div>
      </div>


      
    </div>
  );
};

export default CardBox;
