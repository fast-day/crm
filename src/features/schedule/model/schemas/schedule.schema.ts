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
        message: "start must be before end",
        path: ["end"],
      }
    )
  ),
});

export type IntervalsSchemaType = z.infer<typeof intervalsSchema>;
