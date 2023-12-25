import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ProductStatus } from "../../constants";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductService = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://localhost:7076/api/Product")
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

  const handleDelete = (productId) => {
    setShowDeleteModal(true);
    setSelectedProductId(productId);
  };

  const confirmDelete = () => {
    axios
      .delete(`https://localhost:7076/api/Product/${selectedProductId}`)
      .then(() => {
        setData((prevData) =>
          prevData.filter((product) => product.productId !== selectedProductId)
        );

        setShowDeleteModal(false);
        setSelectedProductId(null);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        setShowDeleteModal(false);
        setSelectedProductId(null);
      });
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedProductId(null);
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
              {data.map((product, index) => (
                <tr key={product.productId}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>{product.productQuantityInStock} kg</td>
                  <td>{product.productPrice}</td>
                  <td>{mapProductStatusToString(product.productStatus)}</td>
                  <td>
                    <Link to={`/editProduct/${product.productId}`}>
                      <BiSolidEdit className="app_actionBtn" />
                    </Link>
                    |
                    <RiDeleteBinLine
                      className="app_actionBtn"
                      onClick={() => handleDelete(product.productId)}
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
            <p>Are you sure you want to delete this product?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={cancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductService;
