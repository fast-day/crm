import { ORDER_STATUS, ORDER_STATUS_TITLE } from "@/shared/constants/order-status.constant";
import { BoxIcon, CheckIcon, CloseOrderIcon, PendingOrderIcon } from "@/shared/icons";
import { Badge } from "@/shared/ui";
import { formatDate } from "@/shared/utils";

interface IOrderResultHeadProps {
  status: OrderStatusType;
  date: string;
  time: string;
}

export const OrderResultHead = ({ status, date, time }: IOrderResultHeadProps) => {
  return (
    <div className="flex items-center flex-col justify-center gap-6">
      <Badge
        className="w-30 h-30 rounded-full text-white [&>svg]:size-20"
        variant={`${status}_icon`}
      >
        {status === "paid" && <CheckIcon />}
        {status === "closed" && <CloseOrderIcon />}
        {status === "open" && <BoxIcon />}
        {status === "pending" && <PendingOrderIcon />}
      </Badge>
      
      <div className="flex flex-col items-center space-y-2.5">
        <h3 className="text-2xl font-bold">{ORDER_STATUS_TITLE[status]}</h3>
        <p className="text-md font-medium leading-4">Создан {formatDate(date)}, {time}</p>
        <Badge status={status} fill={"soft"}>
            {(() => {
              const current_status = ORDER_STATUS[status];
              const Icon = current_status.icon;
              return ( 
                <> 
                  <Icon />
                  {current_status.label}
                </>
                );
              })()}
          </Badge> 
      </div>
    </div>
  )
}
