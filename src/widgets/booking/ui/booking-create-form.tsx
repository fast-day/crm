import { accountSelector } from "@/entities/account"
import { BookingSelectCustomerInfo, bookingSelector, BookingSelectServiceCard, BookingTotalPrice } from "@/entities/booking";
import { BookingSelectCustomer, BookingSelectDate, useBookingCreate } from "@/features/booking";
import { AddIcon } from "@/shared/icons";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Dialog } from "@/shared/ui"
import { useSelector } from "react-redux"
import { dialogSelector, useDialog } from "@/entities/dialog";
import { BookingChangeService } from "./components/booking-change-service";
import { ContentPanel } from "@/widgets/ content-panel";
import { Link } from "@tanstack/react-router";

export const BookingCreateForm = ({ date }: { date: string }) => {
  const { location, account } = useSelector(accountSelector);
  const { booked, customer, date: current_date } = useSelector(bookingSelector);
  const { dialog } = useSelector(dialogSelector);

  const { closeDialog, openDialog } = useDialog();

  const { handleSave, isLoading } = useBookingCreate();

  // useEffect(() => {
    // const payload: Partial<BookingCreate> = {};
    // if (date && !booking_create?.date) payload.date = date;
    // if (location && !booking_create?.location) payload.location = location;
    // if (Object.keys(payload).length > 0) dispatch(setBookingCreate(payload));
  // }, [date, location]);

  return (
    <div className="mt-8 h-full">

      <div className="relative flex h-full flex-col 1100:flex-row gap-8">
        <div className="max-w-180 1100:max-w-140 w-full mx-auto space-y-8 relative">

          {location && (
            <>
              <Card>
                <CardHeader className="pb-0 flex-row items-center justify-between gap-2.5">
                  <CardTitle>Услуги</CardTitle>
                  <Badge variant={"count"}>{booked?.length ?? 0}</Badge>
                </CardHeader>
                <CardContent>

                  <div className="space-y-6">
                    {booked && booked?.length > 0 && (
                      <div className="grid gap-3">
                        {booked.map((book, idx) => (
                          <BookingSelectServiceCard
                            key={idx}
                            onClick={() => console.log("book: ", book)}
                            {...book}
                          />
                        ))}
                      </div>
                    )}

                    <Button
                      type={"button"}
                      onClick={() => openDialog("booking_service_create", undefined)}
                      variant={"dashed"}
                      size={"icon_42"}
                      className="w-full rounded-lg text-sm"
                      iconLeft={<AddIcon width={18} height={18}/>}
                    >{booked.length > 0 ? "Добавить услугу" : "Выбрать услугу"}</Button>
                  </div>

                  <Dialog open={dialog.name === "booking_service_create"} onOpenChange={closeDialog}>
                    <BookingChangeService location_id={location.uuid} date={current_date ?? date} account={account} />
                  </Dialog>

                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-0 flex items-center justify-between flex-row">
                  <CardTitle>Клиент</CardTitle>
                  <Link
                    to={"/customers/create?redirect=/bookings/create"}
                    className="text-sm font-bold text-primary opacity-80 hover:opacity-100 duration-150"
                  >Добавить</Link>
                </CardHeader>

                <CardContent className="space-y-5">
                  <BookingSelectCustomer customer={customer} />

                  {customer && <BookingSelectCustomerInfo customer={customer} />}
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <ContentPanel
          title={"Детали записи"}
          className={"h-auto"}
          content={
            <div className="space-y-8 flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium opacity-60">Итого</div>
                <BookingTotalPrice booked={booked} />
              </div>

              <BookingSelectDate date={current_date} />
            </div>
          }
          actions={
            <>
              <Button
                type={"button"}
                onClick={() => handleSave(booked, customer, account, location!.uuid)}
                isLoading={isLoading}
                disabled={isLoading}
              >Сохранить</Button>
            </>
          }
        />
      </div>

    </div>
  )
}
