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

const time = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Формат ЧЧ:ММ");

export const bulkScheduleSchema = z
  .object({
    intervals: z
      .array(
        z.object({ start: time, end: time }).refine((i) => i.end > i.start, {
          message: "Конец должен быть позже начала",
          path: ["end"],
        })
      )
      .min(1),
  })
  .superRefine(({ intervals }, ctx) => {
    intervals.forEach((b, j) => {
      intervals.slice(0, j).forEach((a) => {
        if (a.start < b.end && b.start < a.end) {
          ctx.addIssue({ code: "custom", message: "Интервалы пересекаются", path: ["intervals", j, "start"] });
        }
      });
    });
  });

export type BulkScheduleForm = z.infer<typeof bulkScheduleSchema>;
export type ScheduleSlot = { date: string; start: string; end: string };

export const toSlots = (dates: string[], { intervals }: BulkScheduleForm): ScheduleSlot[] =>
  [...dates].sort().flatMap((date) => intervals.map(({ start, end }) => ({ date, start, end })));
