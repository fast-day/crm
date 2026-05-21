import { Button } from "@/shared/ui"
import { cn } from "@/shared/utils";

interface BookingChangeTimeProps {
  time: string;
  current_time: string | undefined;
  onChange: () => void;
}

export const BookingChangeTime = ({ time, current_time, onChange }: BookingChangeTimeProps) => {
  return (
    <Button
      variant={"gray"}
      className={cn(
        "text-xs rounded-lg hover:border-primary",
        current_time === time && "bg-primary text-white",
      )}
      size={"size_32"}
      onClick={onChange}
    >
      {time}
    </Button>
  )
}
