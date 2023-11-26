import "./App.css";
import { Routes, Route } from "react-router-dom";
import Supplier from "./pages/Supplier/Supplier";
import { useState } from "react";
import AddSupplier from "./service/SupplierService/AddSupplier";
import EditSupplier from "./service/SupplierService/EditSupplier";
import CustomerService from "./service/CustomerService/CustomerService";
import Customer from "./pages/Customer/Customer";
import AddCustomer from "./service/CustomerService/AddCustomer";
import EditCustomer from "./service/CustomerService/EditCustomer";
import Inventory from "./pages/Inventory/Inventory";

function App() {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="App">
      <Routes>
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
      </Routes>
    </div>
  );
}

export default App;
