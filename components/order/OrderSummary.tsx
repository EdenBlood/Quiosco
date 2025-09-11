"use client";
import { useStore } from "@/src/store/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { orderSchema } from "@/src/schema";
import { toast } from "react-toastify";

export default function OrderSummary() {
  const { order, clearOrder } = useStore();

  const orderTotal = useMemo(
    () => order.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [order]
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total: orderTotal,
      order,
    };

    const result = orderSchema.safeParse(data);

    // Revisamos si hay errores en el cliente
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    const response = await createOrder(data);

    // Validación desde el servidor
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    // Si no hay errores
    toast.success("Pedido realizado correctamente");
    clearOrder();
  };

  return (
    <aside className="lg:h-screen lg:flex lg:flex-col lg:justify-between md:w-64 lg:w-80 p-2">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center my-10 font-bold">El pedido esta vació</p>
      ) : (
        <div className="mt-5 lg:overflow-auto h-full">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className="py-2 space-y-4">
        <p className="text-2xl text-center">
          Total a pagar: {""}
          <span className="font-bold">{formatCurrency(orderTotal)}</span>
        </p>

        <form className="w-full space-y-2 px-4" action={handleCreateOrder}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Tu nombre..."
            className="w-full p-2 bg-white"
          />

          <input
            type="submit"
            className="py-2 uppercase font-bold text-white bg-black not-disabled:hover:bg-gray-800 w-full text-center not-disabled:cursor-pointer disabled:opacity-30"
            value={"Confirmar Pedido"}
          />
        </form>
      </div>
    </aside>
  );
}
