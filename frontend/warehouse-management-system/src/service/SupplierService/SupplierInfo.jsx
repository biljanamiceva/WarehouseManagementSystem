import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import SummaryBoxes from "../../components/SummaryBoxes/SummaryBoxes";
import { ReceiptStatus } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const accessToken = localStorage.getItem("accessToken");
  const fetchData = () => {
    axios
      .get(`https://localhost:7076/api/supplier/${supplierId}/receipts`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
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
          receiptStatus: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
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
        fetchData();
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
          title={"Receipts"}
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
                        <td>{receipt.amount} MKD</td>
                        <td>
                          <span
                            className={`status ${
                              receipt.receiptStatus === ReceiptStatus.Paid
                                ? "paid"
                                : receipt.receiptStatus ===
                                  ReceiptStatus.NotPaid
                                ? "not-paid"
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierInfo;
