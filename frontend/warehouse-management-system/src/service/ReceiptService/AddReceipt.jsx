import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const AddReceipt = ({ isActive, toggleSidebar }) => {
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState({
    receiptDate: "",
    quantity: "",
    amount: "",
    supplierId: "",
    productId: "",
    receiptStatus: "",
  });
  const [errors, setErrors] = useState({});
  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchSuppliers();
    fetchProducts();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Supplier");
      setSupplier(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Product");
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceipt({
      ...receipt,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const receiptData = {
    ...receipt,
    receiptStatus: parseInt(receipt.receiptStatus, 12),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7076/api/Receipt", receiptData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        setReceipt({
          ...receipt,
          receiptStatus: response.data.receiptStatus,
        });
        console.log("Receipt:", receipt);
      })
      .then(() => {
        navigate("/receipt");
      })
      .catch((error) => {
        console.error("Error adding receipt:", error);
      });
  };

  const handleBack = () => {
    navigate("/receipt");
  };

  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="add-container">
          <div className="addHeader">
            <h2>Add Receipt</h2>
          </div>
          <form className="add-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Supplier Name</label>
              <select
                name="supplierId"
                value={receipt.supplierId}
                onChange={handleChange}
              >
                <option value="">Select a supplier</option>
                {supplier.map((supplier) => (
                  <option key={supplier.supplierId} value={supplier.supplierId}>
                    {supplier.supplierFullName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Date </label>
              <input
                type="date"
                name="receiptDate"
                value={receipt.receiptDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Product Name</label>
              <select
                name="productId"
                value={receipt.productId}
                onChange={handleChange}
              >
                <option value="">Select a product</option>
                {product.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="text"
                name="quantity"
                value={receipt.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="text"
                name="amount"
                value={receipt.amount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Receipt Status</label>
              <select
                name="receiptStatus"
                value={receipt.receiptStatus}
                onChange={handleChange}
              >
                <option>Select status</option>
                <option value="1">Paid</option>
                <option value="2">Not Paid</option>
              </select>
            </div>

            <div className="addActions">
              <button className="addBtn" type="submit">
                Add Receipt
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

export default AddReceipt;
