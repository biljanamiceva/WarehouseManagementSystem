import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const AddOrder = ({ isActive, toggleSidebar }) => {
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    orderStatus: "",
    customerId: "",  // Assuming you have a customerId field
    productIds: [],
    quantities: [],
    orderTitle: "",
  });
  const [errors, setErrors] = useState({});
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Customer",
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Product",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...order[field]];
    newProducts[index] = value;
    setOrder({
      ...order,
      [field]: newProducts,
    });
  };

  const addProductField = () => {
    setOrder({
      ...order,
      productIds: [...order.productIds, ""],
      quantities: [...order.quantities, ""],
    });
  };

  const orderData = {
    ...order,
    orderStatus: parseInt(order.orderStatus, 10),
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://localhost:7076/api/Order", orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then((response) => {
        console.log('Order added successfully:', response.data);
        setOrder({
          ...order,
          orderStatus: response.data.orderStatus,
        });
      })
      .then(() => {
        navigate("/order");
      })
      .catch((error) => {
        console.error('Error adding order:', error);
      });
  };


  const handleBack = () => {
    navigate("/order");
  };

  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="add-container">
          <div className="addHeader">
            <h2>Add Order</h2>
          </div>
          <form className="add-form" onSubmit={handleSubmit}>
          <div className="form-group">
              <label>Order Title</label>
              <input
                type="text"
                name="orderTitle"
                value={order.orderTitle}
                onChange={handleChange}
                placeholder="Enter order title"
              />
            </div>
            <div className="form-group">
              <label>Order Status</label>
              <select
                name="orderStatus"
                value={order.orderStatus}
                onChange={handleChange}
              >
                <option>Select status</option>
                <option value="1">Processing</option>
                <option value="2">Shipped</option>
                <option value="3">Delivered</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Customer</label>
              <select
                name="customerId"
                value={order.customerId}
                onChange={handleChange}
              >
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                  <option key={customer.customerId} value={customer.customerId}>
                    {customer.companyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Products</label>
              {order.productIds.map((_, index) => (
                <div key={index} className="product-row">
                  <select
                    value={order.productIds[index] || ""}
                    onChange={(e) =>
                      handleProductChange(index, "productIds", e.target.value)
                    }
                  >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                      <option
                        key={product.productId}
                        value={product.productId}
                      >
                        {product.productName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    placeholder="Quantity"
                    value={order.quantities[index] || ""}
                    onChange={(e) =>
                      handleProductChange(index, "quantities", e.target.value)
                    }
                  />
                </div>
              ))}
              <button type="button" onClick={addProductField}>
                Add Product
              </button>
            </div>
            
            <div className="addActions">
              <button className="addBtn" type="submit">
                Add Order
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

export default AddOrder;
