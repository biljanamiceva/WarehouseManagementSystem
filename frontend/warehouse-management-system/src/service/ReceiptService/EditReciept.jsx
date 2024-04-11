import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Slidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

const EditReciept = ({ isActive, toggleSidebar }) => {
  const { receiptId } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState({
    receiptDate: "",
    quantity: "",
    amount: "",
    supplierId: "",
    productId: "",
    receiptStatus: "",
  });
  const [loading, setLoading] = useState(true);
  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  const receiptData = {
    ...receipt,
    receiptStatus: parseInt(receipt.receiptStatus, 12),
  };

  useEffect(() => {
    fetchSuppliers();
    fetchProducts();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Supplier",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSupplier(response.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://localhost:7076/api/Product",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (receiptId) {
      axios
        .get(`https://localhost:7076/api/Receipt/${receiptId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setReceipt(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching receipt data:", error);
          setLoading(false);
        });
    } else {
      console.error("Invalid or undefined id parameter.");
      setLoading(false);
    }
  }, [receiptId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceipt({
      ...receipt,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://localhost:7076/api/Receipt/${receiptId}`, receiptData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then(() => {
        navigate("/receipt");
      })
      .catch((error) => {
        console.error("Error updating receipt:", error);
      });
  };

  const handleBack = () => {
    navigate("/receipt");
  };

  const formatDate = (date) => {
    // Extract only the date part without the time
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <div className="container">
      <Sidebar isActive={isActive} />
      <div className={`main ${isActive ? "active" : ""}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="add-container">
          <div className="addHeader">
            <h2>Edit Receipt</h2>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <form className="add-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Supplier Name</label>
                <select
                  name="supplierId"
                  value={receipt.supplierId}
                  onChange={handleChange}
                >
                  <option value="">Select a supplier</option>
                  {supplier.map((supplier) => (
                    <option
                      key={supplier.supplierId}
                      value={supplier.supplierId}
                    >
                      {supplier.supplierFullName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
              <label>Date </label>
              <input
                  type="date"
                  name="receiptDate"
                  value={formatDate(receipt.receiptDate)} // Format the date
                  onChange={handleChange}
                />
            </div>
            <div className="form-group">
              <label>Product Name</label>
              <select
                name="productId"
                value={receipt.productId}
                onChange={handleChange}
              >
                <option value="">Select a product</option>
                {product.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="text"
                name="quantity"
                value={receipt.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="text"
                name="amount"
                value={receipt.amount}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Receipt Status</label>
              <select
                name="receiptStatus"
                value={receipt.receiptStatus}
                onChange={handleChange}
              >
                <option>Select status</option>
                <option value="1">Paid</option>
                <option value="2">Not Paid</option>
              </select>
            </div>
            <div className="addActions">
                <button className="addBtn" type="submit">
                  Update
                </button>
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditReciept;
