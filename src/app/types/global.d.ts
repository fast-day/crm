export {};

declare global {
  type HttpError<T = unknown> = {
    data: T & {
      title: string;
      detail: string;
      status: number;
    }
    status: number
  }

  type CurrencyType = "RUB" | "USD" | "EUR";

  type ApiResponse<T> = {
    data: T;
  }

  type MarkType = "green" | "yellow" | "red"; // ...
}
