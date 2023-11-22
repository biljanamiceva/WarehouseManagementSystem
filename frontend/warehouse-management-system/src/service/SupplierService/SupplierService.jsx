import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SupplierService.css";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const SupplierService = ({ searchInput, handleSearchInputChange }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []); 

  useEffect(() => {
    filterData();
  }, [searchInput, data]);

  const fetchData = () => {
    axios
      .get("https://localhost:7076/api/supplier")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const filterData = () => {
    const lowerCaseSearch = searchInput.toLowerCase();
  
    if (searchInput.trim() === "") {
      // If searchInput is empty, display all suppliers
      setFilteredData(data);
    } else {
      // Filter suppliers based on searchInput
      const filtered = data.filter(
        (supplier) =>
          supplier.supplierFullName.toLowerCase().includes(lowerCaseSearch) ||
          supplier.supplierPhoneNumber.includes(searchInput) ||
          supplier.supplierEmail.toLowerCase().includes(lowerCaseSearch) ||
          supplier.supplierAccountNumber.includes(searchInput)
      );
      setFilteredData(filtered);
    }
  };

  const handleDelete = (supplierId) => {
    setShowDeleteModal(true);
    setSelectedSupplierId(supplierId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/supplier/${selectedSupplierId}`)
      .then(() => {
        // Update the local state after successful deletion
        setData((prevData) =>
          prevData.filter(
            (supplier) => supplier.supplierId !== selectedSupplierId
          )
        );
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter(
            (supplier) => supplier.supplierId !== selectedSupplierId
          )
        );
        setShowDeleteModal(false);
        setSelectedSupplierId(null);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setShowDeleteModal(false);
        setSelectedSupplierId(null);
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedSupplierId(null);
  };

  return (
    <div className="details">
      <div className="allSuppliers">
        <div className="cardHeader">
          <h2>All Suppliers</h2> 
          <Link to="/addSupplier" className="btn">
            Add Supplier
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Full Name</td>
                <td>Phone</td>
                <td>Email</td>
                <td>Account Number</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((supplier, index) => (
                <tr key={supplier.supplierId}>
                  <td>{index + 1}</td>
                  <td>{supplier.supplierFullName}</td>
                  <td>{supplier.supplierPhoneNumber}</td>
                  <td>{supplier.supplierEmail}</td>
                  <td>{supplier.supplierAccountNumber}</td>
                  <td>
                    <BiSolidEdit className="actionBtn" /> |
                    <RiDeleteBinLine
                      className="actionBtn"
                      onClick={() => handleDelete(supplier.supplierId)}
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
            <p>Are you sure you want to delete this supplier?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierService;
