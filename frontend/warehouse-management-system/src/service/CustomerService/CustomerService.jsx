import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { CustomerType } from "../../constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerService = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://localhost:7076/api/Customer")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const mapCustomerTypeToString = (customerType) => {
    switch (customerType) {
      case CustomerType.Restaurant:
        return "Restaurant";
      case CustomerType.Market:
        return "Market";
      case CustomerType.SmallShop:
        return "Small Shop";
      default:
        return "Unknown Type";
    }
  };

  const handleDelete = (customerId) => {
    setShowDeleteModal(true);
    setSelectedCustomerId(customerId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/Customer/${selectedCustomerId}`)
      .then(() => {
        setData((prevData) =>
          prevData.filter(
            (customer) => customer.customerId !== selectedCustomerId
          )
        );

        setShowDeleteModal(false);
        setSelectedCustomerId(null);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setShowDeleteModal(false);
        setSelectedCustomerId(null);
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedCustomerId(null);
  };

  const navigateToInvoices = (customerId) => {
    navigate(`/customerInfo/${customerId}/invoices`);
  };
  return (
    <div className="table_details">
      <div className="allData">
        <div className="cardHeader">
          <h2>All Customers</h2>
          <Link to="/addCustomer" className="btn">
            Add Customer
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Company Name</td>
                <td>Phone</td>
                <td>Email</td>
                <td>Customer Address</td>
                <td>Customer type</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {data.map((customer, index) => (
                  <tr key={customer.customerId} onClick={() => navigateToInvoices(customer.customerId)} style={{cursor: "pointer"}}>
                  <td>{index + 1}</td>
                  <td>{customer.companyName}</td>
                  <td>{customer.customerPhoneNumber}</td>
                  <td>{customer.customerEmail}</td>
                  <td>{customer.customerAddress}</td>
                  <td>{mapCustomerTypeToString(customer.customerType)}</td>
                  <td>
                    <Link to={`/editCustomer/${customer.customerId}`}>
                      <BiSolidEdit className="app_actionBtn" />
                    </Link>{" "}
                    |
                    <RiDeleteBinLine
                      className="app_actionBtn"
                      onClick={() => handleDelete(customer.customerId)}
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
            <p>Are you sure you want to delete this customer?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerService;
