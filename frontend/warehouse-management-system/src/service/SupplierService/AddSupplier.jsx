import React, { useEffect, useState } from "react";
import "./AddSupplier.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const AddSupplier = ({ isActive, toggleSidebar }) => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    supplierFullName: "",
    supplierPhoneNumber: "",
    supplierEmail: "",
    supplierAccountNumber: "",
  });
  const [suppliers, setSuppliers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7076/api/Supplier", supplier, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSuppliers([...suppliers, response.data]);
        setSupplier({
          supplierFullName: "",
          supplierPhoneNumber: "",
          supplierEmail: "",
          supplierAccountNumber: "",
        });
      })
      .catch((error) => {
        console.error("Error adding supplier:", error);
      });
  };
  const handleBack = () => {
    // Use the navigate function to go back to the /supplier route
    navigate("/supplier");
  };
  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="add-supplier-container">
          <div className="addHeader">
            <h2>Add Supplier</h2>
          </div>
          <form className="add-supplier-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="supplierFullName"
                value={supplier.supplierFullName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="supplierPhoneNumber"
                value={supplier.supplierPhoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="supplierEmail"
                value={supplier.supplierEmail}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                name="supplierAccountNumber"
                value={supplier.supplierAccountNumber}
                onChange={handleChange}
              />
            </div>
            <div className="AddActions">
            <button className="addSupplierBtn" type="submit">
              Add Supplier
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

export default AddSupplier;
