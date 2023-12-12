import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const EditProduct = ({ isActive, toggleSidebar }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productQuantityInStock: "",
    productStatus: "", // Number instead of string
  });
  const [loading, setLoading] = useState(true);

  const productData = {
    ...product,
    productStatus: parseInt(product.productStatus, 12),
  };

  useEffect(() => {
    if (productId) {
      axios
        .get(`https://localhost:7076/api/Product/${productId}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          setLoading(false);
        });
    } else {
      console.error("Invalid or undefined id parameter.");
      setLoading(false);
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://localhost:7076/api/Product/${productId}`, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        navigate("/inventory");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleBack = () => {
    navigate("/inventory");
  };
  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="add-container">
          <div className="addHeader">
            <h2>Edit Product</h2>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form className="add-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="text"
                  name="productQuantityInStock"
                  value={product.productQuantityInStock}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  name="productStatus"
                  value={product.productStatus}
                  onChange={handleChange}
                >
                  <option value="1">In Stock</option>
                  <option value="2">Low Stock</option>
                  <option value="3">Out of Stock</option>
                </select>
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

export default EditProduct;
