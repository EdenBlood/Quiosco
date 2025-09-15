import HeadingTitle from "@/components/ui/HeadingTitle";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <HeadingTitle>Producto no encontrado</HeadingTitle>
      <Link
        href={"/admin/products"}
        className="cursor-pointer bg-amber-400 px-10 py-3 text-center text-xl font-bold text-black transition-colors duration-300 hover:bg-amber-600 lg:w-auto"
      >
        Ir a productos
      </Link>
    </div>
  );
}
