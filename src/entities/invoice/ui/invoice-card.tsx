import { Badge, Card, CardContent } from "@/shared/ui";
import type { IInvoice } from "../model/types/invoice.type";
import { formatDateToRus } from "@/shared/utils";
import { INVOICE_TYPE } from "@/shared/constants";

interface IInvoiceCardProps extends IInvoice {
  download?: React.ReactNode;
}

export const InvoiceCard = ({ type, tag, date, amount, download }: IInvoiceCardProps) => {
  return (
    <Card>
      <CardContent className="p-3 grid grid-cols-4 gap-2.5 items-center">
        <div>
          <Badge status={type} fill={"soft"}>
            {(() => {
              const current_status = INVOICE_TYPE[type];
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
        <div >
          <p className="text-sm font-medium leading-3.5 whitespace-nowrap">{tag}</p>
          <p className="text-sm font-medium leading-3.5 opacity-50">{formatDateToRus(date)}</p>
        </div>
        <div className="text-end text-sm font-bold">{amount} ₽</div>
        <div className="flex items-center justify-end gap-2">
          {download}
        </div>
      </CardContent>
    </Card>
  )
}
