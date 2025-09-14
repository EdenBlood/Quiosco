import ProductSearchForm from "@/components/admin/ProductSearchForm";
import ProductTable from "@/components/admin/ProductTable";
import HeadingTitle from "@/components/ui/HeadingTitle";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

//* Busqueda con Prisma
async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: { category: true },
  });

  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const params = await searchParams;

  const products = await searchProducts(params.search);

  console.log(products);
  return (
    <>
      <HeadingTitle>
        Resultados de la Búsqueda: {""}
        <span className="font-normal text-amber-700">{params.search}</span>
      </HeadingTitle>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href="/admin/products/new"
          className="w-full cursor-pointer bg-amber-400 px-10 py-3 text-center text-xl font-bold transition-colors duration-300 hover:bg-amber-600 lg:w-auto"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

        <Link 
          href={"/admin/products?page=1"}
          className="inline-block mt-4 text-blue-400 hover:text-blue-600 text-sm transition-colors duration-300"
        >
          ⬅ Volver a todos los productos
        </Link>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center">No hay resultados</p>
      )}
    </>
  );
}
