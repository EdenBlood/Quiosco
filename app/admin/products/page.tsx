import ProductSearchForm from "@/components/admin/ProductSearchForm";
import ProductsPagination from "@/components/admin/ProductsPagination";
import ProductTable from "@/components/admin/ProductTable";
import HeadingTitle from "@/components/ui/HeadingTitle";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

//* Obtenemos los productos
async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize, //* toma 10 para  pagination con Prisma.
    skip: skip, //* saltea la "cantidad" indicada.
    include: {
      category: true,
    },
  });

  return products;
}

//* Forma interesante de darle Types raros y de forma automática por typescript.
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

async function getCountProducts() {
  const count = await prisma.product.count();

  return count;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  if (page < 0) redirect("/admin/products");

  //* Esto bloquea el código. Les quitamos el await para indicarle que solo contenga la función como referencia
  const productsData = getProducts(page, pageSize);
  const productsCountData = getCountProducts();

  //* Hacemos las consultas en simultaneo.
  const [products, productsCount] = await Promise.all([
    productsData,
    productsCountData,
  ]);

  const totalPages = Math.ceil(productsCount / pageSize);

  //* Si la página en la que estamos no existe
  if (page > totalPages) redirect("/admin/products");

  return (
    <>
      <HeadingTitle>Administrar Productos</HeadingTitle>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href="/admin/products/new"
          className="w-full cursor-pointer bg-amber-400 px-10 py-3 text-center text-xl font-bold transition-colors duration-300 hover:bg-amber-600 lg:w-auto"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable products={products} />

      <ProductsPagination page={page} totalPages={totalPages} />
    </>
  );
}
