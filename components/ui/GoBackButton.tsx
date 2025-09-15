"use client";
import { useRouter } from "next/navigation";

export default function GoBackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="mt-4 inline-block cursor-pointer text-sm text-blue-400 transition-colors duration-300 hover:text-blue-600"
    >
      ⬅ Volver
    </button>
  );
}
