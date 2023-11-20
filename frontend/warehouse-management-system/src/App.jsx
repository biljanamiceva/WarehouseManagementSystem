import "./App.css";
import { Routes, Route } from "react-router-dom";
import SupplierService from "./service/SupplierService/SupplierService";
import Supplier from "./pages/Supplier/Supplier";
import { useState } from "react";
import AddSupplier from "./service/SupplierService/AddSupplier";
import EditSupplier from "./service/SupplierService/EditSupplier";

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
      </Routes>
    </div>
  );
}

export default App;
