import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./TopBar.scss";
import axios from "axios";

const TopBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null); // Tạo ref để tham chiếu đến input
  const [suggestions, setSuggestions] = useState([]);

  // Hàm cập nhật giá trị tìm kiếm
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  // Hàm xử lý khi giá trị input thay đổi
  const handleInputChange = (e) => {
    handleSearchChange(e.target.value);
  };

  // Hàm xử lý khi click vào nút tìm kiếm
  const handleSearchClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus vào input khi click
    }
  };

  // Hàm reset giá trị tìm kiếm
  const handleSearchReset = () => {
    setSearchValue(""); // Đặt lại giá trị tìm kiếm về chuỗi rỗng
    if (inputRef.current) {
      inputRef.current.focus(); // Focus vào input sau khi reset
    }
  };

  // Hiển thị giá trị tìm kiếm trên console mỗi khi nó thay đổi
  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`http://your-api-url/suggestions`, {
        params: { q: query }, // Gửi tham số truy vấn
      });
      setSuggestions(response.data); // Cập nhật gợi ý từ phản hồi
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Hiển thị giá trị tìm kiếm trên console mỗi khi nó thay đổi
  useEffect(() => {
    if (searchValue) {
      fetchSuggestions(searchValue); // Gọi hàm lấy gợi ý
    } else {
      setSuggestions([]); // Xóa gợi ý nếu không có giá trị tìm kiếm
    }
  }, [searchValue]);

  return (
    <div className="top-bar-section">
      <div className="top-bar-container">
        <div className="top-bar-left">
          <p>Hotline: 1010 1010</p>
        </div>
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
            ref={inputRef} // Gán ref cho input
          />
        </div>
        <div className="top-bar-right">
          <Link to="/ticket" className="nav-links">
            <i className="fas fa-ticket-alt"></i>
            <span>Gửi ticket</span>
          </Link>
          <Link to="/promotions" className="nav-links">
            <i className="fas fa-gift"></i>
            <span>Khuyến mãi</span>
          </Link>
          <Link to="/events" className="nav-links">
            <i className="fas fa-calendar-alt"></i>
            <span>Sự kiện</span>
          </Link>
          <Link to="/notifications" className="nav-links">
            <i className="fas fa-bell"></i>
            <span>Thông báo</span>
          </Link>
          <Link to="/contact" className="nav-links">
            <i className="fas fa-phone"></i>
            <span>Liên hệ</span>
          </Link>
          <Link to="/about" className="nav-links">
            <i className="fas fa-info-circle"></i>
            <span>Giới thiệu</span>
          </Link>
          <Link to="/profile" className="nav-links">
            <i className="fas fa-book"></i>
            <span>Hồ sơ năng lực</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
