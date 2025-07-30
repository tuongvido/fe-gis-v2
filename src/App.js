import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import HomePage from "./pages/HomePage";
import StationsPage from "./pages/StationsPage";
import StatsPage from "./pages/StatsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Các route dùng layout chung */}
        <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="stations" element={<StationsPage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>

        {/* Route riêng (ví dụ: login không cần layout) */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
