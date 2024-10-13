import React, { useState } from "react"; // Import useState
import logo from "../../assets/nvidialogo.svg";
import "./NavBar.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menu, setMenu] = useState("home"); 
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (menu) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-navigation">
        <ul className="navbar-menu">
          <li>
            <Link
              to="/"
              onClick={() => setMenu("home")}
              className={menu === "home" ? "active" : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="#explore-menu"
              onClick={() => setMenu("menu")}
              className={menu === "menu" ? "active" : ""}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="#app-download"
              onClick={() => setMenu("mobile-app")}
              className={menu === "mobile-app" ? "active" : ""}
            >
              Mobile App
            </Link>
          </li>
          <li>
            <Link
              to="#discount"
              onClick={() => setMenu("discount")}
              className={menu === "discount" ? "active" : ""}
            >
              Discount
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-user">
        {/* Thêm nội dung cho người dùng nếu cần */}
      </div>
    </div>
  );
};

export default NavBar;
