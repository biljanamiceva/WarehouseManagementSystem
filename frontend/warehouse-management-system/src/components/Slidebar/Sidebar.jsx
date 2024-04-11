import React from "react";
import "./Sidebar.css";
import { HiOutlineHome } from "react-icons/hi2";
import { PiPackageLight, PiSignOutBold, PiArchive } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import { HiOutlineUserAdd } from "react-icons/hi";

const Sidebar = ({ isActive }) => {
  const role = localStorage.getItem("role");
  const handleSignOut = () => {
    localStorage.clear();
  };
  const [activeLink, setActiveLink] = React.useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className={`navigation ${isActive ? "active" : ""}`}>
      <ul>
        <li style={{marginBottom: "50px", marginTop: "30px", pointerEvents: "none"}}>
          <a>
            <span className="icon">
              <img src={images.logo} className="logo" />
            </span>
            <span className="title">Stockify</span>
          </a>
        </li>
      
        <li className={activeLink === "dashboard" ? "active" : ""}>
          <Link to="/dashboard" className="btn"  onClick={() => handleLinkClick("dashboard")}>
            <span className="icon">
              <HiOutlineHome className="ion-icon" />
            </span>
            <span className="title">Dashboard</span>
          </Link>
        </li>
        {role ==="Admin" &&
        <li className={activeLink === "employees" ? "active" : ""}>
          <Link to="/employees" className="btn"  onClick={() => handleLinkClick("employees")}>
            <span className="icon">
              <HiOutlineUserAdd className="ion-icon" />
            </span>
            <span className="title">Еmployees</span>
          </Link>
        </li>
        }

        <li className={activeLink === "inventory" ? "active" : ""}>
          <Link to="/inventory" className="btn"  onClick={() => handleLinkClick("inventory")}>
            <span className="icon">
              <PiArchive className="ion-icon" />
            </span>
            <span className="title">Inventory</span>
          </Link>
        </li>

        <li className={activeLink === "order" ? "active" : ""}>
          <Link to="/order" className="btn"  onClick={() => handleLinkClick("order")}>
            <span className="icon">
              <PiPackageLight className="ion-icon" />
            </span>
            <span className="title">Order</span>
          </Link>
        </li>

        <li className={activeLink === "supplier" ? "active" : ""}>
          <Link to="/supplier" className="btn"  onClick={() => handleLinkClick("supplier")}>
            <span className="icon">
              <IoPersonOutline className="ion-icon" />
            </span>
            <span className="title">Supplier</span>
          </Link>
        </li>
        <li className={activeLink === "receipt" ? "active" : ""}>
          <Link to="/receipt" className="btn"   onClick={() => handleLinkClick("receipt")}>
            <span className="icon">
              <TbReportAnalytics className="ion-icon" />
            </span>
            <span className="title">Reciept</span>
          </Link>
        </li>

        <li className={activeLink === "customer" ? "active" : ""}>
          <Link
            to="/customer"
            className="btn"
            onClick={() => handleLinkClick("customer")}
          >
            <span className="icon">
              <IoPersonOutline className="ion-icon" />
            </span>
            <span className="title">Customer</span>
          </Link>
        </li>

    

        <li className={activeLink === "invoice" ? "active" : ""}>
          <Link to="/invoice" className="btn"  onClick={() => handleLinkClick("invoice")}>
            <span className="icon">
              <TbReportAnalytics className="ion-icon" />
            </span>
            <span className="title">Invoices</span>
          </Link>
        </li>
        <li>
        <Link to="/" onClick={handleSignOut} className="btn">
            <span className="icon">
              <PiSignOutBold className="ion-icon" />
            </span>
            <span className="title">Sign Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
