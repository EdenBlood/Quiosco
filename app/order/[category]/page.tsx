import ProductCard from "@/components/products/ProductCard";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
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
  const products = await getProducts(params.category);
  return (
    <>
      <h1 className="text-2xl font-bold">
        Elige y personaliza tu pedido a continuación
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 items-start gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
