import { getProgressMessage, ONBOARDING_STEPS, OnboardingProgressRing, OnboardingStepItem, type TOnboardingStatus } from "@/entities/onboarding"
import { pluralize } from "@/shared/lib";
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/ui";
import { Support, SupportWidget } from "@/widgets/support";
import { useState } from "react";

export const OnboardingProgress = ({ status }: { status: TOnboardingStatus }) => {
  const [open, setOpen] = useState(false);

  const steps = ONBOARDING_STEPS.map((s) => ({ ...s, done: status[s.key] }));
  const done = steps.filter((s) => s.done).length;
  const total = steps.length;
  const left = total - done;

  const percent = total ? Math.round((done / total) * 100) : 0;
  const { title } = getProgressMessage(percent);

  const pendingSteps = steps.filter((s) => !s.done);
  const doneSteps = steps.filter((s) => s.done);

  if (done === total) return <Support />;
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type={"button"}
          aria-label={"Прогресс настройки"}
          animation={"toggle_sm"}
          size={"size_48"}
          className={"1100:w-fit w-12 rounded-full cursor-pointer fixed 1100:bottom-8 1100:right-8 bottom-20 right-5 z-10 hover:bg-primary hover:opacity-100 active:bg-primary active:opacity-100 pl-0.75 py-0.75 1100:pr-4 pr-0.75 text-sm font-semibold"}
          iconLeft={<OnboardingProgressRing done={done} total={total} />}
          classNameChild={"1100:block hidden"}
        >Завершите настройку</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg">Первоначальная настройка</SheetTitle>
        </SheetHeader>

        <div className="flex-1 flex flex-col overflow-y-auto px-6 pb-6 space-y-6">
          <div className="flex items-center gap-4 rounded-2xl p-5 border border-border">
            <OnboardingProgressRing
              done={done}
              total={total}
              size={52}
              stroke={5}
              progressClassName={"text-primary"}
              trackClassName={"opacity-15"}
            />
            <div className="space-y-1">
              <p className="text-base font-bold leading-4.5">{title}</p>
              <p className="text-xs leading-3 opacity-60">
                {pluralize(left, "Остался", "Осталось", "Осталось")} {left} {pluralize(left, "шаг", "шага", "шагов")}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {pendingSteps.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-semibold opacity-50">{pluralize(left, "Остался", "Осталось", "Осталось")} {left} {pluralize(left, "шаг", "шага", "шагов")}</div>
                <ul className="space-y-2.5">
                  {pendingSteps.map((s) => <OnboardingStepItem key={s.key} step={s} onNavigate={() => setOpen(false)} />)}
                </ul>
              </div>
            )}

            {doneSteps.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-semibold opacity-50">Уже сделано</div>
                <ul className="space-y-2.5">
                  {doneSteps.map((s) => <OnboardingStepItem key={s.key} step={s} onNavigate={() => setOpen(false)} />)}
                </ul>
              </div>
            )}
          </div>

          <SupportWidget className={"mt-auto"} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
