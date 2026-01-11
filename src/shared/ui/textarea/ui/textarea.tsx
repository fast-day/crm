import { cn } from "@/shared/utils";
import React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn("w-full min-h-24 resize-y py-3 px-5 rounded-custom border border-border bg-ffffff", className)}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };