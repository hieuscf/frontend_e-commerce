import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Tạo một context để chia sẻ trạng thái người dùng
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Trạng thái của người dùng (nếu đã đăng nhập)
  const [loading, setLoading] = useState(true); // Trạng thái chờ khi xác thực token
  const token = Cookies.get("token");
  const navigate = useNavigate();

  // Hàm để hiển thị thông báo
  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get("/api/auth/private", {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Kiểm tra phản hồi của API xem người dùng có hợp lệ không
          if (!response.data || response.data === "") {
            setUser(null);
            notifyError("Vui lòng đăng nhập để tiếp tục");
            setTimeout(() => {
              navigate("/login");
            }, 2000); // Điều hướng tới trang đăng nhập nếu không hợp lệ
          } else {
            setUser(response.data); // Lưu trạng thái người dùng hợp lệ
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
          notifyError("Xảy ra lỗi trong quá trình xác thực");
          setTimeout(() => {
            navigate("/login");
          }, 2000); // Điều hướng tới trang đăng nhập khi có lỗi
        }
      } else {
        notifyError("Bạn chưa đăng nhập, vui lòng đăng nhập");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Điều hướng nếu không có token
      }
      setLoading(false);
    };

    fetchUser();
  }, [token, navigate]);

  return (
    <AuthContext.Provider value={{ user, loading, token }}>
      <ToastContainer />
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
