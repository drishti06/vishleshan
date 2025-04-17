import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { RootState } from "../lib/store/store";
import { ReactElement } from "react";

interface ProtectedRouteProps {
  allowedRoles: string[];
  redirectPath?: string;
  children: ReactElement;
}

export default function ProtectedRoute({
  allowedRoles,
  redirectPath = "/",
  children,
}: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.user.loggedInUser);
  const role = user?.authority || "ROLE_USER";
  const location = useLocation();

  // If user is not authorized, redirect to specified path
  if (!allowedRoles.includes(role)) {
    return <Navigate to={redirectPath} replace />;
  }

  // If user is ROLE_ADMIN but not already at /admin, redirect to /admin
  if (role === "ROLE_ADMIN" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
