import React from "react";
import "./SummaryBoxes.css";
import { BiEuro } from "react-icons/bi";
const SummaryBoxes = ({ boxOne, boxTwo, notPaidAmount,  boxThree, boxFour }) => {
  return (
    <div className="frameBox">
      <div className="cardBoxes">
        <div className="card1">
          <div>
            <div className="numbers">{boxOne}</div>
            <div className="cardName">Total receipts</div>
          </div>

          <div className="iconBx"></div>
        </div>

        <div className="card2">
          <div>
            <div className="numbers">{boxTwo} ({notPaidAmount}  €)</div>
            <div className="cardName">Not Paid</div>
          </div>

          <div className="iconBx"></div>
        </div>

        <div className="card3">
          <div>
            <div className="numbers">{boxThree}  kg</div>
            <div className="cardName">Total Quantity</div>
          </div>

          <div className="iconBx"></div>
        </div>

        <div className="card4">
          <div>
            <div className="numbers">{boxFour}  €</div>
            <div className="cardName">Total Amount</div>
          </div>

          <div className="iconBx"></div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBoxes;
