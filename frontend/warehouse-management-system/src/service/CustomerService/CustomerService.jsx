import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { CustomerType } from "../../constants";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerService = ({ searchInput, handleCustomersChange }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchInput, data]);

  const filterData = () => {
    const lowerCaseSearch = searchInput.toLowerCase();

    if (searchInput.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (customer) =>
        customer.companyName.toLowerCase().includes(lowerCaseSearch) ||
        customer.customerPhoneNumber.includes(searchInput) ||
        customer.customerEmail.toLowerCase().includes(lowerCaseSearch) ||
        customer.customerAddress.toLowerCase().includes(lowerCaseSearch) ||
        mapCustomerTypeToString(customer.customerType).toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredData(filtered);
    }
  };
  const accessToken = localStorage.getItem('accessToken');
  const fetchData = () => {
    axios
      .get("https://localhost:7076/api/Customer", {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
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

  const handleDelete = (customerId, companyName) => {
    setSelectedCustomerName(companyName); 
    setShowDeleteModal(true);
    setSelectedCustomerId(customerId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/Customer/${selectedCustomerId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(() => {
        setData((prevData) =>
          prevData.filter(
            (customer) => customer.customerId !== selectedCustomerId
          )
        );
        setFilteredData((prevFilteredData) =>
        prevFilteredData.filter(
          (customer) => customer.customerId !== selectedCustomerId
        )
      );

        setShowDeleteModal(false);
        setSelectedCustomerId(null);
        setSelectedCustomerName("");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setShowDeleteModal(false);
        setSelectedCustomerId(null);
        setSelectedCustomerName("");
      });
  };
  useEffect(() => {
    handleCustomersChange(data);
  }, [data]);

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedCustomerId(null);
    setSelectedCustomerName("");
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
                <td>Customer Name</td>
                <td>Phone</td>
                <td>Email</td>
                <td>Customer Address</td>
                <td>Customer type</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((customer, index) => (
                  <tr key={customer.customerId}>
                  <td>{index + 1}</td>
                  <td  onClick={() => navigateToInvoices(customer.customerId)} style={{cursor: "pointer"}}>{customer.companyName}</td>
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
                      onClick={() => handleDelete(customer.customerId, customer.companyName)}
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
            <p>Are you sure you want to delete <strong>{selectedCustomerName}</strong>?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerService;
