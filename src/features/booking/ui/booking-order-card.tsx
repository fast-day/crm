import type { IBookingOrder } from "@/entities/booking";
import { InvoiceOrderCard } from "@/entities/invoice";
import { ORDER_STATUS } from "@/shared/constants/order-status.constant";
import { Card, CardContent, Button, Badge } from "@/shared/ui";
import { formatPrice } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import React from "react";

export const BookingOrderCard = ({ status, subtotal, id, tag, invoices }: IBookingOrder) => {
  return (
    <Card className="bg-card/60">
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-2.5 pb-2.5 border-b border-border">
          <Badge status={status} fill={"solid"} className="px-2 py-0.5 text-xss! font-bold rounded-lg border-none text-white">
              {(() => {
                const order_status = ORDER_STATUS[status];
                const Icon = order_status.icon;
                return (
                  <>
                    <Icon />
                    {order_status.label}
                  </>
                );
              })()}
          </Badge>
          <div className="font-bold">{formatPrice(subtotal)} ₽</div>
        </div>

        <div>
          {invoices.length > 0 ? (
            invoices.map((invoice, idx) => (
              <React.Fragment key={idx}>
                <InvoiceOrderCard key={idx} {...invoice} />
                <div className="border-b border-border" />
              </React.Fragment>
            ))
          ) : (
            <div className="py-4 border-b border-border">
              <p className="text-xss text-center opacity-50">Счета не созданы</p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <Link to={`/orders/${id}`} className="block">
            <Button variant={"accent"} size={"size_48"} className="w-full bg-primary">Заказ № {tag}</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
