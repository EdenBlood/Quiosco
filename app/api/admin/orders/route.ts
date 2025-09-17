import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return Response.json(orders);
}

//* Completar la orden
export async function POST(req: Request) {
  const { orderId } = await req.json();

  try {
    await prisma.order.update({
      where: { id: +orderId },
      data: { status: true, orderReadyAt: new Date() },
    });

    return NextResponse.json({ success: "Orden finalizada correctamente" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error al completar orden" },
      { status: 500 },
    );
  }
}
