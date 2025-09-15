import AddProductForm from "@/components/admin/AddProductForm";
import ProductForm from "@/components/admin/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import HeadingTitle from "@/components/ui/HeadingTitle";

export default function NewProductPage() {
  return (
    <>
      <HeadingTitle>Crear un Nuevo Producto</HeadingTitle>

      <GoBackButton />

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}
