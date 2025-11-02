import z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Укажите email"),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
});

export type LoginType = z.infer<typeof LoginSchema>;
