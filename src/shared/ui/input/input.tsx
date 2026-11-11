import React from "react"
import { cn } from "@/shared/utils";
import { type VariantProps } from "class-variance-authority";
import { type FieldWrapperPassThroughProps } from "../form";
import { inputVariants } from "./variants";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & 
FieldWrapperPassThroughProps & VariantProps<typeof inputVariants> & {
  className?: string;
  isError?: boolean;
  lcls?: string;
  label?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className="", type, variant, inputSize, error, label, isError=false, lcls, ...props }, ref) => {
    return (
      <div className="relative w-full min-w-0">
        <input
          ref={ref}
          type={type}
          {...props}
          className={cn(
            inputVariants({ variant, inputSize, className }),
            "w-full min-w-0",
            label && "pr-16",
            (error || isError) && "border-error-color-icon focus:border-error-color-icon",
          )}
        />
        {label && (
          <div className={cn("pointer-events-none absolute inset-y-0 right-0 flex w-16 items-center justify-center rounded-r-xl bg-primary/90 font-bold text-white", lcls)}>
            {label}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input }
