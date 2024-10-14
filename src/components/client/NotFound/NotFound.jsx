import React, { useEffect, useState } from "react";
import "./NotFound.scss"; // Nếu bạn có file SCSS
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NotFound = () => {
  const [count, setCount] = useState(0);
  const targetCount = 404;
  const navigate = useNavigate(); // Khai báo navigate

  useEffect(() => {
    const animateCount = () => {
      const increment = Math.ceil(targetCount / 200); // Tăng mỗi lần
      const interval = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount + increment >= targetCount) {
            clearInterval(interval);
            return targetCount; // Đến 404 và dừng lại
          }
          return prevCount + increment;
        });
      }, 10); // Thay đổi 10ms
    };

    animateCount();
  }, []);

  const handleBackToClient = () => {
    navigate("/client");
  };
  return (
    <div className="not-found">
      <div className="container-not-found">
        <div className="row-not-found">
          <div className="xs-12 md-6 mx-auto">
            <div id="countUp">
              <div className="number-not-found">{count}</div>
              <div className="text-not-found">Page not found</div>
              <div className="text-not-found">This may not mean anything.</div>
              <div className="text-not-found">
                I am probably working on something that has blown up.
              </div>
              <button className="button" onClick={handleBackToClient}>
                click me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
