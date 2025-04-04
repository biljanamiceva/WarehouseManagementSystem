import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Supplier from "../pages/Supplier/Supplier";
import AddSupplier from "../service/SupplierService/AddSupplier";
import EditSupplier from "../service/SupplierService/EditSupplier";
import Customer from "../pages/Customer/Customer";
import AddCustomer from "../service/CustomerService/AddCustomer";
import EditCustomer from "../service/CustomerService/EditCustomer";
import Inventory from "../pages/Inventory/Inventory";
import AddProduct from "../service/ProductService/AddProduct";
import EditProduct from "../service/ProductService/EditProduct";
import Receipt from "../pages/Receipt/Receipt";
import AddReceipt from "../service/ReceiptService/AddReceipt";
import EditReciept from "../service/ReceiptService/EditReciept";
import AddInvoice from "../service/InvoiceService/AddInvoice";
import Invoice from "../pages/Invoice/Invoice";
import EditInvoice from "../service/InvoiceService/EditInvoice";
import Order from "../pages/Order/Order";
import AddOrder from "../service/OrderService/AddOrder";
import HomePage from "../pages/HomePage/HomePage";
import SupplierInfo from "../service/SupplierService/SupplierInfo";
import CustomerInfo from "../service/CustomerService/CustomerInfo";
import Login from "../pages/Login/Login";
import EditOrder from "../service/OrderService/EditOrder";
import Dashboard from "../pages/Dashboard/Dashboard";
import Register from "../pages/SignUp/Register";
import Employees from "../pages/Employees/Employees";
const CustomRoute = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/supplier"
          element={
            <Supplier isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/addSupplier"
          element={
            <AddSupplier isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/editSupplier/:supplierId"
          element={
            <EditSupplier isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/customer"
          element={
            <Customer isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/addCustomer"
          element={
            <AddCustomer isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/editCustomer/:customerId"
          element={
            <EditCustomer isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/inventory"
          element={
            <Inventory isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/addProduct"
          element={
            <AddProduct isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />

        <Route
          path="/editProduct/:productId"
          element={
            <EditProduct isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/receipt"
          element={
            <Receipt isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/addReceipt"
          element={
            <AddReceipt isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/editReceipt/:receiptId"
          element={
            <EditReciept isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />

        <Route
          path="/invoice"
          element={
            <Invoice isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/addInvoice"
          element={
            <AddInvoice isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/editInvoice/:invoiceId"
          element={
            <EditInvoice isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />

        <Route
          path="/order"
          element={<Order isActive={isActive} toggleSidebar={toggleSidebar} />}
        />
        <Route
          path="/addOrder"
          element={
            <AddOrder isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
         <Route
          path="/editOrder/:orderId"
          element={
            <EditOrder isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
        <Route
          path="/supplierInfo/:supplierId/:receipt"
          element={
            <SupplierInfo isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />

        <Route
          path="/customerInfo/:customerId/:invoice"
          element={
            <CustomerInfo isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />

        <Route
          path="/login"
          element={
            <Login />
          }
        />
         <Route
          path="/register"
          element={
            <Register />
          }
        />
         <Route
          path="/dashboard"
          element={
            <Dashboard isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
            <Route
          path="/employees"
          element={
            <Employees isActive={isActive} toggleSidebar={toggleSidebar} />
          }
        />
      </Routes>
    </div>
  );
};

export default CustomRoute;
