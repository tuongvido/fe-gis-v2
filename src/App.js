import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import HomePage from "./pages/HomePage";
import StationsPage from "./pages/StationsPage";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/stations" element={<StationsPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
