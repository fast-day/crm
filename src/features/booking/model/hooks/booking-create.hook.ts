import { resetBookingCreate, useCreateBookingMutation, type BookingCreate, type IBookingActionCredentials } from "@/entities/booking";
import { toast } from "sonner";
import { validateBooking } from "../utils/validation.util";
import { useAppDispatch } from "@/shared/hooks";
import { useNavigate } from "@tanstack/react-router";
import type { IDirectoryCustomer } from "@/entities/directories";
import { updateAccount, type IMe } from "@/entities/account";
import { getErrorMessage } from "@/shared/utils";
import { Route } from "@/app/routes/_app/_layout-focus/bookings/create/";

interface UseBookingCreateReturnProps {
  handleSave: (booked: BookingCreate[] | null, customer: IDirectoryCustomer | null, employee: IMe | null, location_id?: string) => Promise<void>;
  isLoading: boolean;
}

export const useBookingCreate = (): UseBookingCreateReturnProps => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = Route.useSearch()
  const [create, { isLoading }] = useCreateBookingMutation();

  const handleSave = async (
    booked: BookingCreate[] | null,
    customer: IDirectoryCustomer | null,
    employee: IMe | null,
    location_id?: string,
  ): Promise<void> => {
    if (!location_id) {
      toast.error("Произошла ошибка. Пожалуйста перезагрузите страницу");
      return;
    }

    if (!booked?.length) {
      toast.error("Нет данных для создания записи");
      return;
    }

    const errors = validateBooking(booked, !!customer);

    if (errors.length > 0) {
      toast.error("Заполните все поля", {
        description: errors.map((e) => e.message).join(" • "),
      });
      return;
    }

    const { return_to, return_start_date, return_end_date } = query;

    try {
      const req = {
        services: booked.map(book => ({
          service_id: book.service!.id,
          price: book.service!.prices.price,
          count: 1,
          start_time: `${book.date}T${book.time!}`,
          duration: book.service!.duration,

          /*
            !===== ПОКА БЕЗ ВЫБОРА СОТРУДНИКА  =====!
            ЧУТЬ ПОЗЖЕ ОПТИМИЗИРОВАТЬ ДО АВТОМАТИЧЕСКОГО ОПРЕДЕЛЕНИЯ
            ЕСЛИ СОТРУДНИК 1, ТО ПО ДЕФОЛТУ ПРОКИДЫВАТЬ ЕГО, ЕСЛИ МНОГО - ДАВАТЬ ВОЗМОЖНОСТЬ ВЫБРАТЬ
          */
          users: employee?.uuid ? [{
            id: employee.uuid,
            first_name: employee.first_name,
            last_name: employee.last_name,
          }] : [],
          // users: book.employee?.id ? [{
          //   id: book.employee.profile_id,
          //   first_name: book.employee.first_name,
          //   last_name: book.employee.last_name,
          // }] : [],
        })),
        customers: customer ? [{
          id: customer.customer_attributes.profile_id,
          first_name: customer.customer_attributes.first_name,
          last_name: customer.customer_attributes.last_name,
          phone: customer.customer_attributes.phone,
        }] : [],
        location_id,
        comment: null,
      } satisfies IBookingActionCredentials;

      await create(req).unwrap();
      dispatch(resetBookingCreate());
      dispatch(updateAccount({ has_bookings: true }));

      if (return_to === "/bookings/calendar") {
        navigate({ to: "/bookings/calendar", search: { start_date: return_start_date, end_date: return_end_date } });
      } else if (return_to === "/bookings/list") {
        navigate({ to: "/bookings/list" });
      } else {
        navigate({ to: "/bookings" });
      }
    }
    catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return { handleSave, isLoading };
}
