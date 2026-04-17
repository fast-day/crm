import { timeSchema } from "@/shared/schemas/time.schema";
import z from "zod";

export const intervalsSchema = z.object({
  intervals: z.array(
    z.object({
      start: timeSchema,
      end: timeSchema,
    }).refine(
      ({ start, end }) => start < end,
      {
        message: "Начало должно быть раньше окончания",
        path: ["end"],
      }
    )
  ),
});

export type IntervalsSchemaType = z.infer<typeof intervalsSchema>;
