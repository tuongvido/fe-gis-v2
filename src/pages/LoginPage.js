import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { login } from "../api/authService";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Nếu đã có token thì điều hướng sang /home luôn
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate("/home");
    } catch (error) {
      alert("Đăng nhập thất bại!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng nhập</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tài khoản</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tên đăng nhập"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mật khẩu"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
