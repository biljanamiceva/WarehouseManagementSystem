import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const EditInvoice = ({ isActive, toggleSidebar }) => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    paymentDueDate: "",
    totalAmount: "",
    invoiceStatus: "",
    customerId: "",
  });
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState([]);

  const invoiceData = {
    ...invoice,
    invoiceStatus: parseInt(invoice.invoiceStatus, 12),
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Customer");
      setCustomer(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    if (invoiceId) {
      axios
        .get(`https://localhost:7076/api/Invoice/${invoiceId}`)
        .then((response) => {
          setInvoice(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching invoice data:", error);
          setLoading(false);
        });
    } else {
      console.error("Invalid or undefined id parameter.");
      setLoading(false);
    }
  }, [invoiceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({
      ...invoice,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://localhost:7076/api/Invoice/${invoiceId}`, invoiceData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/invoice");
      })
      .catch((error) => {
        console.error("Error updating invoice:", error);
      });
  };

  const handleBack = () => {
    navigate("/invoice");
  };

  const formatDate = (date) => {
    // Extract only the date part without the time
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="add-container">
          <div className="addHeader">
            <h2>Edit Invoice</h2>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form className="add-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Payment Due Date </label>
                <input
                  type="date"
                  name="paymentDueDate"
                  value={formatDate(invoice.paymentDueDate)}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Total Amount</label>
                <input
                  name="totalAmount"
                  value={invoice.totalAmount}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Company name</label>
                <select
                  name="customerId"
                  value={invoice.customerId}
                  onChange={handleChange}
                >
                  <option value="">Select a customer</option>
                  {customer.map((customer) => (
                    <option
                      key={customer.customerId}
                      value={customer.customerId}
                    >
                      {customer.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Invoice Status</label>
                <select
                  name="invoiceStatus"
                  value={invoice.invoiceStatus}
                  onChange={handleChange}
                >
                  <option>Select status</option>
                  <option value="1">Paid</option>
                  <option value="2">Not Paid</option>
                  <option value="3">Cancelled</option>
                  <option value="4">Overdue</option>
                </select>
              </div>

              <div className="addActions">
                <button className="addBtn" type="submit">
                  Edit Invoice
                </button>
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditInvoice;
