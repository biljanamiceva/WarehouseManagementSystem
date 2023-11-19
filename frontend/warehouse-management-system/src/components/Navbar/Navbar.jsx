import React from "react";
import "./Navbar.css";
import { MenuOutline, SearchOutline } from "react-ionicons";
import { useState } from "react";

const Navbar = ({ toggleSidebar }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="topbar">
        <div className="toggle" onClick={toggleSidebar}>
        <MenuOutline className="ion-icon" />
      </div>
      <div className="search">
        <label>
          <input type="text" placeholder="search" />
          <SearchOutline className="ion-icon" />
        </label>
      </div>
      <div className="user">
        <img src="src\assets\user.jpg" />
      </div>
    </div>
  );
};

export default Navbar;
