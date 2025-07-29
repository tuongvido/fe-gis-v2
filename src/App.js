import React from "react";
import MobiFoneManagement from "./MobiFoneManagement";
import "./index.css";
import SidebarMenu from "./SideBarMenu";

function App() {
  return (
    <div className="flex h-screen">
      <SidebarMenu />
      <div className="flex-1 overflow-auto">
        <MobiFoneManagement />
      </div>
    </div>
  );
}

export default App;
