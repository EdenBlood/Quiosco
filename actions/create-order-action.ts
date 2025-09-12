"use server";

import { prisma } from "@/src/lib/prisma";
import { orderSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

export async function createOrder(data: unknown) {
  const result = orderSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.issues,
    };
  }

  try {
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });

    //* Revalidamos los pedidos para que se actualicen
    revalidatePath("/admin/orders");
  } catch (error) {
    console.log(error);
    return;
  }
}
