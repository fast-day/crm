import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils';

const labelVariants = cva(
  'text-sm font-medium leading-4.5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean } & VariantProps<typeof labelVariants>
>(({ className, children, required, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("text-sm font-medium", labelVariants, className)}
      {...props}
    >
      {children}
      {required && <span className="text-[#F22417] ml-0.5">*</span>}
    </label>
));
Label.displayName = "Label";

export { Label };