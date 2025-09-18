"use client";
import useSWR from "swr";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/src/types/index.types";
import LatestOrderItem from "@/components/orders/LatestOrderItem";

export default function OrdersPage() {
  const url = "/api/orders";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);

  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <div>Cargando...</div>;

  if (data)
    return (
      <>
        <h1 className="mt-20 text-center text-6xl font-black">
          Ordenes Listas
        </h1>
        <Logo />
        {data.length ? (
          <div className="gird-cols-1 mx-auto mt-10 grid max-w-5xl gap-5">
            {data.map((order) => (
              <LatestOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="my-10 text-center">No hay ordenes listas</p>
        )}
      </>
    );
}
