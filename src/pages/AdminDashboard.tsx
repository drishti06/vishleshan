import { DashboardCards } from "@/components/admin/dashboard-cards";
import { DashboardHeader } from "@/components/admin/dashboard-header";
import { RecentOrders } from "@/components/admin/recent-orders";
import { TopProducts } from "@/components/admin/top-products";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-5 p-8">
      <DashboardHeader />
      <DashboardCards />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
};

export default AdminDashboard;
