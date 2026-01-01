import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Spinner } from "../spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-md font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer duration-200",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 active:bg-primary/70 disabled:hover:bg-primary/80 disabled:active:bg-primary/80",
        link: "text-primary underline-offset-4 hover:underline disabled:hover:no-underline",
      },
      size: {
        default: "w-full h-12.5 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
        iconSm: "size-8",
      },
      active: {
        none: "",
        scale_sm: "active:scale-99",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      active: "none",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      isLoading,
      icon,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && icon && <span className="mr-2">{icon}</span>}
        <span className="mx-2">{children}</span>
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };