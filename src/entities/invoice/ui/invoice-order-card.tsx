import { Badge, Card, CardContent } from "@/shared/ui";
import type { IInvoice } from "../model/types/invoice.type";
import { INVOICE_TYPE } from "@/shared/constants";
import { formatDateToRus } from "@/shared/utils";

interface IInvoiceOrderCardProps extends IInvoice {
  download?: React.ReactNode;
}

export const InvoiceOrderCard = ({type, tag, date , download  }: IInvoiceOrderCardProps) => {
  return (
    <Card className="bg-transparent">
      <CardContent className="px-0 py-2.5 grid grid-cols-2 gap-2.5 items-center">
        <div className="space-y-0.5">
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
          <div>
            <p className="text-sm font-medium leading-3.5 whitespace-nowrap">{tag}</p>
            <p className="text-sm font-medium leading-3.5 opacity-50">{formatDateToRus(date)}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          {download}
        </div>
      </CardContent>
    </Card>
  )
}
