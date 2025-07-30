import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // chưa validate, nhấn là vào luôn
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng nhập</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tài khoản</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tên đăng nhập"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Mật khẩu</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mật khẩu"
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
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
