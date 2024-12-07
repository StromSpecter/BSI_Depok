import { Outlet } from "react-router-dom";
import SidebarComponent from "../components/SidebarComponent";

const DashboardLayout = () => {
  return (
    <div className="flex flex-row">
      <div className="fixed top-0 left-0 w-64 h-screen bg-primary-500">
        <SidebarComponent />
      </div>
      <div className="w-full h-full ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
