import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";


const EditSupplier = ({ isActive, toggleSidebar }) => {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    supplierFullName: "",
    supplierPhoneNumber: "",
    supplierEmail: "",
    supplierAccountNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    if (supplierId) {
      axios
        .get(`https://localhost:7076/api/Supplier/${supplierId}`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
          setSupplier(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching supplier data:", error);
          setLoading(false);
        });
    } else {
      // Handle the case where id is undefined or not a valid value
      console.error("Invalid or undefined id parameter.");
      setLoading(false);
    }
  }, [supplierId]);

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
      .put(`https://localhost:7076/api/Supplier/${supplierId}`, supplier, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then(() => {
        navigate("/supplier");
      })
      .catch((error) => {
        console.error("Error updating supplier:", error);
      });
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
            <h2>Edit Supplier</h2>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form className="add-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Supplier Full Name</label>
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
              <div className="addActions">
                <button className="addBtn" type="submit">
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

export default EditSupplier;
