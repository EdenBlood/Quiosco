import { formatCurrency } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <>
      <article className="border bg-white flex flex-col h-full">
        <div className="relative h-80 w-full">
          <Image
            className="object-cover object-center w-full h-full"
            src={`/products/${product.image}.jpg`}
            alt={`Imagen platillo ${product.name}`}
            fill
          />
        </div>

        <div className="h-56 w-full p-5 flex flex-col justify-between">
          <h3 className="text-2xl font-bold">{product.name}</h3>

          <div className="space-y-4">
            <p className="font-black text-4xl text-amber-500">
              {formatCurrency(product.price)}
            </p>

            <AddProductButton product={product} />
          </div>
        </div>
      </article>
    </>
  );
}
