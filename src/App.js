import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";
import HomePage from "./pages/HomePage";
import StationsPage from "./pages/StationsPage";
import StatsPage from "./pages/StatsPage";
import LoginPage from "./pages/LoginPage";
import Cookies from "js-cookie";

// Component bảo vệ route
function PrivateRoute() {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />; // render các route con nếu có token
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Các route dùng layout chung và có bảo vệ */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="stations" element={<StationsPage />} />
            <Route path="stats" element={<StatsPage />} />
          </Route>
        </Route>

        {/* Route không dùng layout, không cần token */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
