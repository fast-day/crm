interface IApiSuccess<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

interface IApiNotFound<M> {
  status: 404;
  title?: string;
  details?: string;
  meta?: M;
}

interface IApiConflict<M> {
  status: 409;
  title?: string;
  details?: string;
  meta?: M;
}

interface IApiServerError {
  status: 500;
  error: string;
}

export type ApiResponse<T> = 
  IApiSuccess<T> | IApiNotFound<T> | IApiConflict<T> | IApiServerError;
