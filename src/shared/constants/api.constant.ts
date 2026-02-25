export const isDev = import.meta.env.VITE_NODE_ENV === "development";

export const apiUrl = (isDev ? import.meta.env.VITE_LOCAL_API_URL : import.meta.env.VITE_API_URL)?.replace(/\/$/, "") || "";
export const API_VERSION = import.meta.env.VITE_API_VERSION || "v1";
