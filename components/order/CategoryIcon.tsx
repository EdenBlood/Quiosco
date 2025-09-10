"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Category } from "@prisma/client";

type CategoryIconProps = {
  category: Category;
};

export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams<{ category: string }>();

  return (
    <li>
      <Link
        className={`${
          category.slug === params.category ? "bg-amber-400" : ""
        } flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}
        href={`/order/${category.slug}`}
      >
        <div className="size-16 relative">
          <Image
            fill
            src={`/icon_${category.slug}.svg`}
            alt={`Imagen de ${category.name}`}
          />
        </div>

        <p className="text-xl font-bold">{category.name}</p>
      </Link>
    </li>
  );
}
