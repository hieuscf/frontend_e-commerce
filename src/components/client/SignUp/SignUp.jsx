import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate phía client
    if (!validateEmail(data.email)) {
      notifyError("Email không hợp lệ");
      return;
    }

    if (!validatePassword(data.password)) {
      notifyError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        {
          fullname: data.fullname,
          email: data.email,
          password: data.password,
        }
      );

      if (response.data.success) {
        notifySuccess(response.data.message);

        
        setTimeout(() => {
          navigate("/login");
        }, 2000); 
      } else {
        notifyError(response.data.message);
      }
    } catch (error) {
      notifyError("Đã xảy ra lỗi trong quá trình đăng ký.");
    } finally {
      setIsLoading(false); // Tắt trạng thái loading
    }
  };

  return (
    <div className="signup" id="signup">
      <div className="form-wrapper">
        <div className="form-signup-container">
          <form className="form-sign-up" onSubmit={handleSignup}>
            <h1 className="sign-in-title">Đăng ký</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span className="span-sign-up">
              hoặc sử dụng email của bạn để đăng ký
            </span>
            <input
              className="input-sign-up"
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={data.fullname}
              onChange={onChangeHandler}
              required
            />
            <input
              className="input-sign-up"
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={onChangeHandler}
              required
            />
            <input
              className="input-sign-up"
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={onChangeHandler}
              required
            />
            <button
              className="button-sign-up"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>
        </div>
        <ToastContainer />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <Link to="/home">
                <h1 className="sign-in-title sign-up-navigation">
                  Chào mừng !
                </h1>
              </Link>
              <p>
                để giữ kết nối với chúng tôi vui lòng đăng nhập với thông tin cá
                nhân của bạn
              </p>
              <Link to="/login">
                <button className="ghost button-sign-up" id="signin">
                  Đăng nhập
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
