import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const AddSupplier = () => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    supplierFullName: '',
    supplierPhoneNumber: '',
    supplierEmail: '',
    supplierAccountNumber: '',
  });
  const [suppliers, setSuppliers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://localhost:7076/api/Supplier', supplier, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setSuppliers([...suppliers, response.data]);
        setSupplier({
          supplierFullName: '',
          supplierPhoneNumber: '',
          supplierEmail: '',
          supplierAccountNumber: '',
        });
      })
      .catch((error) => {
        console.error('Error adding supplier:', error);
      });
  };
  const handleBack = () => {
    // Use the navigate function to go back to the /supplier route
    navigate('/supplier');
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Supplier Full Name</label>
          <input
            type="text"
            name="supplierFullName"
            value={supplier.supplierFullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="supplierPhoneNumber"
            value={supplier.supplierPhoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="supplierEmail"
            value={supplier.supplierEmail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Account Number</label>
          <input
            type="text"
            name="supplierAccountNumber"
            value={supplier.supplierAccountNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Supplier</button>
      </form>
      <button onClick={handleBack}>Back to Supplier</button>
    </div>
  );
};

export default AddSupplier;
