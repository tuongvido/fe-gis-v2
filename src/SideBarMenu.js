import React from 'react';
import { Home, Upload, Download, LogOut } from 'lucide-react';

const menuItems = [
  { label: 'Home', icon: <Home className="w-5 h-5" />, href: '#' },
  { label: 'Import Data', icon: <Upload className="w-5 h-5" />, href: '#' },
  { label: 'Export Data', icon: <Download className="w-5 h-5" />, href: '#' },
  { label: 'Logout', icon: <LogOut className="w-5 h-5" />, href: '#' },
];

const SidebarMenu = () => {
  return (
    <div className="bg-white h-screen w-56 shadow-md flex flex-col">
      <div className="flex items-center justify-center h-16 text-blue-600 font-bold text-lg border-b">
        📡 MobiFone
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2 mt-4">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <a
                href={item.href}
                className="flex items-center gap-3 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="text-sm text-gray-400 text-center mb-4">© 2025 MobiFone</div>
    </div>
  );
};

export default SidebarMenu;
