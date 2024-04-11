import React, { useEffect, useState } from "react";
import { ProductStatus } from "../../constants";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductDash = ({ searchInput, handleProductsChange }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchInput, data]);

  const filterData = () => {
    const lowerCaseSearch = searchInput ? searchInput.toLowerCase() : "";
    if (!searchInput || searchInput.trim() === "") {
      const filtered = data.filter(
        (product) =>
          product.productStatus === ProductStatus.LowStock ||
          product.productStatus === ProductStatus.OutOfStock
      );
      setFilteredData(filtered);
    } else {
      const filtered = data.filter(
        (product) =>
          product.productName.toLowerCase().includes(lowerCaseSearch) &&
          (product.productStatus === ProductStatus.LowStock ||
            product.productStatus === ProductStatus.OutOfStock)
      );
      setFilteredData(filtered);
    }
  };

  const accessToken = localStorage.getItem("accessToken");
  const fetchData = () => {
    axios
      .get("https://localhost:7076/api/Product", {
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

  return (
    <div className="table_details">
      <div className="allData">
        <div className="cardHeader">
          <h2>Low stock Products</h2>
          <Link to="/inventory" className="btn">
            All Products
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : filteredData.length === 0 ? (
          <div>
            <h4>All products are in stock</h4>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Product</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((product, index) => (
                <tr key={product.productId}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>{product.productQuantityInStock} kg</td>
                  <td>{product.productPrice} MKD</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductDash;
