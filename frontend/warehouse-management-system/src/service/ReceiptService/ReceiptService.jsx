import React, { useState, useEffect } from "react";
import { ReceiptStatus } from "../../constants";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import {
  RiDeleteBinLine,
  RiDownload2Line,
  RiDownloadCloud2Line,
} from "react-icons/ri";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
const stripePromise = loadStripe(
  "pk_test_51P4UHaK3FUrzM0bh0DTq0DSsXh93c6hyuwn8ENv9bsBUXpmFx6HZQiFbq3HLC3teLDaM0vJn940AnPLWBT5TwiRU00PSPF5OI3"
);
const ReceiptService = ({ searchInput, handleReceiptsChange }) => {
  const [receipts, setReceipts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [selectedSupplierName, setSelectedSupplierName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchReceipts();
  }, [receipts]);

  useEffect(() => {
    filterData();
  }, [searchInput, receipts, selectedDate]);

  useEffect(() => {
    handleReceiptsChange(receipts);
  }, [receipts]);

  

  const filterData = () => {
    const lowerCaseSearch = searchInput.toLowerCase();

    if (searchInput.trim() === "") {
      let filtered = receipts;
      if (selectedDate) {
        filtered = filtered.filter((receipt) => {
          const receiptDate = new Date(receipt.receiptDate).toLocaleDateString(
            "en-GB"
          );
          return receiptDate === selectedDate.toLocaleDateString("en-GB");
        });
      }
      setFilteredData(filtered);
    } else {
      const filtered = receipts.filter(
        (receipt) =>
          receipt.supplierName.toLowerCase().includes(lowerCaseSearch) ||
          mapReceiptStatusToString(receipt.receiptStatus)
            .toLowerCase()
            .includes(lowerCaseSearch)
      );
      setFilteredData(filtered);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.valueAsDate;
    setSelectedDate(date);
  };
  const accessToken = localStorage.getItem("accessToken");
  const fetchReceipts = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Receipt", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
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

  const handleDelete = (receiptId, supplierName) => {
    setSelectedSupplierName(supplierName);
    setShowDeleteModal(true);
    setSelectedReceiptId(receiptId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/Receipt/${selectedReceiptId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setReceipts((prevData) =>
          prevData.filter((receipt) => receipt.receiptId !== selectedReceiptId)
        );
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter(
            (receipt) => receipt.receiptId !== selectedReceiptId
          )
        );
        setSelectedSupplierName("");
        setShowDeleteModal(false);
        setSelectedReceiptId(null);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setShowDeleteModal(false);
        setSelectedReceiptId(null);
        setSelectedSupplierName("");
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedReceiptId(null);
    setSelectedSupplierName("");
  };

  const generateReceipt = (id) => {
    axios
      .post(
        `https://localhost:7076/api/receipt/generate-receipt?id=${id}`,
        null,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          responseType: "blob",
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Receipt.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error generating receipt:", error);
      });
  };

  return (
    <div className="table_details">
      <div className="allData">
        <div className="cardHeader">
          <h2>All Receipts</h2>
          <div className="filterContainer">
            {/* <label htmlFor="dateFilter">Select Date:</label> */}
            <input
              type="date"
              id="dateFilter"
              name="dateFilter"
              onChange={handleDateChange}
            />
          </div>
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
                <td>Price</td>
                <td>Amount</td>
                <td>Status</td>
                <td>Actions</td>
                <td>Payment</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((receipt, index) => (
                <tr key={receipt.receiptId}>
                  <td>{index + 1}</td>
                  <td>{receipt.supplierName}</td>
                  <td>
                    {new Date(receipt.receiptDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>{receipt.productName}</td>
                  <td>{receipt.quantity} kg</td>
                  <td>{receipt.productPrice} MKD</td>
                  <td>{receipt.amount} MKD</td>
                  <td>
                    <span
                      className={`status ${
                        receipt.receiptStatus === ReceiptStatus.Paid
                          ? "paid"
                          : receipt.receiptStatus === ReceiptStatus.NotPaid
                          ? "not-paid"
                          : ""
                      }`}
                    >
                      {mapReceiptStatusToString(receipt.receiptStatus)}
                    </span>
                  </td>
                  <td style={{ display: "flex", justifyContent: "start" }}>
                    <Link to={`/editReceipt/${receipt.receiptId}`}>
                      <BiSolidEdit className="app_actionBtn" />
                    </Link>
                    |
                    <RiDeleteBinLine
                      className="app_actionBtn"
                      onClick={() =>
                        handleDelete(receipt.receiptId, receipt.supplierName)
                      }
                    />
                    |
                    <RiDownloadCloud2Line
                      className="app_actionBtn"
                      onClick={() => generateReceipt(receipt.receiptId)}
                    />
                   
                  </td>
                  <td> {receipt.receiptStatus === ReceiptStatus.NotPaid && (
                      <Payment
                        amount={receipt.amount}
                        supplierName={receipt.supplierName}
                        currency="MKD"
                        receiptId={receipt.receiptId}
                        selectedReceiptId={selectedReceiptId}
                      />
                    )}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>
              Are you sure you want to delete receipt for{" "}
              <strong>{selectedSupplierName}</strong>?
            </p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptService;
