import { BookingServiceCard, useCompleteBookingMutation, useConfirmBookingMutation, type IBookingConfirmCredentials, type IBookingDetail } from "@/entities/booking";
import { Avatar } from "@/entities/user";
import { PAYMENT_METHODS_ENUM } from "@/shared/constants/payment-methods.constant";
import { TrashIcon } from "@/shared/icons";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Textarea } from "@/shared/ui";
import { cn, formatPrice, getErrorMessage } from "@/shared/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";
import { useState } from "react";
import { toast } from "sonner";

interface BookingCheckoutContentProps {
  booking: IBookingDetail;
}

const PAYMENT_METHODS = ["cash", "online", "credit_card"] as PaymentMethodType[]; 

export const BookingCheckoutContent = ({ booking }: BookingCheckoutContentProps) => {
  const [payment, setPayment] = useState<PaymentMethodType | null>();
  const [isLoading, setIsLoading] = useState(false);

  const [confirm] = useConfirmBookingMutation();
  const [complete] = useCompleteBookingMutation();

  const navigate = useNavigate();

  const handlePay = async (booking_id: string) => {
    if (!payment) {
      toast.warning("Выберите способ оплаты");
      return;
    };

    setIsLoading(true);

    try {
      const req = {
        params: {
          booking_id,
        },
        body: {
          status: "pending",
          payment_method: payment,
        }
      } satisfies IBookingConfirmCredentials;
      await confirm(req).unwrap();
      await complete({ booking_id }).unwrap();
      navigate({ to: `/bookings/${booking_id}/result`, replace: true });
    }
    catch (error) {
      toast.error(getErrorMessage(error));
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleSave = async (booking_id: string) => {
    if (payment) {
      toast.warning("Чтобы сохранить заказ, вам необходимо отменить способ оплаты.");
      return;
    }

    setIsLoading(true);

    try {
      const req = {
        params: {
          booking_id,
        },
        body: {
          status: "unpaid",
        }
      } satisfies IBookingConfirmCredentials;
      await confirm(req).unwrap();
      navigate({ to: `/bookings/${booking_id}/result` });
    }
    catch (error) {
      toast.error(getErrorMessage(error));
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-8 h-full">
      
      <div className="grid grid-cols-3 gap-8 h-full">
      
      <div className="col-span-2 space-y-8">

        {/* СПОСОБ ОПЛАТЫ */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Способ оплаты</h2>
          <div className="grid grid-cols-3 gap-5">
            {PAYMENT_METHODS.map((m, idx) => (
              <Card key={idx} onClick={() => setPayment(m)} className={cn("border-2 border-transparent cursor-pointer", payment === m ? "border-primary" : "")}>
                <CardContent className="p-5">
                  <CardTitle className="text-xl">{PAYMENT_METHODS_ENUM[m].label}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {payment && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Оплата</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="font-medium">{PAYMENT_METHODS_ENUM[payment].label}</div>
              </div>
              <div className="font-medium">{formatPrice(booking.order.subtotal)} ₽</div>

              <Button
                variant={"transparent"}
                size={"size_24"}
                className={"font-medium text-red"}
                iconLeft={<TrashIcon width={20} height={20} />}
                onClick={() => setPayment(null)}
              >Удалить</Button>
            </div>
          </div>
        )}

        <Textarea placeholder="Комментарий к заказу" className="resize-none placeholder:text-base placeholder:font-bold" />
      </div>

        <Card className="flex flex-col">

          <Card className="bg-transparent">
            <CardHeader className="p-0">
              <Link to={`/customers/${booking.customer.profile_id}`} className="flex flex-row items-center gap-2.5 p-5 hover:bg-card rounded-t-3xl duration-200">
                <div className="relative">
                  <Avatar size={"large"} id={booking.customer.profile_id ?? "none"} name={booking.customer.full_name} avatar_url={booking.customer.avatar} />
                </div>
                <div>
                  <CardTitle className="capitalize text-base">{booking.customer.full_name}</CardTitle>
                  <CardDescription className="opacity-50 mt-0 leading-3 text-xss">Клиент</CardDescription>
                </div>
              </Link>
            </CardHeader>
          </Card>

          <CardContent className="flex-1 flex flex-col">
            <div className="flex flex-col h-full space-y-6">

              <div className="space-y-4">
                <div className="flex items-center gap-2 font-bold">Услуги <Badge variant={"count"}>{booking.services.length}</Badge></div>

                <div className="grid gap-2.5">
                  {booking.services.length > 0 ? booking.services.map((service, idx) => (
                    <React.Fragment key={idx}>
                      <BookingServiceCard
                        service={service}
                        employee={booking.employee}
                        start_time={booking.start_time}
                        end_time={booking.end_time}
                      />
                    
                      {idx !== booking.services.length - 1 && <div className="w-full h-px bg-border" />}
                    </React.Fragment>
                  )) : <div className="text-sm opacity-50">Нет выбранных услуг.</div>}
                </div>
              </div>

            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between gap-2.5 py-8 border-b border-border">
                <p className="font-medium opacity-50">Итого</p>
                <span className="font-semibold">{formatPrice(booking.order.subtotal)} руб.</span>
              </div>
              <div className="flex gap-3">
                <Button type={"button"} isLoading={isLoading} disabled={isLoading} onClick={() => handleSave(booking.id)} size={"size_60"} variant={"white"} className="p-5">
                  Сохранить
                </Button>
                <Button type={"button"} isLoading={isLoading} disabled={isLoading} onClick={() => handlePay(booking.id)} size={"size_60"} className="w-full">Оплатить</Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
