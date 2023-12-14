import React, { useState, useEffect } from "react";
import { InvoiceStatus } from "../../constants";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";

const InvoiceService = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Invoice");
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
      .delete(`https://localhost:7076/api/Invoice/${selectedInvoiceId}`)
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
                <td>Company name</td>
                <td>Payment Due Date</td>
                <td>Total Amount</td>
                <td>Status</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={invoice.invoiceId}>
                  <td>{index + 1}</td>
                  <td>{invoice.companyName}</td>
                  <td>
                    {new Date(invoice.paymentDueDate).toLocaleDateString("en-GB")}
                  </td>
                  <td>{invoice.totalAmount}</td>
                  <td>{mapInvoiceStatusToString(invoice.invoiceStatus)}</td>
                  <td>
                  <Link to={`/editInvoice/${invoice.invoiceId}`}>
                    <BiSolidEdit className="app_actionBtn" />
                    </Link>
                    |
                    <RiDeleteBinLine
                      className="app_actionBtn"
                      onClick={() => handleDelete(invoice.invoiceId)}
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
