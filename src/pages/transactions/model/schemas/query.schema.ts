import { querySearchSchema } from "@/shared/schemas/query.schema";
import z from "zod";

export const transactionSearchSchema = querySearchSchema.extend({
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  category_id: z.string().optional(),
  type: z.enum(["earning", "refund_deduction", "expense"]).optional().catch(undefined),
});

export type TransactionSearchSchema = z.infer<typeof transactionSearchSchema>;
