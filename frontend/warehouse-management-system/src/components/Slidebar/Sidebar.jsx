import React from "react";
import "./Sidebar.css";
import { HiOutlineHome } from "react-icons/hi2";
import { PiPackageLight, PiSignOutBold, PiArchive   } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { images } from "../../constants";
const Sidebar = ({ isActive }) => {

  return (
    <div className={`navigation ${isActive ? 'active' : ''}`}>
      <ul>
        <li>
          <a>
            <span className="icon">
              <img src={images.logo} className="logo" />
            </span>
            <span className="title">Stockify</span>
          </a>
        </li>
        <li>
          <a>
            <span className="icon">
              <HiOutlineHome  className="ion-icon" />
            </span>
            <span className="title">Dashboard</span>
          </a>
        </li>

        <li>
          <a>
            <span className="icon">
              <PiArchive   className="ion-icon" />
            </span>
            <span className="title">Inventory</span>
          </a>
        </li>

        <li>
          <a>
            <span className="icon">
              <PiPackageLight  className="ion-icon" />
            </span>
            <span className="title">Order</span>
          </a>
        </li>

        <li>
          <a>
            <span className="icon">
              <IoPersonOutline className="ion-icon" />
            </span>
            <span className="title">Supplier</span>
          </a>
        </li>

        <li>
          <a >
            <span className="icon">
              <IoPersonOutline className="ion-icon" />
            </span>
            <span className="title">Custumer</span>
          </a>
        </li>

        <li>
          <a>
            <span className="icon">
              <TbReportAnalytics className="ion-icon" />
            </span>
            <span className="title">Reports</span>
          </a>
        </li>
        <li>
          <a>
            <span className="icon">
              <PiSignOutBold  className="ion-icon" />
            </span>
            <span className="title">Sign Out</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
