export const isApiError = <M>(error: unknown): error is ApiErrorResponse<M> => {
   return typeof error === "object" && error !== null && "status" in error;
}
