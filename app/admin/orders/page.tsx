"use client";
import OrderCard from "@/components/order/OrderCard";
import HeadingTitle from "@/components/ui/HeadingTitle";
import { OrderWithProducts } from "@/src/types/index.types";
import useSWR from "swr";

export default function AdminOrdersPage() {
  const url = "/api/admin/orders";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data: orders, isLoading } = useSWR<OrderWithProducts[]>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  if (isLoading) return <div>Cargando...</div>;

  if (orders)
    return (
      <>
        <HeadingTitle>Administrar ordenes</HeadingTitle>

        {orders.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center">No hay ordenes pendientes</p>
        )}
      </>
    );
}
