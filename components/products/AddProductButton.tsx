"use client";

import { useStore } from "@/src/store/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
  product: Product;
};

export default function AddProductButton({ product }: AddProductButtonProps) {
  const { addToOrder } = useStore();

  return (
    <button
      type="button"
      className="block bg-indigo-600 hover: not-disabled:hover:bg-indigo-800 text-white disabled:opacity-60 disabled:cursor-not-allowed w-full p-3 uppercase font-bold cursor-pointer"
      onClick={() => addToOrder(product)}
    >
      Agregar
    </button>
  );
}
