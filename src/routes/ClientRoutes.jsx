import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/client/Home/Home";
import Login from "../components/Login/Login";
import SignUp from "../components/client/SignUp/SignUp";
import DashBoard from "../pages/client/DashBoard/DashBoard";
import ProtectedRoute from "./ProtectedRoute";
import { AuthContext } from "../contexts/AuthContext";

const ClientRoutes = () => {
  const { user } = useContext(AuthContext); // Lấy thông tin user từ AuthContext

  return (
    <Routes>
      {/* Nếu chưa đăng nhập, hiển thị các route cho Home, Login và SignUp */}
      {!user ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </>
      ) : (
        /* Nếu đã đăng nhập, cho phép truy cập route Dashboard */
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      )}
    </Routes>
  );
};

export default ClientRoutes;
