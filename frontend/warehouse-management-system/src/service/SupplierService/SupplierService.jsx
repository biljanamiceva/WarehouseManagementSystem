import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SupplierService = ({ searchInput, handleSupliersChange }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [selectedSupplierName, setSelectedSupplierName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchInput, data]);

  const accessToken = localStorage.getItem("accessToken");

  const fetchData = () => {
    axios
      .get("https://localhost:7076/api/supplier", {
        headers: { Authorization: `Bearer ${accessToken}` },
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

  const filterData = () => {
    const lowerCaseSearch = searchInput.toLowerCase();

    if (searchInput.trim() === "") {
      setFilteredData(data);
    } else {
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

  const handleDelete = (supplierId, supplierName) => {
    setSelectedSupplierName(supplierName);
    setShowDeleteModal(true);
    setSelectedSupplierId(supplierId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/supplier/${selectedSupplierId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
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
        setSelectedSupplierName("");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setShowDeleteModal(false);
        setSelectedSupplierId(null);
        setSelectedSupplierName("");
      });
  };

  useEffect(() => {
    handleSupliersChange(data);
  }, [data]);

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedSupplierId(null);
    setSelectedSupplierName("");
  };

  const navigateToReceipts = (supplierId) => {
    navigate(`/supplierInfo/${supplierId}/receipts`);
  };

  return (
    <div className="table_details">
      <div className="allData">
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
                <tr key={supplier.supplierId} style={{ cursor: "pointer" }}>
                  <td>{index + 1}</td>
                  <td onClick={() => navigateToReceipts(supplier.supplierId)}>
                    {supplier.supplierFullName}
                  </td>
                  <td>{supplier.supplierPhoneNumber}</td>
                  <td>{supplier.supplierEmail}</td>
                  <td>{supplier.supplierAccountNumber}</td>
                  <td>
                    <Link to={`/editSupplier/${supplier.supplierId}`}>
                      <BiSolidEdit className="app_actionBtn" />
                    </Link>{" "}
                    |
                    <RiDeleteBinLine
                      className="app_actionBtn"
                      onClick={() =>
                        handleDelete(
                          supplier.supplierId,
                          supplier.supplierFullName
                        )
                      }
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
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedSupplierName}</strong>?
            </p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierService;
