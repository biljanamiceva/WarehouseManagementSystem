import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const AddProduct = ({ isActive, toggleSidebar }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productQuantityInStock: "",
    productStatus: "", // Number instead of string
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    // Clear validation error when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const productData = {
    ...product,
    productStatus: parseInt(product.productStatus, 12),
  };

  const validateInputs = () => {
    const newErrors = {};

    // Validate Product Name
    if (!product.productName.trim()) {
      newErrors.productName = "Product Name is required";
    }

    // Validate Qunatity
    if (!product.productQuantityInStock.trim()) {
      newErrors.productQuantityInStock = "Quantity in stock is required";
    }

    if (!product.productStatus.trim()) {
      newErrors.productStatus = "Product status is required";
    }

    setErrors(newErrors);

    // Return true if there are no validation errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting...", product); // Add this line
    if (validateInputs()) {
      axios
        .post("https://localhost:7076/api/Product", productData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          // Update the state correctly
          setProduct({
            ...product,
            productStatus: response.data.productStatus, // Assuming the structure of your response.data
          });
          console.log("Product:", product);
        })
        .then(() => {
          navigate("/inventory");
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    }
  };

  const handleBack = () => {
    navigate("/inventory");
  };

  return(
    <div className="container">
    <Sidebar isActive={isActive} />
    <div className={`main ${isActive ? "active" : ""}`}>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="add-container">
        <div className="addHeader">
          <h2>Add Product</h2>
        </div>
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
            />
            {errors.productName && (
              <div className="error">{errors.productName}</div>
            )}
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="text"
              name="productQuantityInStock"
              value={product.productQuantityInStock}
              onChange={handleChange}
            />
            {errors.productQuantityInStock && (
              <div className="error">{errors.productQuantityInStock}</div>
            )}
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <select
              name="productStatus"
              value={product.productStatus}
              onChange={handleChange}
            >
              <option></option>
              <option value="1">In Stock</option>
              <option value="2">Low Stock</option>
              <option value="3">Out of Stock</option>
            </select>
            {errors.productStatus && (
              <div className="error">{errors.productStatus}</div>
            )}
          </div>
          <div className="addActions">
            <button className="addBtn" type="submit">
              Add Product
            </button>
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
};

export default AddProduct;
