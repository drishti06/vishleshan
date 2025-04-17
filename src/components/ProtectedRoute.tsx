// src/components/ProtectedRoute.tsx

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../lib/store/store";
import { ReactElement } from "react";
import AdminLayout from "./AdminLayout";

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
  const user = useSelector((state: RootState) => state.user.loggedInUser); // assumes user is stored in auth slice
  // Default to ROLE_USER if no role is present
  const role = user?.authority || "ROLE_USER";

  // If the user doesn't have an allowed role, redirect
  if (!allowedRoles.includes(role)) {
    return <Navigate to={redirectPath} replace />;
  }

  return <AdminLayout />;
}
