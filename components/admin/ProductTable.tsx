import { ProductsWithCategory } from "@/app/admin/products/page";
// import { ProductAndCategory } from "@/src/types/index.types";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";

//* Las dos opciones
// type ProductTableProps = {
//   products: ProductAndCategory[];
// };
type ProductTableProps = {
  products: ProductsWithCategory;
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <>
      <div className="mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="lg:lx-8 inline-block min-w-full bg-white p-5 py-2 align-middle sm:px-6">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Producto
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Precio
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Categoría
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                    >
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {products.length ? (
                    <>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                            {product.name}
                          </td>

                          <td className="px-3 py-4 text-sm font-medium whitespace-nowrap text-gray-500 sm:pl-0">
                            {formatCurrency(product.price)}
                          </td>

                          <td className="px-3 py-4 text-sm font-medium whitespace-nowrap text-gray-500 sm:pl-0">
                            {product.category.name}
                          </td>

                          <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pl-0">
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="text-indigo-600 transition-colors duration-300 hover:text-indigo-800"
                            >
                              <span className="sr-only">Editar</span>,{" "}
                              {product.name}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <p>Aún no agregaste ningún producto</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
