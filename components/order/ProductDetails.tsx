import { useStore } from "@/src/store/store";
import { OrderItem } from "@/src/types/index.types";
import { formatCurrency } from "@/src/utils";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

type ProductDetailsProps = {
  item: OrderItem;
};

export default function ProductDetails({ item }: ProductDetailsProps) {
  const { decreaseQuantity, increaseQuantity, removeOrderItem } = useStore();
  const MIN_ITEMS = 1;
  const isDisabledMinItems = useMemo(
    () => item.quantity <= MIN_ITEMS,
    [item.quantity]
  );

  return (
    <>
      <div className="shadow space-y-1 p-4 bg-white border-t border-gray-200">
        <div className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <p className="text-xl font-bold">{item.name}</p>

            <button
              type="button"
              onClick={() => {
                removeOrderItem(item.id);
              }}
            >
              <XCircleIcon className="text-red-600 not-disabled:hover:text-red-700 size-8 not-disabled:cursor-pointer transition-colors duration-300" />
            </button>
          </div>
          <p className="text-2xl text-amber-500 font-black">
            {formatCurrency(item.price)}
          </p>
          <div className="flex items-center p-2 bg-gray-100 w-fit rounded-lg">
            <button
              type="button"
              className="not-disabled:cursor-pointer not-disabled:hover:text-red-700 transition-colors duration-300 disabled:opacity-30"
              onClick={() => {
                decreaseQuantity(item.id);
              }}
              disabled={isDisabledMinItems}
            >
              <MinusIcon className="size-6" />
            </button>

            <p className="text-lg font-black min-w-10 max-w-16 text-center">
              {item.quantity}
            </p>

            <button
              onClick={() => {
                increaseQuantity(item.id);
              }}
              type="button"
              className="not-disabled:cursor-pointer not-disabled:hover:text-amber-600 transition-colors duration-300"
            >
              <PlusIcon className="size-6" />
            </button>
          </div>
          <p className="text-xl font-black text-gray-700">
            Subtotal: {""}
            <span className="font-normal">{formatCurrency(item.subtotal)}</span>
          </p>
        </div>
      </div>
    </>
  );
}
