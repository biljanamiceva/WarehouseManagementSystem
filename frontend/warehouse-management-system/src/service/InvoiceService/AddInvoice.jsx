import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const AddInvoice = ({ isActive, toggleSidebar }) => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState({
    paymentDueDate: "",
    totalAmount: "",
    invoiceStatus: "",
    customerId: "",
  });
  const [errors, setErrors] = useState({});
  const [customer, setCustomer] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({
      ...invoice,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const invoiceData = {
    ...invoice,
    invoiceStatus: parseInt(invoice.invoiceStatus, 12),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7076/api/Invoice", invoiceData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        setInvoice({
          ...invoice,
          invoiceStatus: response.data.invoiceStatus,
        });
        console.log("Invoice:", invoice);
      })
      .then(() => {
        navigate("/invoice");
      })
      .catch((error) => {
        console.error("Error adding invoice:", error);
      });
  };

  const handleBack = () => {
    navigate("/invoice");
  };
  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="add-container">
          <div className="addHeader">
            <h2>Add Invoice</h2>
          </div>
          <form className="add-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Payment Due Date </label>
              <input
                type="date"
                name="paymentDueDate"
                value={invoice.paymentDueDate}
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
                  <option key={customer.customerId} value={customer.customerId}>
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
              </select>
            </div>

            <div className="addActions">
              <button className="addBtn" type="submit">
                Add Invoice
              </button>
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddInvoice;
