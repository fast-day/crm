import { BoxIcon } from "@/shared/icons"

export const MobileSidebar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-10 px-4 pb-2.5">
      <div className="bg-card backdrop-blur-md p-4 rounded-2xl flex items-center justify-between gap-2.5">
        
        <div className="flex flex-col items-center gap-1">
          <span><BoxIcon width={20} height={20} /></span>
          <span className="text-xs leading-3">Записи</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span><BoxIcon width={20} height={20} /></span>
          <span className="text-xs leading-3">Заказы</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span><BoxIcon width={20} height={20} /></span>
          <span className="text-xs leading-3">Заказы</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span><BoxIcon width={20} height={20} /></span>
          <span className="text-xs leading-3">Клиенты</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span><BoxIcon width={20} height={20} /></span>
          <span className="text-xs leading-3">Еще</span>
        </div>

      </div>
    </div>
  )
}
