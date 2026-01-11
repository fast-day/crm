import { cn } from "@/shared/utils";
import { getAvatarColor } from "../model/utils/get-color.util";
import { cva, type VariantProps } from "class-variance-authority";

const avatarVariants = cva(
  "flex items-center gap-0.5 justify-center overflow-hidden bg-primary-foreground/35",
  {
    variants: {
      size: {
        default: "min-w-10 w-10 h-10 rounded-10",
        small: "min-w-8 w-8 h-8 rounded-8",
        large: "min-w-11 w-11 h-11 rounded-12",
      }
    },
    defaultVariants: {
      size: "default",
    }
  }
);

type AvatarProps = VariantProps<typeof avatarVariants> & {
  id: string;
  avatar_url?: string | null;
  name: string;
}

export const Avatar = ({ id, avatar_url, size, name }: AvatarProps) => {
  return (
    <div 
      className={cn(avatarVariants({ size }), getAvatarColor(id))}
    >
      {avatar_url ? (
        <img className="object-cover w-full h-full" src={avatar_url} alt={name} />
      ) : (
        <span className="uppercase font-medium text-lg leading-5 select-none">{name}</span>
      )}
    </div>
  )
}
