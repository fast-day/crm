export type ErrorProps = {
  errorMessage?: string | null;
};

export const Error = ({ errorMessage }: ErrorProps) => {
  if (!errorMessage) return null;

  return (
    <div
      role="alert"
      aria-label={errorMessage}
      className="mt-0.5 text-[13px] font-normal text-red-500"
    >
      {errorMessage}
    </div>
  );
};