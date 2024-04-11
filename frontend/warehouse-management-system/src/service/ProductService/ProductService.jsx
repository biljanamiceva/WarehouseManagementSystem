import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ProductStatus } from "../../constants";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductService = ({ searchInput, handleProductsChange }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [filteredData, setFilteredData] = useState([]);
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
        (product) =>
          product.productName.toLowerCase().includes(lowerCaseSearch) 
      );
      setFilteredData(filtered);
    }
  };


  const accessToken = localStorage.getItem("accessToken");
  const fetchData = () => {
    axios
      .get("https://localhost:7076/api/Product",
      {
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

  const mapProductStatusToString = (productStatus) => {
    switch (productStatus) {
      case ProductStatus.InStock:
        return "In Stock";
      case ProductStatus.LowStock:
        return "Low Stock";
      case ProductStatus.OutOfStock:
        return "Out Of Stock";
      default:
        return "Unknown Type";
    }
  };

  const handleDelete = (productId, productName) => {
    setSelectedProductName(productName);
    setShowDeleteModal(true);
    setSelectedProductId(productId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/Product/${selectedProductId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        setData((prevData) =>
          prevData.filter((product) => product.productId !== selectedProductId)
        );
        setFilteredData((prevFilteredData) =>
        prevFilteredData.filter(
          (product) => product.productId !== selectedProductId
        )
      );

        setShowDeleteModal(false);
        setSelectedProductId(null);
        setSelectedProductName("");
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setShowDeleteModal(false);
        setSelectedProductId(null);
        setSelectedProductName("");
      });
  };
  useEffect(() => {
    handleProductsChange(data);
  }, [data]);

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedProductId(null);
    setSelectedProductName("");
  };

  return (
    <div className="table_details">
      <div className="allData">
        <div className="cardHeader">
          <h2>All Products</h2>
          <Link to="/addProduct" className="btn">
            Add Product
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Product</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Status</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product, index) => (
                <tr key={product.productId}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>{product.productQuantityInStock} kg</td>
                  <td>{product.productPrice}  MKD</td>
                  <td>
                    <span
                      className={`status ${
                        product.productStatus === ProductStatus.InStock
                          ? "inStock"
                          : product.productStatus === ProductStatus.LowStock
                          ? "lowStock"
                          : product.productStatus === ProductStatus.OutOfStock
                          ? "outOfStock"
                          : ""
                      }`}
                    >
                      {mapProductStatusToString(product.productStatus)}
                    </span>
                  </td>
                  <td>
                    <Link to={`/editProduct/${product.productId}`}>
                      <BiSolidEdit className="app_actionBtn" />
                    </Link>
                    |
                    <RiDeleteBinLine
                      className="app_actionBtn"
                      onClick={() => handleDelete(product.productId, product.productName)}
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
            <p>Are you sure you want to delete <strong>{selectedProductName}</strong>?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductService;
