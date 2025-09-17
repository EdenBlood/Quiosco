import ProductCard from "@/components/products/ProductCard";
import HeadingTitle from "@/components/ui/HeadingTitle";
import { prisma } from "@/src/lib/prisma";
import { Product } from "@prisma/client";

async function getProducts(category: string) {
  const products: Product[] = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });

  return products;
}

type OrderPageProps = {
  params: {
    category: string;
  };
};

export default async function OrderPage({ params }: OrderPageProps) {
  const { category } = await params; // Hay que esperar a los parámetros.
  const products = await getProducts(category);
  return (
    <>
      <HeadingTitle>Elige y personaliza tu pedido a continuación</HeadingTitle>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
