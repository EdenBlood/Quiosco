import { prisma } from "@/src/lib/prisma";
import InputTextForm from "./InputTextForm";
import ImageUpload from "./ImageUpload";
import { Product } from "@prisma/client";

async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}

type ProductFormProps = {
  product?: Product;
};

export default async function ProductForm({ product }: ProductFormProps) {
  const categories = await getCategories();

  return (
    <>
      <InputTextForm
        defaultValue={product && product.name}
        htmlFor="name"
        labelText="Nombre:"
        placeholder="Nombre del Producto..."
      />

      <InputTextForm
        defaultValue={product && String(product.price)}
        htmlFor="price"
        labelText="Precio:"
        placeholder="Precio del Producto..."
      />

      <div className="space-y-2">
        <label htmlFor="categoryId" className="text-slate-800">
          Categoría
          <select
            name="categoryId"
            id="categoryId"
            className="block w-full bg-slate-100 p-3"
            defaultValue={product && product.categoryId}
          >
            <option value="">-- Seleccione ---</option>
            {categories.map(({ id, slug }) => (
              <option key={id} value={id}>
                {slug}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ImageUpload />
    </>
  );
}
