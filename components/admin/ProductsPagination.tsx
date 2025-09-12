import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProductsPagination({
  page,
  totalPages,
}: ProductsPaginationProps) {
  //* Creamos un array con todas las páginas que debe tener la pagination
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center gap-2 py-10">
      {page > 1 && (
        <Link
          className="bg-white px-3 py-1 text-xl font-bold text-gray-600 ring-1 ring-gray-300 transition-colors duration-300 ring-inset hover:bg-amber-400 hover:text-black focus:z-20 focus:outline-offset-0"
          href={`/admin/products?page=${page - 1}`}
        >
          &laquo;
        </Link>
      )}

      {pages.map((currentPage) => (
        <Link
          className={`${currentPage === page ? "pointer-events-none bg-amber-400 text-black" : "bg-white hover:bg-amber-400 hover:text-black"} px-3 py-1 text-xl font-bold text-gray-600 ring-1 ring-gray-300 transition-colors duration-300 ring-inset focus:z-20 focus:outline-offset-0`}
          key={currentPage}
          href={`/admin/products?page=${currentPage}`}
        >
          {currentPage}
        </Link>
      ))}

      {page < totalPages && (
        <Link
          className="bg-white px-3 py-1 text-xl font-bold text-gray-600 ring-1 ring-gray-300 transition-colors duration-300 ring-inset hover:bg-amber-400 hover:text-black focus:z-20 focus:outline-offset-0"
          href={`/admin/products?page=${page + 1}`}
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
