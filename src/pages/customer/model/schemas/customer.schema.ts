import { isPossiblePhoneNumber } from "libphonenumber-js";
import z from "zod";


export const customerCheckSchema = z.object({
  phone: z
    .object({ value: z.string(), masked: z.string() })
    .refine((v) => v.value.length > 0, "Укажите номер телефона")
    .refine((v) => !v.value || isPossiblePhoneNumber(v.value), "Неверный формат")
    .transform((v) => v.masked),
});

export const customerSchema = z.object({
  first_name: z.string().min(1, "Обязательное поле"),
  last_name: z.string().optional(),
  phone: z
    .object({ value: z.string(), masked: z.string() })
    .refine((v) => v.value.length > 0, "Укажите номер телефона")
    .refine((v) => !v.value || isPossiblePhoneNumber(v.value), "Неверный формат")
    .transform((v) => v.masked),

  // birthdate: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
});

export type CustomerCheckSchemaType = z.infer<typeof customerCheckSchema>;
export type CustomerSchemaType = z.infer<typeof customerSchema>;
