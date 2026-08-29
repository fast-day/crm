import { cn } from "@/shared/utils"
import { forwardRef, type ButtonHTMLAttributes, type ComponentProps } from "react"
import { Button } from "../../button"
import { useRouter } from "@tanstack/react-router"
import { ArrowBackUpIcon } from "@/shared/icons"

function PageHeader ({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div 
      data-ui="page-header"
      className={cn("flex 1100:flex-row flex-col-reverse 1100:items-center justify-between 1100:gap-7.5 gap-5", className)}
      {...props}
    >{children}</div>
  )
}

function PageHeaderTitle ({ className, children, ...props }: ComponentProps<"h1">) {
  return (
    <h1 
      data-ui="page-header-title" 
      className={cn("1100:text-2xl text-xl font-extrabold leading-7.5", className)}
      {...props}
    >{children}</h1>
  )
}

function PageHeaderActions ({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div 
      data-ui="page-header-actions" 
      className={cn("flex gap-2.5 1100:justify-items-end-safe items-center justify-between", className)} 
      {...props}
    >{children}</div>
  )
}

const PageHeaderBackAction = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ ...props }, ref) => {
    const { history } = useRouter();
    return (
      <Button
        data-ui="page-header-back-action"
        data-action="back"
        ref={ref}
        variant={"white"}
        animation={"toggle"}
        className={"text-sm font-bold 1100:px-5 1100:size-auto size-11"}
        classNameChild={"1100:block hidden"}
        size={"size_44"}
        onClick={() => history.back()}
        iconLeft={<ArrowBackUpIcon width={24} height={24} />}
        {...props}
      >
        Назад
      </Button>
    )
  }
);
PageHeaderBackAction.displayName = "PageHeaderBackAction";

export {
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageHeaderBackAction,
}
