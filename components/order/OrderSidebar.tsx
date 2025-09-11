// import { use } from "react";
import { prisma } from "../../src/lib/prisma";
import Logo from "../ui/Logo";
import CategoryIcon from "./CategoryIcon";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function OrderSidebar() {
  const categories = await getCategories();

  return (
    <aside className="md:w-72 md:h-screen bg-white h-screen overflow-y-auto">
      <Logo />
      <nav className="mt-5">
        <ul>
          {categories.map((category) => (
            <CategoryIcon key={category.id} category={category} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
