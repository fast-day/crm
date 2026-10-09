import { cn } from "@/shared/utils";

interface IOnboardingProgressRingProps {
  done: number;
  total: number;
  size?: number;
  stroke?: number;
  className?: string;
  trackClassName?: string;
  progressClassName?: string;
  textClassName?: string;
}

export const OnboardingProgressRing = ({ done, total, size=40, stroke=2, className="bg-white/10", trackClassName="opacity-0", progressClassName="text-white", textClassName, }: IOnboardingProgressRingProps) => {
  const ratio = total ? done / total : 0;
  const percent = Math.round(ratio * 100);

  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - ratio);

  return (
    <div className={cn("relative shrink-0 rounded-full", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="currentColor" strokeWidth={stroke}
          className={trackClassName}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="currentColor" strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className={cn("transition-[stroke-dashoffset] duration-500", progressClassName)}
        />
      </svg>
      <span
        className={cn("absolute inset-0 flex items-center justify-center font-bold", textClassName)}
        style={{ fontSize: Math.max(14, size * 0.25) }}
      >
        {percent}%
      </span>
    </div>
  )
}
