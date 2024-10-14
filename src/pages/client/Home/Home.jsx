import React from "react";
import TopBar from "../../../components/client/TopBar/TopBar";
import NavBar from "../../../components/client/NavBar/NavBar";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <TopBar />
      <NavBar />
      {/* Các nội dung khác của trang chủ có thể được thêm vào đây */}
    </div>
  );
};

export default Home;
