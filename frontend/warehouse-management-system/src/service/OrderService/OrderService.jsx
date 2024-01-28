import React, { useState, useEffect } from "react";
import { OrderStatus } from "../../constants";
import { Link } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";

const OrderService = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Order");
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
          case OrderStatus.PartiallyShipped:
            return "PartiallyShipped";
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
      .delete(`https://localhost:7076/api/Order/${selectedOrderId}`)
      .then(() => {
        setOrders((prevData) =>
          prevData.filter((order) => order.orderId !== selectedOrderId)
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
                <td>Custumer Name</td>
                <td>Total Amount</td>
                <td>Order Status</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.orderId}>
                  <td>{index + 1}</td>
                  <td>{order.companyName}</td>
                  <td>{order.totalAmount}</td>
                  <td>{mapOrderStatusToString(order.orderStatus)}</td>
                 
                  <td>
                    <Link to={`/editOrder/${order.orderId}`}>
                      <BiSolidEdit className="app_actionBtn" />
                    </Link>
                    |
                    <RiDeleteBinLine
                      className="app_actionBtn"
                      onClick={() => handleDelete(order.orderId)}
                    />
                  </td>
                </tr>
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
