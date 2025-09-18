import { OrderWithProducts } from "@/src/types/index.types";

type LatestOrderItemProps = {
  order: OrderWithProducts;
};

export default function LatestOrderItem({ order }: LatestOrderItemProps) {
  return (
    <article className="space-y-5 rounded-lg bg-white p-5 shadow">
      <p className="text-2xl font-bold text-slate-700">Cliente: {order.name}</p>
      <ul
        role="list"
        className="divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
      >
        {order.orderProducts.map((product) => (
          <li key={product.id} className="flex py-6 text-lg">
            <p>
              <span className="font-bold">{product.quantity}</span>
              {product.product.name} {""}
            </p>
          </li>
        ))}
      </ul>
    </article>
  );
}
