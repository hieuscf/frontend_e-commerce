import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }
      );

      // Kiểm tra phản hồi từ backend và hiển thị thông báo
      if (response.data.success) {
        notifySuccess(response.data.message);
        navigate("/client/login"); // Chuyển hướng đến trang đăng nhập
      } else {
        notifyError(response.data.message); // Thông báo lỗi từ server
      }
    } catch (error) {
      console.error("Error during signup:", error);
      notifyError("Đã xảy ra lỗi trong quá trình đăng ký."); // Lỗi từ client
    }
  };

  return (
    <div className="signup" id="signup">
      <div className="form-wrapper">
        <div className="form-signup-container">
          <form action="post" className="form-sign-up" onSubmit={handleSignup}>
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
              name="fullName"
              placeholder="Full Name"
              value={data.fullName}
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
            <button className="button-sign-up" type="submit">
              Đăng ký
            </button>
          </form>
        </div>
        <ToastContainer />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <Link to="/client">
                <h1 className="sign-in-title sign-up-navigation">Chào mừng !</h1>
              </Link>
              <p>
                để giữ kết nối với chúng tôi vui lòng đăng nhập với thông tin cá
                nhân của bạn
              </p>
              <Link to="/client/login">
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
