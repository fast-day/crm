import React from "react"
import { FieldWrapper, type FieldWrapperPassThroughProps } from "./field-wrapper"
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  'w-full flex text-md rounded-xl shadow-input px-4 py-4 disabled:cursor-not-allowed disabled:opacity-50 placeholder:opacity-50 duration-200',
  {
    variants: {
      variant: {
        default: 'bg-card border font-medium border-transparent focus:border-border leading-4.5 focus:bg-card/40',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & 
FieldWrapperPassThroughProps & VariantProps<typeof inputVariants> & {
  className?: string;
  register: Partial<UseFormRegisterReturn>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, required, variant, label, error, register, ...props }, ref) => {
    return (
      <FieldWrapper label={label} error={error} required={required}>
        <input
          ref={ref}
          type={type}
          {...register}
          {...props}
          className={cn(inputVariants({ variant, className }), error ? "border-error-color-icon focus:border-error-color-icon" : "")}
        />
      </FieldWrapper>
    );
  },
);
Input.displayName = "Input";

export { Input }