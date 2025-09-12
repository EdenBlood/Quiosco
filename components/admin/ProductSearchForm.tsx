"use client";
import { SearchSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {
  //* el useRouter que te permite redirection en el cliente es el del "next/navegation"
  const router = useRouter();

  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };

    const result = SearchSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form className="flex items-center" action={handleSearchForm}>
      <input
        type="text"
        placeholder="Buscar producto..."
        className="w-full bg-white p-2 placeholder-gray-400"
        name="search"
      />

      <input
        type="submit"
        value={"Buscar"}
        className="cursor-pointer bg-indigo-600 p-2 text-center font-bold text-white uppercase"
      />
    </form>
  );
}
