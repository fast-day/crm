const LOCATION_RESET_ERRORS = ["Локация не найдена", "Пользователь не найден"];

export const shouldResetLocation = (error: unknown): boolean => {
  const e = error as { status?: unknown; data?: { message?: unknown; detail?: unknown } } | undefined;
  if (e?.status !== 404) return false;

  const text = e.data?.message ?? e.data?.detail;
  return typeof text === "string" && LOCATION_RESET_ERRORS.includes(text);
};
