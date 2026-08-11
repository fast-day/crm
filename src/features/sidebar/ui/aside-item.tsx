import { cn } from "@/shared/utils";
import { Link } from "@tanstack/react-router"

interface AsideItemProps {
  name: string;
  to: string;
  icon?: React.ReactNode;
  selected?: boolean;
  className?: string;
  search?: Record<string, unknown>;
  bullet?: boolean;
  onClick?: () => void;
}

export const AsideItem = ({ to, icon, name, selected=false, className="", bullet=false, onClick }: AsideItemProps) => {
  return (
    <Link
      to={to}
      className={cn(`
        flex items-center gap-2.5 px-3 py-2.5 rounded-13 hover:bg-primary/40 hover:text-white active:opacity-70 duration-200 
        ${selected ? "bg-primary/40 text-white" : "text-white/70"}
        ${bullet ? `py-0 px-1 hover:bg-transparent bg-transparent ${selected ? "text-white" : ""}` : "" }`, className,
      )}
      onClick={() => onClick?.()}
    >
      {bullet ? (
        <span className={cn("w-1 h-1 rounded-full shrink-0", selected ? "bg-white" : "bg-transparent")}></span>
      ) : icon}
      <span className={cn(bullet ? "font-normal text-sm" : "font-medium", "text-sm")}>{name}</span>
    </Link>
  )
}
