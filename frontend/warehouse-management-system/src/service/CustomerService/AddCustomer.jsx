import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const AddCustomer = ({ isActive, toggleSidebar }) => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    companyName: "",
    customerPhoneNumber: "",
    customerEmail: "",
    customerAddress: "",
    customerType: "", // Number instead of string
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
    // Clear validation error when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const customerData = {
    ...customer,
    customerType: parseInt(customer.customerType, 12),
  };

  const validateInputs = () => {
    const newErrors = {};

    // Validate Full Name
    if (!customer.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
    }

    // Validate Phone Number
    if (!customer.customerPhoneNumber.trim()) {
      newErrors.customerPhoneNumber = "Phone Number is required";
    }

    // Validate Email
    if (!customer.customerEmail.trim()) {
      newErrors.customerEmail = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(customer.customerEmail)) {
      newErrors.customerEmail = "Invalid email address";
    }

    // Validate Address
    if (!customer.customerAddress.trim()) {
      newErrors.customerAddress = "Address is required";
    }

    if (!customer.customerType.trim()) {
      newErrors.customerType = "Type is required";
    }

    setErrors(newErrors);

    // Return true if there are no validation errors
    return Object.keys(newErrors).length === 0;
  };
  const accessToken = localStorage.getItem('accessToken');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting...", customer); // Add this line
    if (validateInputs()) {
      axios
        .post("https://localhost:7076/api/Customer", customerData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          // Update the state correctly
          setCustomer({
            ...customer,
            customerType: response.data.customerType, // Assuming the structure of your response.data
          });
          console.log("Customer:", customer);
        })
        .then(() => {
          navigate("/customer");
        })
        .catch((error) => {
          console.error("Error adding customer:", error);
        });
    }
  };

  const handleBack = () => {
    navigate("/customer");
  };
  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="add-container">
          <div className="addHeader">
            <h2>Add Customer</h2>
          </div>
          <form className="add-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={customer.companyName}
                onChange={handleChange}
              />
              {errors.companyName && (
                <div className="error">{errors.companyName}</div>
              )}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="customerPhoneNumber"
                value={customer.customerPhoneNumber}
                onChange={handleChange}
              />
              {errors.customerPhoneNumber && (
                <div className="error">{errors.customerPhoneNumber}</div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="customerEmail"
                value={customer.customerEmail}
                onChange={handleChange}
              />
              {errors.customerEmail && (
                <div className="error">{errors.customerEmail}</div>
              )}
            </div>
            <div className="form-group">
              <label>Customer Address</label>
              <input
                type="text"
                name="customerAddress"
                value={customer.customerAddress}
                onChange={handleChange}
              />
              {errors.customerAddress && (
                <div className="error">{errors.customerAddress}</div>
              )}
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
              {errors.customerType && (
                <div className="error">{errors.customerType}</div>
              )}
            </div>
            <div className="addActions">
              <button className="addBtn" type="submit">
                Add Customer
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

export default AddCustomer;
