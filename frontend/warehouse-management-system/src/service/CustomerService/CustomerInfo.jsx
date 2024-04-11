import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import SummaryBoxes from "../../components/SummaryBoxes/SummaryBoxes";
import { InvoiceStatus } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const CustomerInfo = ({ isActive, toggleSidebar }) => {
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [accordionId, setAccordionId] = useState(null);
  const navigate = useNavigate();
  const { customerId } = useParams();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://localhost:7076/api/customer/${customerId}/invoices`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log("Customer API Response:", response.data);
        setCustomer(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer:", error);
        setLoading(false);
      });
  };

  const mapInvoiceStatusToString = (invoiceStatus) => {
    switch (invoiceStatus) {
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

  const handleAccordionToggle = (invoiceId) => {
    setAccordionId((prevState) => (prevState === invoiceId ? null : invoiceId));
  };

  const handleChangeStatus = (newStatus) => {
    console.log("New Status:", newStatus);

    axios
      .put(
        `https://localhost:7076/api/invoice/${selectedInvoice.invoiceId}/markAs`,
        {
          invoiceStatus: newStatus, // Use 'invoiceStatus' instead of 'newStatus'
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log("Success response:", response);
        const updatedInvoice = {
          ...selectedInvoice,
          invoiceStatus: newStatus,
        };

        setCustomer((prevCustomer) => {
          const updatedInvoices = (
            prevCustomer.responseSingleCustomerInvoices || []
          ).map((invoice) =>
            invoice.invoiceId === selectedInvoice.invoiceId
              ? updatedInvoice
              : invoice
          );

          return {
            ...prevCustomer,
            responseSingleCustomerInvoices: updatedInvoices,
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

  const handleBack = () => {
    navigate("/customer");
  };

  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <SummaryBoxes
          boxOne={customer.totalInvoices}
          boxTwo={customer.notPaidInvoices}
          notPaidAmount={customer.totalNotPaidAmountInvoice}
          boxFour={customer.amountSum}
          title={"Invoices"}
        />
        <div className="table_details">
          <div className="allData">
            <div className="cardHeader">
              <h2>Invoices for {customer.companyName}</h2>
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
                    <td onClick={() => handleAccordionToggle("date")}>Date</td>
                    <td>Amount</td>
                    <td>Status</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {(customer.responseSingleCustomerInvoices || []).map(
                    (invoice, index) => (
                      <React.Fragment key={invoice.invoiceId}>
                        <tr>
                          <td>{index + 1}</td>
                          <td onClick={() => handleAccordionToggle(invoice.invoiceId)}>
                            {new Date(
                              invoice.paymentDueDate
                            ).toLocaleDateString("en-GB")}
                          </td>
                          <td  onClick={() => handleAccordionToggle(invoice.invoiceId)}>{invoice.totalAmount} MKD</td>
                          <td>
                            <span
                              className={`status ${
                                invoice.invoiceStatus === InvoiceStatus.Paid
                                  ? "paid"
                                  : invoice.invoiceStatus ===
                                    InvoiceStatus.NotPaid
                                  ? "not-paid"
                                  : ""
                              }`}
                            >
                              {mapInvoiceStatusToString(invoice.invoiceStatus)}
                            </span>
                          </td>
                          <td>
                            <button
                              className="changeBtn"
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                setShowModal(true);
                              }}
                            >
                              Change Status
                            </button>
                          </td>
                        </tr>
                        {accordionId === invoice.invoiceId && (
                          <tr className="accordion">
                            <td colSpan="6">
                              <div style={{ textAlign: "start", marginLeft: "85px" }}>
                                <h4>Order Details</h4>
                                <ul>
                                  {invoice.invoiceOrderProducts.map((product, productIndex) => (
                                    <li key={`${invoice.invoiceId}-product-${productIndex}`} style={{listStyle: "none"}}>
                                      {product.productName} - {product.productPrice} MKD
                                       ({product.productQuantity} kg) 
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
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
              <p>Change Invoice status</p>
              <button onClick={() => handleChangeStatus(InvoiceStatus.Paid)}>
                Mark as Paid
              </button>
              <button onClick={() => handleChangeStatus(InvoiceStatus.NotPaid)}>
                Mark as Not Paid
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInfo;
