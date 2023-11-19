import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./SupplierService.css";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
const SupplierService = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://localhost:7076/api/Supplier")
      .then((response) => {
        setData(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [data]);

  return (
    <div className="details">
      <div className="allSuppliers">
        <div className="cardHeader">
          <h2>All Suppliers</h2>
         
           <Link to="/addSupplier" className="btn">Add Supplier</Link>
          
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
              {data.map((supplier, index) => (
                <tr key={supplier.supplierId}>
                  <td>{index+1}</td>
                  <td>{supplier.supplierFullName}</td>
                  <td>{supplier.supplierPhoneNumber}</td>
                  <td>{supplier.supplierEmail}</td>
                  <td>{supplier.supplierAccountNumber}</td>
                  <td><BiSolidEdit className="actionBtn" /> | <RiDeleteBinLine className="actionBtn" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    
    </div>
  );
};

export default SupplierService;
