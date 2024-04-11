import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const EditOrder = ({ isActive, toggleSidebar }) => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState({
    orderStatus: "",
    customerId: "",
    customerName: "",
    products: [],
  });
  const [errors, setErrors] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchOrder();
    fetchProducts();
    fetchCustomers();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`https://localhost:7076/api/Order/${orderId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const { orderStatus, customerId, customerName, orderProducts, orderTitle } = response.data;
      const products = orderProducts.map((op) => ({
        productId: op.productId,
        quantity: op.quantity,
      }));
      setOrder({
        ...order,
        orderStatus: orderStatus.toString(),
        customerId,
        customerName,
        products,
        orderTitle
      });
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Product", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setAllProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Customer", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
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
    const newProducts = [...order.products];
    newProducts[index][field] = value;
    setOrder({
      ...order,
      products: newProducts,
    });
  };

  const updateOrder = () => {
    const updatedProducts = order.products.map((product) => ({
      productId: product.productId,
      quantity: parseInt(product.quantity, 10), // Parse quantity as integer
    }));

    const orderData = {
      ...order,
      orderStatus: parseInt(order.orderStatus, 10),
      products: updatedProducts, // Include updated products in order data
    };

    axios
      .put(`https://localhost:7076/api/Order/${orderId}`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('Order updated successfully:', response.data);
        navigate("/order");
      })
      .catch((error) => {
        console.error('Error updating order:', error);
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
            <h2>Edit Order</h2>
          </div>
          <form className="add-form" onSubmit={(e) => e.preventDefault()}>
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
                <option value="">Select status</option>
                <option value="1">Processing</option>
                <option value="2">Shipped</option>
                <option value="3">Delivered</option>
              </select>
            </div>
            <div className="form-group">
              <label>Customer Name</label>
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
              {order.products.map((product, index) => (
                <div key={index} className="product-row">
                  <select
                    value={product.productId || ""}
                    onChange={(e) =>
                      handleProductChange(index, "productId", e.target.value)
                    }
                  >
                    <option value="">Select a product</option>
                    {allProducts.map((prod) => (
                      <option key={prod.productId} value={prod.productId}>
                        {prod.productName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="1"
                    placeholder="Quantity"
                    value={product.quantity || ""}
                    onChange={(e) =>
                      handleProductChange(index, "quantity", e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
            <div className="addActions">
              <button className="addBtn" onClick={updateOrder}>
                Update Order
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

export default EditOrder;

