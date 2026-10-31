import { CheckIcon } from '@/shared/icons';
import { cn } from '@/shared/utils';
import React, { type InputHTMLAttributes } from 'react'

type CheckboxFormProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: React.ReactNode;
  checkboxClass?: string;
};

const CheckboxForm = React.forwardRef<HTMLInputElement, CheckboxFormProps>(
  ({ className, checkboxClass="", label, ...props }, ref) => (
    <label
      className={cn(
        "relative inline-flex items-start gap-2 cursor-pointer has-disabled:cursor-not-allowed has-disabled:opacity-60",
        className,
      )}
    >
      <input ref={ref} type="checkbox" className="peer sr-only" {...props} />
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-lg bg-white text-white transition-colors",
          "peer-checked:bg-accent peer-focus-visible:ring-2 peer-focus-visible:ring-accent/50",
          "[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100", checkboxClass
        )}
      >
        <CheckIcon width={18} height={18} />
      </span>
      {label && <span className="text-xs leading-3.75 opacity-50">{label}</span>}
    </label>
  ),
);
CheckboxForm.displayName = "CheckboxForm";

export { CheckboxForm };
