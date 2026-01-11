import * as React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, type FieldWrapperPassThroughProps } from "./field-wrapper";
import { cn } from "@/shared/utils";


export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FieldWrapperPassThroughProps & {
    className?: string;
    register: Partial<UseFormRegisterReturn>;
  };

const TextareaForm = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, required, register, ...props }, ref) => {
    return (
      <FieldWrapper label={label} error={error} required={required}>
        <textarea
          className={cn(
            "flex min-h-24 w-full bg-card/60 border font-medium border-transparent text-md rounded-xl px-4 py-4 placeholder:opacity-50 focus:border-border focus:bg-card/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200",
            className,
          )}
          ref={ref}
          {...register}
          {...props}
        />
      </FieldWrapper>
    );
  },
);
TextareaForm.displayName = "TextareaForm";

export { TextareaForm };
