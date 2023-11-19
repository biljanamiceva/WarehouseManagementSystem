import "./App.css";
import { Routes, Route } from "react-router-dom";
import SupplierService from "./service/SupplierService/SupplierService";
import Supplier from "./pages/Supplier/Supplier";
import { useState } from "react";
import AddSupplier from "./service/SupplierService/AddSupplier";

function App() {
  const [isActive, setIsActive] = useState(false);

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/addSupplier" element={<AddSupplier />} />
        <Route path="/supplier" element={<Supplier isActive={isActive} toggleSidebar={toggleSidebar} />}/>
        <Route path="/addSupplier" element={<AddSupplier />} />
      </Routes>
    </div>
  );
}

export default App;
