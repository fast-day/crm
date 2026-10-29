import { avatarSchema } from "@/shared/schemas/avatar.schema";
import { isPossiblePhoneNumber } from "libphonenumber-js";
import z from "zod";

export const employeeSchema = z.object({
  first_name: z.string().min(1, "Обязательное поле"),
  last_name: z.string().optional(),
  position: z.string().min(1, "Обязательное поле").optional(),
  role: z.string("Выберите роль").min(1, "Обязательное поле").optional(),
  phone: z
    .object({ value: z.string(), masked: z.string() })
    .refine((v) => v.value.length > 0, "Укажите номер телефона")
    .refine((v) => !v.value || isPossiblePhoneNumber(v.value), "Неверный формат")
    .transform((v) => v.masked),

  /* ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ */
  birthdate: z.string().optional().nullable(),
  // note: z.string().optional().nullable(),

  avatar: avatarSchema,
});

export type EmployeeSchemaType = z.infer<typeof employeeSchema>;
