export const buildQuery = (params: Record<string, string | number | boolean | undefined>): string => {
  const searchParams = new URLSearchParams();

  for (const key in params) {
    const val = params[key];

    if (val !== undefined && val !== "") {
      searchParams.set(key, String(val));
    }
  }

  return searchParams.toString();
}
