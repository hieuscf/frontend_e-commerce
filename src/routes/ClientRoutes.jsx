import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/client/Home/Home";

const ClientRoutes = () => {
  return (
    <Routes>
      {/* Route dành cho trang chủ */}
      <Route path="/" element={<Home />} />
      {/* Thêm các route khác ở đây nếu cần */}
    </Routes>
  );
};

export default ClientRoutes;
