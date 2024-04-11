import React, { useState, useEffect } from "react";
import { OrderStatus } from "../../constants";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi"; // Import edit and trash icons from react-icons/bi
import axios from "axios";

const OrderService = ({searchInput, handleOrdersChange}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [accordionId, setAccordionId] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    handleOrdersChange(orders);
  }, [orders]);
  useEffect(() => {
    filterData();
  }, [searchInput, orders]);

  const filterData = () => {
    const lowerCaseSearch = searchInput.toLowerCase();

    if (searchInput.trim() === "") {
      setFilteredData(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.orderTitle.toLowerCase().includes(lowerCaseSearch) 
         
      );
      setFilteredData(filtered);
    }
  };

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

  const handleDelete = (orderId) => {
    setShowDeleteModal(true);
    setSelectedOrderId(orderId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/Order/${selectedOrderId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setOrders((prevData) =>
          prevData.filter((order) => order.orderId !== selectedOrderId)
        );
        setFilteredData((prevFilteredData) =>
        prevFilteredData.filter(
          (order) => order.orderId !== selectedOrderId
        )
      );

        setShowDeleteModal(false);
        setSelectedOrderId(null);
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        setShowDeleteModal(false);
        setSelectedOrderId(null);
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedOrderId(null);
  };

  const toggleAccordion = (orderId) => {
    setAccordionId((prevState) => (prevState === orderId ? null : orderId));
  };

  return (
    <div className="table_details">
      <div className="allData">
        <div className="cardHeader">
          <h2>All Orders</h2>
          <Link to="/addOrder" className="btn">
            Add Order
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Order Title</td>
                <td>Customer Name</td>
                <td>Total Amount</td>
                <td>Order Status</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
            {filteredData.map((order, index) => (
                <React.Fragment key={order.orderId}>
                  <tr>
                    <td>{index + 1}</td>
                    <td onClick={() => toggleAccordion(order.orderId)}>{order.orderTitle}</td>
                    <td>{order.companyName}</td>
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
                      <Link to={`/editOrder/${order.orderId}`}>
                        <BiEdit className="app_actionBtn" />
                      </Link>
                      <BiTrash className="app_actionBtn" onClick={() => handleDelete(order.orderId)} />
                    </td>
                  </tr>
                  {accordionId === order.orderId && (
                    <tr className="accordion">
                      <td colSpan="6">
                        <div style={{textAlign: "start", marginLeft: "50px"}}>
                          <h4>Order Details</h4>
                          <ul>
                            {order.orderDetails.map((detail, idx) => (
                              <li key={idx} style={{listStyle: "none"}}>
                                {detail.productName} - {detail.productPrice} MKD
                                ({detail.productQuantity} kg)
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
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this order?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderService;
