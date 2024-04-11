import React, { useState, useEffect } from "react";
import { OrderStatus } from "../../constants";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard";

// Import your image file
import noOrdersImage from "../../assets/home.jpg";

const OrderDash = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [newStatus, setNewStatus] = useState(null); // Default status
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Order", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const mapOrderStatusToString = (orderStatus) => {
    switch (orderStatus) {
      case OrderStatus.Processing:
        return "Processing";
      case OrderStatus.Shipped:
        return "Shipped";
      case OrderStatus.Delivered:
        return "Delivered";
      default:
        return "Unknown Type";
    }
  };

  const toggleOrderDetails = (orderId) => {
    if (selectedOrderId === orderId) {
      setShowOrderDetails(!showOrderDetails);
    } else {
      setShowOrderDetails(true);
      setSelectedOrderId(orderId);
    }
  };

  const handleChangeStatus = async () => {
    if (newStatus === null) {
      console.error("New status not selected.");
      return;
    }

    try {
      await axios.put(
        `https://localhost:7076/api/order/${selectedOrderId}/markAs`,
        {
          orderStatus: newStatus,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const updatedOrders = orders.map((order) =>
        order.orderId === selectedOrderId
          ? { ...order, orderStatus: newStatus }
          : order
      );
      setOrders(updatedOrders);
      setShowModal(false);
    } catch (error) {
      console.error("Error changing status:", error);
      setShowModal(false);
    }
  };

  return (
    <div className="table_details">
      <div className="allData">
        <div className="cardHeader">
          <h2>Preparation orders </h2>
          <Link to="/order" className="btn">
            All Orders
          </Link>
        </div>
        {loading ? (
  <p>Loading...</p>
) : orders.filter(order => order.orderStatus === OrderStatus.Processing).length === 0 ? (
  // Render image when there are no orders in the Processing status
  <div>
     <h4>No orders to process, everything shipped</h4>
  </div>
     
) : (
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Order Title</td>
                <td>Total Amount</td>
                <td>Order Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => order.orderStatus === OrderStatus.Processing)
                .map((order, index) => (
                  <React.Fragment key={order.orderId}>
                    <tr>
                      <td>{index + 1}</td>
                      <td onClick={() => toggleOrderDetails(order.orderId)}>
                        {order.orderTitle}
                      </td>
                      <td>{order.totalAmount} MKD</td>
                      <td>
                        <span
                          className={`status ${
                            order.orderStatus === OrderStatus.Processing
                              ? "processing"
                              : order.orderStatus === OrderStatus.Shipped
                              ? "shipped"
                              : order.orderStatus === OrderStatus.Delivered
                              ? "delivered"
                              : ""
                          }`}
                        >
                          {mapOrderStatusToString(order.orderStatus)}
                        </span>
                      </td>
                      <td>
                        <button
                          className="dashStatus"
                          onClick={() => {
                            setSelectedOrderId(order.orderId);
                            setShowModal(true); // Open the modal
                          }}
                        >
                          Change Status
                        </button>
                      </td>
                    </tr>
                    {showOrderDetails && selectedOrderId === order.orderId && (
                      <tr>
                        <td colSpan="5">
                          <div className="orderDetailsContainer">
                            <p>Order ID: {order.orderId}</p>
                            <h4>Products:</h4>
                            <ul style={{ listStyle: "none" }}>
                              {order.orderDetails.map((product, idx) => (
                                <li key={idx}>
                                  {product.productName} - {product.productPrice}{" "}
                                  MKD ({product.productQuantity} kg)
                                </li>
                              ))}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <div className="modal" style={{ zIndex: "1000" }}>
          <div className="modal-content">
            <p>Change status for Order ID: {selectedOrderId}</p>
            {/* Use onClick directly on the buttons to set the new status and call handleChangeStatus */}
            <button
              onClick={() => {
                setNewStatus(OrderStatus.Shipped);
                handleChangeStatus();
              }}
            >
              Mark as Shipped
            </button>
            <button
              onClick={() => {
                setNewStatus(OrderStatus.Delivered);
                handleChangeStatus();
              }}
            >
              Mark as Delivered
            </button>
            <button
              onClick={() => {
                setNewStatus(OrderStatus.Processing);
                handleChangeStatus();
              }}
            >
              Mark as Processing
            </button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDash;
