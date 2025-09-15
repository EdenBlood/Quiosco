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

export const ProductFormDataSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "El nombre del producto no puede ir vació" }),
  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: "El precio debe ser mayor a 0" }),
  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "La categoría es obligatoria" }),
  image: z.string().min(1, { message: "La imagen es obligatoria" }),
});
