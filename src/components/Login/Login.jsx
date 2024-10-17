import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );

      // Kiểm tra phản hồi từ backend và hiển thị thông báo
      if (response.data.success) {
        Cookies.set("token", response.data.token, { expires: 7 }); 
        notifySuccess(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
        
      } else {
        notifyError(response.data.message); // Thông báo lỗi từ server
      }
    } catch (error) {
      notifyError("Đã xảy ra lỗi trong quá trình đăng nhập."); // Lỗi từ client
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  return (
    <div>
      <div className="signup" id="signup">
        <div className="form-wrapper">
          <div className="form-signup-container form-signin-container">
            <form action="POST" className="form-sign-up" onSubmit={handleLogin}>
              <h1 className="sign-in-title">Đăng nhập</h1>
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
                hoặc sử dụng email của bạn để đăng nhập
              </span>
              <input
                name="email"
                className="input-sign-up"
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={onChangeHandler}
                required
              />
              <input
                name="password"
                className="input-sign-up"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={onChangeHandler}
                required
              />
              <Link to="/client/login/repass" className="span-sign-up repass">
                Quên mật khẩu ?
              </Link>
              <button className="button-sign-up">Đăng nhập</button>
            </form>
            <ToastContainer />
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <Link to="/home">
                  <h1 className="sign-in-title sign-in-navigation">
                    Xin chào !
                  </h1>
                </Link>
                <p>
                  Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng
                  tôi
                </p>
                <Link to="/signup">
                  <button className="ghost button-sign-up" id="signin">
                    Đăng ký
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
