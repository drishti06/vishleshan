import { Outlet } from "react-router-dom";
import { SiteHeader } from "./layout/site-header";
import { AuthModal } from "./AuthModal";
import { SiteFooter } from "./layout/site-footer";

const UserLayout = () => {
  return (
    <div>
      <SiteHeader />
      <Outlet />
      <AuthModal />
      <SiteFooter />
    </div>
  );
};

export default UserLayout;
