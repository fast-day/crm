import { cn } from "@/shared/utils";
import { cva } from "class-variance-authority";
import { memo } from "react";

interface IEventBulletProps {
  color: MarkType;
  className?: string;
}

const variants = cva("size-2 rounded-full", {
  variants: {
    color: {
      red: "bg-red",
      orange: "bg-orange",
      green: "bg-green",
      blue: "bg-blue",
      purple: "bg-purple-500",
      teal: "bg-teal-500",
      pink: "bg-pink-500",
      primary: "bg-primary",
      gray: "bg-gray-500",
    },
  },
  defaultVariants: {
    color: "primary",
  }
})

const EventBullet = ({ color, className }: IEventBulletProps) => {
  return (
    <div
      className={cn(variants({ color }), className)}
    />
  )
}

export default memo(EventBullet);
