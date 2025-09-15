import { formatCurrency, getImagePath } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath: string = getImagePath(product.image);
  return (
    <>
      <article className="flex h-full flex-col border bg-white">
        <div className="relative h-80 w-full">
          <Image
            className="h-full w-full object-cover object-center"
            src={imagePath}
            alt={`Imagen platillo ${product.name}`}
            fill
          />
        </div>

        <div className="flex h-56 w-full flex-col justify-between p-5">
          <h3 className="text-2xl font-bold">{product.name}</h3>

          <div className="space-y-4">
            <p className="text-4xl font-black text-amber-500">
              {formatCurrency(product.price)}
            </p>

            <AddProductButton product={product} />
          </div>
        </div>
      </article>
    </>
  );
}
