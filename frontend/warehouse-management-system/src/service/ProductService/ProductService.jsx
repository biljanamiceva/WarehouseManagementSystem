import "./ProductService.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { ProductStatus } from "../../constants";

const ProductService = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="product_details">
      <div className="allProducts">
        <div className="product_cardHeader">
          <h2>All Products</h2>
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
                  <td>{mapProductStatusToString(product.productStatus)}</td>
                  <td>
                    <BiSolidEdit className="actionBtn" />
                    |
                    <RiDeleteBinLine className="product_actionBtn" />
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

export default ProductService;
