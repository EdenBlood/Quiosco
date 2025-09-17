"use client";
import { useStore } from "@/src/store/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { mutate } from "swr";
import { orderSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { $ZodIssue } from "zod/v4/core";

export default function OrderSummary() {
  const { order, clearOrder } = useStore();

  const orderTotal = useMemo(
    () => order.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [order],
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
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(response, response.status);

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      toast.error(json.error || "Error en el servidor");
      return;
    }

    // Validación desde el servidor
    if (json.errors) {
      const errors: $ZodIssue[] = json.errors;
      errors.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    // Si no hay errores
    toast.success("Pedido realizado correctamente");
    clearOrder();

    mutate("/api/admin/orders");
  };

  return (
    <aside className="p-2 md:w-64 lg:flex lg:h-screen lg:w-80 lg:flex-col lg:justify-between">
      <h1 className="text-center text-4xl font-black">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="my-10 text-center font-bold">El pedido esta vació</p>
      ) : (
        <div className="mt-5 h-full lg:overflow-auto">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className="space-y-4 py-2">
        <p className="text-center text-2xl">
          Total a pagar: {""}
          <span className="font-bold">{formatCurrency(orderTotal)}</span>
        </p>

        <form
          className="w-full space-y-2 px-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            await handleCreateOrder(formData);
          }}
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Tu nombre..."
            className="w-full bg-white p-2"
          />

          <input
            type="submit"
            className="w-full bg-black py-2 text-center font-bold text-white uppercase not-disabled:cursor-pointer not-disabled:hover:bg-gray-800 disabled:opacity-30"
            value={"Confirmar Pedido"}
          />
        </form>
      </div>
    </aside>
  );
}
