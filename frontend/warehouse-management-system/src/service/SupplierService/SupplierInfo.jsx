import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { ReceiptStatus } from "../../constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SummaryBoxes from "../../components/SummaryBoxes/SummaryBoxes";

const SupplierInfo = ({ isActive, toggleSidebar }) => {
  const [supplier, setSupplier] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { supplierId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://localhost:7076/api/supplier/${supplierId}/receipts`)
      .then((response) => {
        console.log("Supplier API Response:", response.data);
        setSupplier(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching supplier:", error);
        setLoading(false);
      });
  };
  const mapReceiptStatusToString = (receiptStatus) => {
    switch (receiptStatus) {
      case 1:
      case "Paid":
        return "Paid";
      case 2:
      case "NotPaid":
        return "Not Paid";
      case 3:
      case "Cancelled":
        return "Cancelled";
      case 4:
      case "Overdue":
        return "Overdue";
      default:
        return "Unknown Type";
    }
  };

  const handleBack = () => {
    navigate("/supplier");
  };

  const handleChangeStatus = (newStatus) => {
    console.log("New Status:", newStatus);

    axios
      .put(
        `https://localhost:7076/api/receipt/${selectedReceipt.receiptId}/markAs`,
        {
          receiptStatus: newStatus, // Use 'receiptStatus' instead of 'newStatus'
        }
      )
      .then((response) => {
        console.log("Success response:", response);
        const updatedReceipt = {
          ...selectedReceipt,
          receiptStatus: newStatus,
        };

        setSupplier((prevSupplier) => {
          const updatedReceipts = (
            prevSupplier.responseSingleSupplierReceipts || []
          ).map((receipt) =>
            receipt.receiptId === selectedReceipt.receiptId
              ? updatedReceipt
              : receipt
          );

          return {
            ...prevSupplier,
            responseSingleSupplierReceipts: updatedReceipts,
          };
        });
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error changing status:", error);
        setShowModal(false);
      });
  };

  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <SummaryBoxes
          boxOne={supplier.totalReceipts}
          boxTwo={supplier.notPaidReceipts}
          notPaidAmount={supplier.totalNotPaidAmount}
          boxThree={supplier.totalQuantity}
          boxFour={supplier.toatlAmount}
        />
        <div className="table_details">
          <div className="allData">
            <div className="cardHeader">
              <h2>Receipts for {supplier.supplierFullName}</h2>
              <div onClick={handleBack} className="btnBack">
                Back
              </div>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Product</td>
                    <td>Date</td>
                    <td>Quantity</td>
                    <td>Amount</td>
                    <td>Payment</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {(supplier.responseSingleSupplierReceipts || []).map(
                    (receipt, index) => (
                      <tr key={receipt.receiptId}>
                        <td>{index + 1}</td>
                        <td>{receipt.productName}</td>
                        <td>
                          {new Date(receipt.receiptDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>{receipt.quantity} kg</td>
                        <td>{receipt.amount} €</td>
                        <td>
                          <span
                            className={`status ${
                              receipt.receiptStatus === ReceiptStatus.Paid
                                ? "paid"
                                : receipt.receiptStatus ===
                                  ReceiptStatus.NotPaid
                                ? "not-paid"
                                : receipt.receiptStatus ===
                                  ReceiptStatus.Cancelled
                                ? "cancelled"
                                : receipt.receiptStatus ===
                                  ReceiptStatus.Overdue
                                ? "overdue"
                                : ""
                            }`}
                          >
                            {mapReceiptStatusToString(receipt.receiptStatus)}
                          </span>
                        </td>
                        <td>
                          <button
                            className="changeBtn"
                            onClick={() => {
                              setSelectedReceipt(receipt);
                              setShowModal(true);
                            }}
                          >
                            Change Status
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>Change receipt status for {selectedReceipt.productName}</p>
              <button onClick={() => handleChangeStatus(ReceiptStatus.Paid)}>
                Mark as Paid
              </button>
              <button onClick={() => handleChangeStatus(ReceiptStatus.NotPaid)}>
                Mark as Not Paid
              </button>
              <button
                onClick={() => handleChangeStatus(ReceiptStatus.Cancelled)}
              >
                Mark as Cancelled
              </button>
              <button onClick={() => handleChangeStatus(ReceiptStatus.Overdue)}>
                Mark as Overdue
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierInfo;
