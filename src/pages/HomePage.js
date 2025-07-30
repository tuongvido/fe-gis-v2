import SidebarMenu from "../components/SideBarMenu"
import MobiFoneManagement from "../MobiFoneManagement";

function HomePage() {
  return (
    <div className="flex h-screen">
      <SidebarMenu />
      <div className="flex-1 overflow-auto">
        <MobiFoneManagement />
      </div>
    </div>
  );
}

export default HomePage;
