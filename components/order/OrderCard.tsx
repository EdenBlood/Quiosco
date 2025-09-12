import completeOrder from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types/index.types";
import { formatCurrency } from "@/src/utils";

type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 flex h-full flex-col justify-between rounded-lg bg-gray-50 px-4 py-6 shadow-md sm:p-6 lg:mt-0 lg:p-8"
    >
      <div>
        <p className="text-2xl font-medium text-gray-900">
          Cliente: {""}
          <span className="font-bold">{order.name}</span>
        </p>
        <p className="text-lg font-medium text-gray-900">
          Productos Ordenados:
        </p>
      </div>

      <form
        className="flex h-full flex-col justify-between"
        action={completeOrder}
      >
        <div className="mt-4">
          {order.orderProducts.map((product) => (
            <div
              key={product.productId}
              className="flex items-center justify-between border-t border-gray-200 py-4 last-of-type:border-b"
            >
              <label
                className="group flex w-full cursor-pointer items-center gap-2 text-sm font-black"
                htmlFor={`checkbox_${order.name}_${product.id}_${product.quantity}`}
              >
                <span className="text-gray-800 transition-colors duration-300 group-hover:text-indigo-800">
                  ({product.quantity})
                </span>

                <span className="font-medium text-gray-700 transition-colors duration-300 group-hover:text-indigo-700">
                  {product.product.name}
                </span>
              </label>
              <input
                type="checkbox"
                id={`checkbox_${order.name}_${product.id}_${product.quantity}`}
                name={`checkbox_${order.name}_${product.id}_${product.quantity}`}
                required
                className="size-4 transition-colors duration-300 checked:accent-green-200"
              />
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between pt-4">
            <dt className="text-base font-medium text-gray-900">
              Total a Pagar: {""}
              <span className="font-bold">{formatCurrency(order.total)}</span>
            </dt>
            <dd className="text-base font-medium text-gray-900">{}</dd>
          </div>

          <input type="hidden" value={order.id} name="order_id" />

          <input
            className="mt-5 w-full bg-indigo-600 p-3 font-bold text-white uppercase not-disabled:cursor-pointer not-disabled:hover:bg-indigo-800"
            type="submit"
            value="Marcar Order Completada"
          />
        </div>
      </form>
    </section>
  );
}
