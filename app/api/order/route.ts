import { prisma } from "@/src/lib/prisma";
import { orderSchema } from "@/src/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const result = orderSchema.safeParse(data);

  if (!result.success) {
    return NextResponse.json({ errors: result.error.issues }, { status: 400 });
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

    return NextResponse.json({ success: "Orden creada correctamente" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear la orden" },
      { status: 500 },
    );
  }
}
