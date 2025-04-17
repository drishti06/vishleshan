import { useAppSelector } from "@/lib/store/hooks";
import { RootState } from "@/lib/store/store";
import { Navigate, useLocation } from "react-router";

export function RoleBasedRedirector() {
  const user = useAppSelector((state: RootState) => state.user.loggedInUser);
  const role = user?.authority;
  const location = useLocation();

  if (role === "ROLE_ADMIN" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return null;
}
