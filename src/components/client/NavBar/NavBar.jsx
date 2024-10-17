import React, { useState, useEffect, useRef } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleInputChange = (e) => {
    handleSearchChange(e.target.value);
  };

  const handleSearchClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSearchReset = () => {
    setSearchValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`http://your-api-url/suggestions`, {
        params: { q: query },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    if (searchValue) {
      fetchSuggestions(searchValue);
    } else {
      setSuggestions([]);
    }
  }, [searchValue]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Search: ", searchValue);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="menu-icon">
          <i className="fas fa-bars"></i>
        </div>
        <div className="logo">Architect</div>
        <div className="search-box">
          <button className="btn-search" onClick={handleSearchReset}>
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Type to Search..."
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="suggestion-item">
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="bar-navigation">
        <Link to="/product" className="nav-item">
          Sản phẩm
          <i className="fas fa-caret-down"></i>
        </Link>
        <Link to="/trademark" className="nav-item">
          Thương hiệu
          <i className="fas fa-caret-down"></i>
        </Link>
        <Link to="/gift-cart" className="nav-item">
          Dịch vụ
          <i className="fas fa-caret-down"></i>
        </Link>
        <Link to="/sell" className="nav-item">
          Kênh bán hàng
          <i className="fas fa-caret-down"></i>
        </Link>
      </div>
      <div className="navbar-right">
        <div className="icon nav-first">
          <i className="fas fa-th"></i>
        </div>
        <div className="icon nav-second">
          <i className="fas fa-chart-line"></i>
        </div>
        <div className="icon nav-third">
          <i className="fas fa-shopping-cart"></i>
        </div>
        <div className="profile">
          <img
            alt="Profile picture"
            height="40"
            src="https://storage.googleapis.com/a1aa/image/SPf8v7NdpH3tAyUwZ4FEfPizVJVClXKrFuzszWEEXeGzg6MnA.jpg"
            width="40"
          />
          <div>
            <div className="name">Alina Mcloud</div>
            <div className="role">0 $</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
