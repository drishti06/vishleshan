import { CategoriesHeader } from "@/components/admin/categories-header";
import { CategoriesTable } from "@/components/admin/categories-table";

const CategoryPageAdmin = () => {
  return (
    <div className="flex flex-col gap-5">
      <CategoriesHeader />
      <CategoriesTable />
    </div>
  );
};

export default CategoryPageAdmin;
