import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/client/Home/Home";
import Login from "../components/Login/Login";
import SignUp from "../components/client/SignUp/SignUp";

const ClientRoutes = () => {
  return (
    <Routes>
      {/* Route dành cho trang chủ */}
      <Route path="/" element={<Home />} />
      {/* Route dành cho trang đăng nhập*/}
      <Route path="/login" element={<Login />} />
      {/* Route dành cho trang đăng ký*/}
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default ClientRoutes;
