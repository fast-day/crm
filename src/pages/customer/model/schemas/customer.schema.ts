import { RUS_PHONE } from "@/shared/utils";
import z from "zod";


export const customerCheckSchema = z.object({
  phone: 
  z.string("Укажите номер телефона")
  .min(1, "Укажите номер телефона")
  .refine((v) => {
    return RUS_PHONE.test(v);
  }, "Неверный формат"),
});

export const customerSchema = z.object({
  first_name: z.string().min(1, "Обязательное поле"),
  last_name: z.string().optional(),
  phone: 
    z.string("Укажите номер телефона")
    .min(1, "Укажите номер телефона")
    .refine((v) => {
      return RUS_PHONE.test(v);
    }, "Неверный формат"),

  // birthdate: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
});

export type CustomerCheckSchemaType = z.infer<typeof customerCheckSchema>;
export type CustomerSchemaType = z.infer<typeof customerSchema>;
