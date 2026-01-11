import { z } from "zod";
import { timezoneSchema } from "./timezone.schema";

export const addressSchema = z.object({
  country: z.string("Выберите страну").min(1, "Выберите страну"),
  
  city: z.string().min(1, "Укажите город").optional(),
  region: z.string().min(1, "Укажите регион").optional(),
  street: z.string().optional(),
  house: z.string().optional(),
  post_code: z.string().optional(),

  timezone: timezoneSchema,
  
  lat: z.string().default("56.838933"),
  lng: z.string().default("60.595278"),
});

export type AddressCredentials = z.infer<typeof addressSchema>;
