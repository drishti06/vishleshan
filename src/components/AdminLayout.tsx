import { Outlet } from "react-router-dom";
import { AuthModal } from "./AuthModal";
import { AdminSidebar } from "./admin/admin-sidebar";
import { Toaster } from "sonner";

const AdminLayout = () => {
  return (
    <>
    <div className="w-screen overflow-hidden h-screen grid grid-cols-12">
        <div className="col-span-2">
          <AdminSidebar />
        </div>
        <div className="col-span-10 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
      <Toaster />
      <AuthModal />
    </>
  );
};

export default AdminLayout;
