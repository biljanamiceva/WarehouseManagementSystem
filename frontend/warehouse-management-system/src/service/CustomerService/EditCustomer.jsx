import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./AddCustomer.css";
const EditCustomer = ({ isActive, toggleSidebar }) => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    companyName: "",
    customerPhoneNumber: "",
    customerEmail: "",
    customerAddress: "",
    customerType: "", // Number instead of string
  });
  const [loading, setLoading] = useState(true);

  const customerData = {
    ...customer,
    customerType: parseInt(customer.customerType, 12),
  };

  useEffect(() => {
    if (customerId) {
      axios
        .get(`https://localhost:7076/api/Customer/${customerId}`)
        .then((response) => {
          setCustomer(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
          setLoading(false);
        });
    } else {
      console.error("Invalid or undefined id parameter.");
      setLoading(false);
    }
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://localhost:7076/api/Customer/${customerId}`, customerData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/customer");
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
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
        <div className="add-customer-container">
          <div className="customer_addHeader">
            <h2>Edit Customer</h2>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form className="add-customer-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={customer.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="customerPhoneNumber"
                  value={customer.customerPhoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="customerEmail"
                  value={customer.customerEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Customer Address</label>
                <input
                  type="text"
                  name="customerAddress"
                  value={customer.customerAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Customer Type</label>
                <select
                  name="customerType"
                  value={customer.customerType}
                  onChange={handleChange}
                >
                  <option></option>
                  <option value="1">Restaurant</option>
                  <option value="2">Market</option>
                  <option value="3">SmallShop</option>
                </select>
              </div>
              <div className="AddActions">
                <button className="addCustomerBtn" type="submit">
                  Update
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

export default EditCustomer;
