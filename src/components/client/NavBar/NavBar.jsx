import React, { useState, useEffect, useRef } from "react";
import "./NavBar.scss"; // Đảm bảo rằng bạn có file CSS tương ứng
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

  return (
    // Đảm bảo bạn trả về JSX
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
            ref={inputRef}
          />
        </div>
      </div>
      <div className="bar-navigation">
        <Link to="/product" className="nav-item">
          Product
          <i className="fas fa-caret-down"></i>
        </Link>
        <Link to="/trademar" className="nav-item">
          Trademar
          <i className="fas fa-caret-down"></i>
        </Link>
        <Link to="/" className="nav-item">
          Gift-Cart
          <i className="fas fa-caret-down"></i>
        </Link>
        <Link to="/" className="nav-item">
          Sell
          <i className="fas fa-caret-down"></i>
        </Link>
      </div>
      <div className="navbar-right">
        <div className="icon">
          <i className="fas fa-th"></i>
        </div>
        <div className="icon">
          <img
            alt="German flag"
            height="20"
            src="https://storage.googleapis.com/a1aa/image/8kdnQfez0PmJaE2bE8elP8BSXjufTqYe1ll3qyrembU0FUn5E.jpg"
            width="20"
          />
        </div>
        <div className="icon">
          <i className="fas fa-chart-line"></i>
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
            <div className="role">VP People Manager</div>
          </div>
          <i className="fas fa-caret-down"></i>
        </div>
        <div className="calendar-icon">
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
