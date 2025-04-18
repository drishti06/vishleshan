import "./App.css";
import { Providers } from "./components/providers";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import ProductPage from "./pages/ProductPage";
import { CategoryShowcase } from "./features/category-showcase";
import ShopPage from "./pages/ShopPage";
import Homepage from "./pages/Homepage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import UserLayout from "./components/UserLayout";
import AdminDashboard from "./pages/AdminDashboard";
import { RoleBasedRedirector } from "./components/RoleBasedRedirect";
import OrdersTable from "./components/admin/orders-table";
import { ProductsTable } from "./components/admin/products-table";
import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/SuccessPage";
import CategoryPageAdmin from "./pages/CategoryPageAdmin";
import { UsersTable } from "./components/admin/users-table";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Providers>
        <AnimatePresence mode="wait">
          <RouterProvider router={router} />
        </AnimatePresence>
        <Toaster />
      </Providers>
    </ThemeProvider>
  );
}

const router = createBrowserRouter([
  // Public + User Routes
  {
    path: "/",
    element: (
      <>
        <RoleBasedRedirector />
        <UserLayout />
      </>
    ), // For normal users
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/product/:id", element: <ProductPage /> },
      { path: "/categories", element: <CategoryShowcase /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/checkout/success", element: <CheckoutSuccessPage /> },
    ],
  },

  // Admin Protected Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/admin/dashboard", element: <AdminDashboard /> },
      { path: "/admin/products", element: <ProductsTable /> },
      { path: "/admin/orders", element: <OrdersTable /> },
      { path: "/admin/categories", element: <CategoryPageAdmin /> },
      { path: "/admin/users", element: <UsersTable /> },
    ],
  },
]);

export default App;
