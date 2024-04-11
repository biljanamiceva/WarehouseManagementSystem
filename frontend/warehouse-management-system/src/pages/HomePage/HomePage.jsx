import React from "react";
import "./HomePage.css";
import { images } from "../../constants";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="fullPage">
      <div className="column" style={{ backgroundColor: "white" }}>
        <a>
          <span className="icon">
            <img
              src={images.logoC}
              className="logo"
              style={{ width: 80, height: 80, marginLeft: 30, marginTop: 10 }}
            />
          </span>
        </a>

        <p className="firstParagraph">
          Streamline <br /> Warehouse <br /> Efficiency
        </p>
        <img className="box1" src={images.box1} />
      </div>
      <div className="column" style={{ backgroundColor: "white" }}>
        <img
          src={images.home}
          className="column"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            padding: 0,
            margin: 0,
          }}
        />
      </div>
      <div
        className="column"
        style={{ backgroundColor: "white", borderRight: "1px solid gray" }}
      >
        <h4 className="navbarText">Warehouse Management System</h4>
        <p className="thirdParagraph">
          Optimize <br /> Inventory <br /> Control
        </p>
        <img className="box2" src={images.box2} />
      </div>
      <div className="column" style={{ backgroundColor: "white" }}>
        <div className="homePageBtn">
          <Link to="/login" className="signInButton">Sign in</Link>
        </div>

        <p className="lastParagraph">
          Orders <br /> Sorted <br /> Delivered
        </p>
        <img className="box3" src={images.box3} />
      </div>
    </div>
  );
};

export default HomePage;
