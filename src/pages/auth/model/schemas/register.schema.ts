import { isPossiblePhoneNumber } from 'libphonenumber-js';
import z from "zod";

export const RegisterSchema = z.object({
  email: z.string().min(1, "Укажите email"),
  first_name: z.string().min(1, "Обязательное поле"),
  last_name: z.string().min(1, "Обязательное поле"),
  phone: z
    .object({ value: z.string(), masked: z.string() })
    .refine((v) => v.value.length > 0, "Укажите номер телефона")
    .refine((v) => !v.value || isPossiblePhoneNumber(v.value), "Неверный формат")
    .transform((v) => v.masked),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
  agree: z.boolean().refine((v) => v, { error: "Необходимо согласие" }),
});

export type RegisterType = z.infer<typeof RegisterSchema>;
