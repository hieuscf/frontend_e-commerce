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
import AuthProvider from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            {/* Route dành cho khách hàng và người bán */}
            <Route path="/*" element={<ClientRoutes />} />
            {/* Route dành cho admin */}
            <Route path="/admin/*" element={<AdminRoutes />} />
            {/* Route 404 */}
            <Route path="/404" element={<NotFound />} />
            {/* Redirect cho tất cả các route không khớp */}
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
