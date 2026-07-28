import { resetBookingCreate, useCreateBookingMutation, type BookingCreate, type IBookingActionCredentials } from "@/entities/booking";
import { toast } from "sonner";
import { validateBooking } from "../utils/validation.util";
import { useAppDispatch } from "@/shared/hooks";
import { useNavigate } from "@tanstack/react-router";
import type { IDirectoryCustomer } from "@/entities/directories";

interface UseBookingCreateReturnProps {
  handleSave: (booked: BookingCreate[] | null, customer: IDirectoryCustomer | null, location_id: string) => Promise<void>;
  isLoading: boolean;
}

export const useBookingCreate = (): UseBookingCreateReturnProps => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [create, { isLoading }] = useCreateBookingMutation();

  const handleSave = async (
    booked: BookingCreate[] | null,
    customer: IDirectoryCustomer | null,
    location_id: string,
  ): Promise<void> => {
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

    // console.log(booked[0].employee);

    const req = {
      services: booked.map(book => ({
        service_id: book.service!.id,
        price: book.service!.prices.price,
        count: 1,
        start_time: `${book.date}T${book.time!}`,
        duration: book.service!.duration,
        users: book.employee?.id ? [{
          id: book.employee.profile_id,
          first_name: book.employee.first_name,
          last_name: book.employee.last_name,
        }] : [],
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

    // console.log("action", req);

    toast.promise(create(req).unwrap(), {
      success: () => {
        dispatch(resetBookingCreate());
        navigate({ to: "/bookings" });
        return "Бронирование создано";
      },
      error: "Не удалось создать бронирование",
    });
  };

  return { handleSave, isLoading };
}
