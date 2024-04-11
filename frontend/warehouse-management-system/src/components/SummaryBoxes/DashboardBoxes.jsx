import React from "react";
import "./SummaryBoxes.css";
import { BiEuro } from "react-icons/bi";
const DashboardBoxes = ({ boxOne, boxTwo, boxThree, boxFour }) => {
  return (
    <div className="frameBox">
      <div className="summarybox">
        <h2 className="summaryHeader">Summary report</h2>
        <div className="cardBoxes">
          <div className="card1">
            <div>
              <div className="numbers">{boxOne}</div>
              <div className="cardName">Total Customers</div>
            </div>

            <div className="iconBx"></div>
          </div>

          <div className="card2">
            <div>
              <div className="numbers">{boxTwo} </div>
              <div className="cardName">Total Suppliers</div>
            </div>

            <div className="iconBx"></div>
          </div>

          <div className="card3">
            <div>
              <div className="numbers">{boxThree}</div>
              <div className="cardName">Total Orders</div>
            </div>

            <div className="iconBx"></div>
          </div>

          <div className="card4">
            <div>
              <div className="numbers">{boxFour} </div>
              <div className="cardName">Total Products</div>
            </div>

            <div className="iconBx"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBoxes;
