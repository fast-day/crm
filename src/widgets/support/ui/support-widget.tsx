import { SUPPORT_CONTACTS } from "@/entities/support"
import SvgInstagram from "@/shared/brand-icons/Instagram"
import SvgTelegram from "@/shared/brand-icons/Telegram"
import { PhoneIcon } from "@/shared/icons"
import { Button } from "@/shared/ui"
import { cn } from "@/shared/utils"

export const SupportWidget = ({ className="" }: { className?: string }) => {
  return (
    <div className={cn("rounded-2xl border-2 border-border p-5 space-y-3", className)}>
      <div className="space-y-0.5">
        <p className="text-base font-bold leading-4.5">Нашли ошибку или остались вопросы?</p>
        <p className="text-xs opacity-50 leading-4">Баг, вопрос или идея: напишите, мы обязательно ответим</p>
      </div>

      <div className="space-y-2.5">
        <a href={SUPPORT_CONTACTS.phone.href} className="block">
          <Button
            type={"button"}
            size={"size_42"}
            variant={"gray"}
            animation={"toggle_sm"}
            className={"text-sm"}
            iconLeft={<PhoneIcon width={20} height={20} />}
          >{SUPPORT_CONTACTS.phone.label}</Button>
        </a>

        <div className="space-y-1.5">
          <div className="text-xs font-semibold opacity-50">Мы в соцсетях</div>
          <div className="flex gap-2.5">
            <a href={SUPPORT_CONTACTS.telegram.href} target={"_blank"} rel="noopener noreferrer" className="block">
              <SvgTelegram width={32} height={32} className="text-[#229ED9]" />
            </a>
            <a href={SUPPORT_CONTACTS.instagram.href} target={"_blank"} rel="noopener noreferrer" className="block">
              <SvgInstagram width={32} height={32} />
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
