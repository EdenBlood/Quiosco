"use server";

import { prisma } from "@/src/lib/prisma";
import { ProductFormDataSchema } from "@/src/schema";

export async function createProduct(data: unknown) {
  const result = ProductFormDataSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  await prisma.product.create({
    data: result.data,
  });
}
