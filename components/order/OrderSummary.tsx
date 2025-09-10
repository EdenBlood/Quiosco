"use client";
import { useStore } from "@/src/store/store";
import ProductDetails from "./ProductDetails";

export default function OrderSummary() {
  const { order } = useStore();

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10">El carrito esta vació</p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
        </div>
      )}
    </aside>
  );
}
