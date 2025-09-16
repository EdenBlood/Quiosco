import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(1, "Tu nombre es obligatorio"),
  total: z.number().min(1, "Hay errores en la orden"),
  order: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      subtotal: z.number(),
    }),
  ),
});

export const orderIdSchema = z.object({
  orderId: z
    .string()
    .transform((value) => parseInt(value))
    .refine((value) => value >= 0, { message: "Hay un error en el id" }),
});

export const SearchSchema = z.object({
  search: z
    .string()
    .trim()
    .min(1, { message: "La busqueda no puede ir vacía" }),
});

export const ProductFormInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre del producto no puede ir vació" }),
  price: z
    .string()
    .min(1, { message: "El precio del producto no puede ir vació" }),
  categoryId: z
    .string()
    .min(1, { message: "La categoría del producto no puede ir vació" }),
  image: z.string().min(1, { message: "El producto no puede no tener imagen" }),
});

export const ProductSchema = ProductFormInputSchema.transform((data) => ({
  name: data.name.trim(),
  price: parseFloat(data.price),
  categoryId: parseInt(data.categoryId, 10),
  image: data.image,
}));
