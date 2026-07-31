import { InvoiceCard, type IInvoice } from "@/entities/invoice"
import { InvoiceDownload } from "@/features/invoice";

interface IOrderInvoicesProps {
  invoices: IInvoice[];
}

export const OrderInvoices = ({ invoices }: IOrderInvoicesProps) => {
  return (
    <div className="space-y-2.5">
      <h3 className="font-bold text-base">Счета</h3>
      <div className="grid gap-2.5">
        {invoices.length > 0 ? 
          invoices.map((invoice, idx) => (
            <InvoiceCard
              key={idx}
              {...invoice}
              download={<InvoiceDownload invoice_id={invoice.id} />}
            />
          ))
        : 
          <p className="text-xs font-medium text-center opacity-50">Счета не созданы</p>
        }
      </div>
    </div>
  )
}
