import OrderCard from "@/components/order/OrderCard";
import HeadingTitle from "@/components/ui/HeadingTitle";
import { prisma } from "@/src/lib/prisma";

async function getPendingOrders() {
  return await prisma.order.findMany({
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
}

export default async function AdminOrdersPage() {
  const orders = await getPendingOrders();

  return (
    <>
      <HeadingTitle>Administrar ordenes</HeadingTitle>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <p className="text-center ">No hay ordenes pendientes</p>
      )}
    </>
  );
}
