"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { orderIdSchema } from "@/src/schema";

export default async function completeOrder(formData: FormData) {
  const data = {
    orderId: formData.get("order_id")!,
  };
  const result = orderIdSchema.safeParse(data);

  if (!result.success) {
    return;
  }

  try {
    await prisma.order.update({
      where: {
        id: result.data.orderId,
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now()),
      },
    });

    //* Revalidamos la ruta de /admin/orders para que se haga un refetch
    revalidatePath("/admin/orders");
  } catch (error) {
    console.log(error);
  }
}
