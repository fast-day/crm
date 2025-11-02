import z from "zod";

export const RegisterSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
  password_repeat: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
})
.refine(v => v.password === v.password_repeat, { error: "Пароли не совпадают", path: ["password_repeat", "password"] });

export type RegisterType = z.infer<typeof RegisterSchema>;
