import { cn } from "@/shared/utils";

interface IContentLayoutProps {
  className?: string;
  children?: React.ReactNode;
}

export const ContentLayout = ({ className, children }: IContentLayoutProps) => {
  return (
    <div className="flex flex-col w-full space-y-8">
      <div className={cn("container space-y-8", className)}>{children}</div>
    </div>
  )
}
