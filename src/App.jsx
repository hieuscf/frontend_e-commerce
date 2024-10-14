import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ClientRoutes from "./routes/ClientRoutes"; // Cấu hình route cho khách hàng và người bán
import AdminRoutes from "./routes/AdminRoutes"; // Cấu hình route cho admin
import NotFound from "./components/client/NotFound/NotFound"; // Trang báo lỗi 404

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route dành cho khách hàng và người bán */}
          <Route path="/client/*" element={<ClientRoutes />} />

          {/* Route dành cho admin */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Route 404 */}
          <Route path="/404" element={<NotFound />} />

          {/* Redirect cho tất cả các route không khớp */}
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
