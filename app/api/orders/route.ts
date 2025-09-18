import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      take: 5,
      where: { status: true },
      orderBy: {
        orderReadyAt: "desc",
      },
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error al traer las ordenes",
      status: 500,
    });
  }
}
