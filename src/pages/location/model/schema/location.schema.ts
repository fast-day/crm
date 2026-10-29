import { addressSchema } from "@/shared/schemas/address.schema";
import { avatarSchema } from "@/shared/schemas/avatar.schema";
import { timezoneSchema } from "@/shared/schemas/timezone.schema";
import { isPossiblePhoneNumber } from "libphonenumber-js";
import z from "zod";

export const locationSchema = addressSchema.extend({
  name: z.string().min(1, "Укажите название"),
  description: z.string().optional().nullable(),

  phone: z
    .object({ value: z.string(), masked: z.string() })
    .refine((v) => v.value.length > 0, "Укажите номер телефона")
    .refine((v) => !v.value || isPossiblePhoneNumber(v.value), "Неверный формат")
    .transform((v) => v.masked),

  timezone: timezoneSchema,
  avatar: avatarSchema,
});

export type LocationType = z.infer<typeof locationSchema>;
