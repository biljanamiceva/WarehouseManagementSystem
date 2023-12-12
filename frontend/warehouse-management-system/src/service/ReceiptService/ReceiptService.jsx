import React, { useState, useEffect } from "react";
import { ReceiptStatus } from "../../constants";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";

const ReceiptService = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Receipt");
      setReceipts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching receipts:", error);
    }
  };
  const mapReceiptStatusToString = (receiptStatus) => {
    switch (receiptStatus) {
      case ReceiptStatus.Paid:
        return "Paid";
      case ReceiptStatus.NotPaid:
        return "Not Paid";
      default:
        return "Unknown Type";
    }
  };

  return (
    <div className="table_details">
      <div className="allData">
        <div className="cardHeader">
          <h2>All Receipts</h2>
          <Link to="/addReceipt" className="btn">
            Add Receipt
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>#</td>
                <th>Supplier Name</th>
                <th>Date</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt, index) => (
                <tr key={receipt.receiptId}>
                  <td>{index + 1}</td>
                  <td>{receipt.supplierName}</td>
                  <td>
                    {new Date(receipt.receiptDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>{receipt.productName}</td>
                  <td>{receipt.quantity}</td>
                  <td>{receipt.amount}</td>
                  <td>{mapReceiptStatusToString(receipt.receiptStatus)}</td>
                  <td>
                    <BiSolidEdit className="app_actionBtn" />
                    |
                    <RiDeleteBinLine className="app_actionBtn" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReceiptService;
