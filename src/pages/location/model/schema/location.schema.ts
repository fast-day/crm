import { addressSchema } from "@/shared/schemas/address.schema";
import { RUS_PHONE } from "@/shared/utils";
import z from "zod";

export const locationSchema = addressSchema.extend({
  name: z.string().min(1, "Укажите название"),
  description: z.string().optional(),

  phone: 
    z.string("Укажите номер телефона")
    .min(1, "Укажите номер телефона")
    .refine((v) => {
      return RUS_PHONE.test(v);
    }, "Неверный формат"),
});

export type LocationCreateType = z.infer<typeof locationSchema>;
