import { Outlet } from "react-router-dom";
import { AuthModal } from "./AuthModal";
import { AdminSidebar } from "./admin/admin-sidebar";

const AdminLayout = () => {
  return (
    <div className="">
      <div className="flex">
        <AdminSidebar />
        <Outlet />
      </div>
      <AuthModal />
    </div>
  );
};

export default AdminLayout;
