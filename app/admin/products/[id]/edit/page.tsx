import EditProductForm from "@/components/admin/EditProductForm";
import ProductForm from "@/components/admin/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import HeadingTitle from "@/components/ui/HeadingTitle";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = await params.id;
  const product = await getProductById(+productId);

  return (
    <>
      <HeadingTitle>Editar Producto: {product.name}</HeadingTitle>

      <GoBackButton />

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}
