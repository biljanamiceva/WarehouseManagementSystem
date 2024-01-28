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
  const navigate = useNavigate();
  const { supplierId } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://localhost:7076/api/supplier/${supplierId}/receipts`)
      .then((response) => {
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
      case ReceiptStatus.Paid:
        return "Paid";
      case ReceiptStatus.NotPaid:
        return "Not Paid";
      default:
        return "Unknown Type";
    }
  };
  const handleBack = () => {
    navigate("/supplier");
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
                    <td>Status</td>
                  </tr>
                </thead>
                <tbody>
                  {supplier.responseSingleSupplierReceipts.map(
                    (receipt, index) => (
                      <tr key={receipt.receiptId}>
                        <td>{index + 1}</td>
                        <td>{receipt.productName}</td>
                        <td>
                          {new Date(receipt.receiptDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </td>
                        <td>{receipt.quantity}  kg</td>
                        <td>{receipt.amount}  €</td>
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
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInfo;
