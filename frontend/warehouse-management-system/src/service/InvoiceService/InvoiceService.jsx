import React, { useState, useEffect } from "react";
import { InvoiceStatus } from "../../constants";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine, RiDownload2Line } from "react-icons/ri";
import axios from "axios";

const InvoiceService = ({ searchInput, handleInvoicesChange }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Define showDeleteModal state

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    handleInvoicesChange(invoices);
  }, [invoices]);

  useEffect(() => {
    filterData();
  }, [searchInput, invoices]);

  const filterData = () => {
    const lowerCaseSearch = searchInput.toLowerCase();

    if (searchInput.trim() === "") {
      setFilteredData(invoices);
    } else {
      const filtered = invoices.filter(
        (invoice) =>
          invoice.companyName.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredData(filtered);
    }
  };

  const accessToken = localStorage.getItem("accessToken");

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Invoice", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setInvoices(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const mapInvoiceStatusToString = (invoiceStatus) => {
    switch (invoiceStatus) {
      case InvoiceStatus.Paid:
        return "Paid";
      case InvoiceStatus.NotPaid:
        return "Not Paid";
      default:
        return "Unknown Type";
    }
  };

  const handleDelete = (invoiceId) => {
    setShowDeleteModal(true);
    setSelectedInvoiceId(invoiceId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/Invoice/${selectedInvoiceId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setInvoices((prevData) =>
          prevData.filter((invoice) => invoice.invoiceId !== selectedInvoiceId)
        );

        setShowDeleteModal(false);
        setSelectedInvoiceId(null);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setShowDeleteModal(false);
        setSelectedInvoiceId(null);
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedInvoiceId(null);
  };

  const toggleAccordion = (invoiceId) => {
    setSelectedInvoice((prevInvoice) =>
      prevInvoice && prevInvoice.invoiceId === invoiceId ? null : invoices.find((invoice) => invoice.invoiceId === invoiceId)
    );
  };

  const generateInvoice = (id) => {
    axios
      .post(`https://localhost:7076/api/invoice/generate-invoice?id=${id}`, null, {
        headers: { Authorization: `Bearer ${accessToken}` },
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Invoice.pdf");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error("Error generating invoice:", error);
      });
  };

  return (
    <div className="table_details">
      <div className="allData">
        <div className="cardHeader">
          <h2>All Invoices</h2>
          <Link to="/addInvoice" className="btn">
            Add Invoice
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td onClick={() => filterData()}>Customer name</td>
                <td>Payment Due Date</td>
                <td>Total Amount</td>
                <td>Status</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((invoice, index) => (
                <React.Fragment key={invoice.invoiceId}>
                  <tr>
                    <td>{index + 1}</td>
                    <td onClick={() => toggleAccordion(invoice.invoiceId)}>{invoice.companyName}</td>
                    <td>
                      {new Date(invoice.paymentDueDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td>{invoice.totalAmount} MKD</td>
                    <td>
                      <span
                        className={`status ${
                          invoice.invoiceStatus === InvoiceStatus.Paid
                            ? "paid"
                            : invoice.invoiceStatus === InvoiceStatus.NotPaid
                            ? "not-paid"
                            : ""
                        }`}
                      >
                        {mapInvoiceStatusToString(invoice.invoiceStatus)}
                      </span>
                    </td>
                    <td>
                      <Link to={`/editInvoice/${invoice.invoiceId}`}>
                        <BiSolidEdit className="app_actionBtn" />
                      </Link>
                      |
                      <RiDeleteBinLine
                        className="app_actionBtn"
                        onClick={() => handleDelete(invoice.invoiceId)}
                      />
                      |
                      <RiDownload2Line  className="app_actionBtn" onClick={() => generateInvoice(invoice.invoiceId)} />
                      {/* <button onClick={() => generateInvoice(invoice.invoiceId)}>Download</button> */}
                    </td>
                  </tr>
                  {selectedInvoice && selectedInvoice.invoiceId === invoice.invoiceId && (
                    <tr className="accordion">
                      <td colSpan="6">
                        <div style={{ textAlign: "start", marginLeft: "50px" }}>
                          <h4>Invoice Details</h4>
                          <ul>
                            {selectedInvoice.invoiceOrderProductsI.map((orderProduct, index) => (
                              <li key={index} style={{listStyle: "none"}}>
                                {orderProduct.productName},  {orderProduct.productPrice} MKD ({orderProduct.productQuantity} kg)
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this invoice?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceService;
