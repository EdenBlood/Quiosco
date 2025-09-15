"use client";
import { ProductFormDataSchema } from "@/src/schema";
import ButtonSubmit from "./ButtonSubmit";
import { toast } from "react-toastify";
import { createProduct } from "@/actions/create-product-action";
import { useRouter } from "next/navigation";

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const result = ProductFormDataSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    const response = await createProduct(result.data);

    if (response?.errors) {
      response.errors.forEach((issue) => toast.error(issue.message));
      return;
    }

    toast.success("Producto creado correctamente");
    router.push("/admin/products");
  };

  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-md bg-white px-5 py-10 shadow-md">
      <form action={handleSubmit} className="space-y-5">
        {children}

        <ButtonSubmit
          values={["Guardar Cambios", "Guardando..."]}
          className="mt-5"
        />
      </form>
    </div>
  );
}
