import React from "react"
import { FieldWrapper, type FieldWrapperPassThroughProps } from "./field-wrapper"
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  'h-11.5 w-full flex text-sm rounded-xl shadow-input px-5 py-3.5 disabled:cursor-not-allowed disabled:opacity-50 placeholder:opacity-50 duration-200',
  {
    variants: {
      variant: {
        default: 'bg-card border border-border',
        gray: 'bg-gray-100',
        white: 'bg-white',
        error: 'bg-red-50 shadow-[0_0_0_1px_#FF4747]',
        success: 'bg-green-50 shadow-[0_0_0_1px_#00B87C]',
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
          className={cn(inputVariants({ variant, className }))}
        />
      </FieldWrapper>
    );
  },
);
Input.displayName = "Input";

export { Input }