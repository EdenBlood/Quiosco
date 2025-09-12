import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

export default function ProductsPagination({
  page,
  totalPages,
}: ProductsPaginationProps) {
  return (
    <nav className="flex justify-center gap-4 py-10">
      {page > 1 && (
        <Link
          className="bg-white px-3 py-1 text-xl font-bold text-gray-600 ring-1 ring-gray-300 transition-colors duration-300 ring-inset hover:bg-amber-400 hover:text-black focus:z-20 focus:outline-offset-0"
          href={`/admin/products?page=${--page}`}
        >
          &laquo;
        </Link>
      )}
      {page < totalPages && (
        <Link
          className="bg-white px-3 py-1 text-xl font-bold text-gray-600 ring-1 ring-gray-300 transition-colors duration-300 ring-inset hover:bg-amber-400 hover:text-black focus:z-20 focus:outline-offset-0"
          href={`/admin/products?page=${++page}`}
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
