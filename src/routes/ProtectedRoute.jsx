import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Hiển thị trạng thái chờ khi đang xác thực

  if (!user) {
    return <Navigate to="/login" />; // Điều hướng về trang đăng nhập nếu chưa đăng nhập
  }

  return children; // Cho phép truy cập route nếu đã đăng nhập
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
