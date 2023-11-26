import React from "react";
import "./Navbar.css";
import { MenuOutline, SearchOutline } from "react-ionicons";

import { images } from "../../constants";
import { useState } from "react";

const Navbar = ({ toggleSidebar, handleSearchInputChange }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    handleSearchInputChange(e.target.value);
  };
  return (
    <div className="topbar">
      <div className="toggle" onClick={toggleSidebar}>
        <MenuOutline className="ion-icon" />
      </div>
      <div className="search">
        <label>
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={handleChange}
          />
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
