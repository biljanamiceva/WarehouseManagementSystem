import React from "react";
import "./Navbar.css";
import { MenuOutline, SearchOutline } from "react-ionicons";

import { images } from "../../constants";

const Navbar = ({ toggleSidebar }) => {

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
        
        <img src={images.user} alt="user" />
      </div>
    </div>
  );
};

export default Navbar;
