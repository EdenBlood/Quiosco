import { create } from "zustand";
import { OrderItem } from "../types/index.types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeOrderItem: (id: Product["id"]) => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToOrder: (product) => {
    const { categoryId, image, ...data } = product;
    let items: OrderItem[] = [];

    if (get().order.find((orderItem) => orderItem.id === data.id)) {
      items = get().order.map((item) =>
        item.id === data.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item
      );
    } else {
      items = [
        ...get().order,
        {
          ...data,
          quantity: 1,
          subtotal: 1 * product.price,
        },
      ];
    }

    set(() => ({
      order: items,
    }));
  },
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item
      ),
    }));
  },
  decreaseQuantity: (id) => {
    const item: OrderItem = get().order.find((item) => item.id === id)!;

    let items: OrderItem[] = [];
    if (item.quantity > 1) {
      items = get().order.map((orderItem) =>
        orderItem.id === item.id
          ? {
              ...orderItem,
              quantity: orderItem.quantity - 1,
              subtotal: orderItem.price * (orderItem.quantity - 1),
            }
          : orderItem
      );
    } else {
      items = get().order.filter((orderItem) => orderItem.id !== item.id);
    }

    set(() => ({
      order: items,
    }));
  },
  removeOrderItem: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },
}));
