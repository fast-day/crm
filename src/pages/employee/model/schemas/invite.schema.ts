import { RUS_PHONE } from "@/shared/utils";
import z from "zod";

export const inviteSchema = z.object({
  first_name: z.string().min(1, "Обязательное поле"),
  last_name: z.string().optional(),
  position: z.string().min(1, "Обязательное поле"),
  role: z.string("Выберите роль").min(1, "Обязательное поле"),
  phone: 
    z.string("Укажите номер телефона")
    .min(1, "Укажите номер телефона")
    .refine((v) => {
      return RUS_PHONE.test(v);
    }, "Неверный формат"),
});

export const inviteCheckSchema = z.object({
  email: z.string().min(1, "Укажите email"),
});

export type InviteCheckSchemaType = z.infer<typeof inviteCheckSchema>;
export type InviteSchemaType = z.infer<typeof inviteSchema>;
