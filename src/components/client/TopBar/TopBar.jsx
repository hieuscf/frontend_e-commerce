import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./TopBar.scss";



const TopBar = () => {
  const authStatus = null;
  const logout = false;

  return (
    <div className="top-bar-section">
      <div className="top-bar-container">
        <div className="top-bar-left">
          <p>Hotline: 1010 1010</p>
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
            <span>Hỗ Trợ Khách Hàng</span>
          </Link>
          {authStatus === null ? (
            <>
              <Link to="/login" className="nav-links">
                {/* <i className="fas fa-info-circle"></i> */}
                <span>Đăng Nhập</span>
              </Link>
              <Link to="/signup" className="nav-links">
                {/* <i className="fas fa-book"></i> */}
                <span>Đăng Ký</span>
              </Link>
            </>
          ) : (
            <button onClick={logout} className="nav-links">
              Đăng Xuất
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
