import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const AddSupplier = ({ isActive, toggleSidebar }) => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    supplierFullName: "",
    supplierPhoneNumber: "",
    supplierEmail: "",
    supplierAccountNumber: "",
  });
 
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
    // Clear validation error when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateInputs = () => {
    const newErrors = {};

    // Validate Full Name
    if (!supplier.supplierFullName.trim()) {
      newErrors.supplierFullName = "Full Name is required";
    }

    // Validate Phone Number
    if (!supplier.supplierPhoneNumber.trim()) {
      newErrors.supplierPhoneNumber = "Phone Number is required";
    }

    // Validate Email
    if (!supplier.supplierEmail.trim()) {
      newErrors.supplierEmail = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(supplier.supplierEmail)) {
      newErrors.supplierEmail = "Invalid email address";
    }

    // Validate Account Number
    if (!supplier.supplierAccountNumber.trim()) {
      newErrors.supplierAccountNumber = "Account Number is required";
    }

    setErrors(newErrors);

    // Return true if there are no validation errors
    return Object.keys(newErrors).length === 0;
  };
  const accessToken = localStorage.getItem('accessToken');
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      axios
        .post("https://localhost:7076/api/Supplier", supplier, {
          headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${accessToken}` 
          },
        })
        .then((response) => {
       
          setSupplier({
            supplierFullName: "",
            supplierPhoneNumber: "",
            supplierEmail: "",
            supplierAccountNumber: "",
          });
        })
        .then(() => {
          navigate("/supplier");
        })
        .catch((error) => {
          console.error("Error adding supplier:", error);
        });
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
        <div className="add-container">
          <div className="addHeader">
            <h2>Add Supplier</h2>
          </div>
          <form className="add-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="supplierFullName"
                value={supplier.supplierFullName}
                onChange={handleChange}
              />
              {errors.supplierFullName && (
                <div className="error">{errors.supplierFullName}</div>
              )}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="supplierPhoneNumber"
                value={supplier.supplierPhoneNumber}
                onChange={handleChange}
              />
              {errors.supplierPhoneNumber && (
                <div className="error">{errors.supplierPhoneNumber}</div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="supplierEmail"
                value={supplier.supplierEmail}
                onChange={handleChange}
              />
              {errors.supplierEmail && (
                <div className="error">{errors.supplierEmail}</div>
              )}
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                name="supplierAccountNumber"
                value={supplier.supplierAccountNumber}
                onChange={handleChange}
              />
              {errors.supplierAccountNumber && (
                <div className="error">{errors.supplierAccountNumber}</div>
              )}
            </div>
            <div className="addActions">
              <button className="addBtn" type="submit">
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
