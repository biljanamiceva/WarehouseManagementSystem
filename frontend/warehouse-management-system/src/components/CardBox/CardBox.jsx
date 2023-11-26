import React from "react";
import "./CardBox.css";
import { IoStatsChartOutline } from "react-icons/io5";

const CardBox = ({ total, title }) => {
  return (
    <div className="cardBox">
      <div className="card">
        <div>
          <div className="numbers">{total}</div>
          <div className="cardName">Total {title}</div>
        </div>
        <div className="iconBox">
          <IoStatsChartOutline className="cardIcon" />
        </div>
      </div>
    </div>
  );
};

export default CardBox;
