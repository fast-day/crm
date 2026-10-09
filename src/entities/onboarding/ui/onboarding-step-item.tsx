import { cn } from "@/shared/utils"
import { Link } from "@tanstack/react-router"
import type { TOnboardingStep } from "../model/constants/onboarding.constant"
import { Badge } from "@/shared/ui";
import { CheckIcon } from "@/shared/icons";

interface IOnboardingStepItemProps {
  step: TOnboardingStep & { done: boolean; };
  onNavigate: () => void;
}

export const OnboardingStepItem = ({ step, onNavigate }: IOnboardingStepItemProps) => {
  return (
  <li>
    <Link
      to={step.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-xl p-4 text-sm font-semibold border-2 border-border",
        !step.done && "border-dashed",
      )}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-xs",
          step.done ? "border-primary bg-primary text-white" : "border-accent/30",
        )}
      >
        {step.done && <CheckIcon width={16} height={16} />}
      </span>

      <span className={cn("flex-1", step.done && "opacity-50")}>{step.title}</span>

      {step.done ? (
        <Badge variant={"step_done"}>
          Сделано
        </Badge>
      ) : (
        <Badge variant={"step_time"}>
          ~{step.minutes} мин
        </Badge>
      )}
    </Link>
  </li>
  )
}
