import React from "react";
import { Route, Routes } from "react-router-dom"; // Nhớ sử dụng Routes thay cho Switch
import AdminHome from "../pages/admin/AdminHome/AdminHome"; // Ví dụ về component AdminHome

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Route dành cho trang chủ admin */}
      <Route path="/" element={<AdminHome />} />
      {/* Thêm các route admin khác ở đây nếu cần */}
    </Routes>
  );
};

export default AdminRoutes;
