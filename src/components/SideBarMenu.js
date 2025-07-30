import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, List, BarChart2, LogOut, ChevronLeft, ChevronRight } from "lucide-react";

const menuItems = [
  { label: "Trang chủ", icon: <Home className="w-5 h-5" />, to: "/home" },
  { label: "Danh sách trạm", icon: <List className="w-5 h-5" />, to: "/stations" },
  { label: "Thống kê", icon: <BarChart2 className="w-5 h-5" />, to: "/stats" },
  { label: "Đăng xuất", icon: <LogOut className="w-5 h-5" />, to: "/login" },
];

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`bg-[#f1f5f9] h-screen shadow-md flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-48"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <span className="text-blue-600 font-bold text-lg">📡</span>
        {!collapsed && <span className="text-blue-600 font-bold text-lg ml-2 whitespace-nowrap">MobiFone</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-600">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2 mt-4">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition ${
                  location.pathname === item.to
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {item.icon}
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="text-sm text-gray-400 text-center mb-4">{!collapsed && "© 2025 MobiFone"}</div>
    </div>
  );
};

export default SidebarMenu;
