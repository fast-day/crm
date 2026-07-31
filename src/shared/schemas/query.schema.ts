import z from "zod";

const getDefaultLimit = (): number => {
  const store = localStorage.getItem("limit");
  const parse = store ? Number(store) : NaN;
  return Number.isFinite(parse) && parse > 0 ? parse : 20;
}

export const querySearchSchema = z.object({
  page: z.coerce.number().optional().default(1).catch(1),
  limit: z.coerce.number().optional().default(getDefaultLimit).catch(20),
});
