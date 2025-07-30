// src/layouts/MainLayout.js
import SidebarMenu from "./components/SideBarMenu";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <SidebarMenu />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
