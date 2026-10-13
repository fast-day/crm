import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const parseJsonSafely = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return { title: "Ошибка", detail: text || "Неизвестная ошибка" };
  }
}

export const resolveBlobError = async (error: FetchBaseQueryError): Promise<FetchBaseQueryError> => {
  if (typeof error.status !== "number" || !(error.data instanceof Blob)) return error;

  const text = await error.data.text();
  return { status: error.status, data: parseJsonSafely(text) };
}
