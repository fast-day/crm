import { cn } from "@/shared/utils"
import { cva, type VariantProps } from "class-variance-authority"

const noticeVariant = cva(
  "p-6 rounded-2xl space-y-1 grid",
  {
    variants: {
      variant: {
        error: "bg-red/20 text-red",
        warning: "bg-warn-background/20 text-warn-color-text",
      },
      size: {
        full: "w-full",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
      }

    },
    defaultVariants: {
      variant: "error",
      size: "full",
    }
  }
)

export type NoticeProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof noticeVariant> & {
    title: string;
    description?: string;
  }

export const Notice = ({ className, variant, size, title, description, ...props }: NoticeProps) => {
  return (
    <div
      data-ui={"notice"}
      className={cn(noticeVariant({ variant, size }), className)}
      {...props}
    >
      <h3 className="font-bold leading-5">{title}</h3>
      {description && <p className="leading-4 text-sm">{description}</p>}
    </div>
  )
}
