import React, { useState, useEffect } from "react";
import { ReceiptStatus } from "../../constants";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";

const ReceiptService = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
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

  const handleDelete = (receiptId) => {
    setShowDeleteModal(true);
    setSelectedReceiptId(receiptId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/Receipt/${selectedReceiptId}`)
      .then(() => {
        setReceipts((prevData) =>
          prevData.filter((receipt) => receipt.receiptId !== selectedReceiptId)
        );

        setShowDeleteModal(false);
        setSelectedReceiptId(null);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setShowDeleteModal(false);
        setSelectedReceiptId(null);
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedReceiptId(null);
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
                <td>Supplier Name</td>
                <td>Date</td>
                <td>Product</td>
                <td>Quantity</td>
                <td>Amount</td>
                <td>Status</td>
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
                  <Link to={`/editReceipt/${receipt.receiptId}`}>
                    <BiSolidEdit className="app_actionBtn" />
                    </Link>
                    |
                    <RiDeleteBinLine
                      className="app_actionBtn"
                      onClick={() => handleDelete(receipt.receiptId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this receipt?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptService;
