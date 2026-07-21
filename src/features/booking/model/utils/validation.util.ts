import type { BookingCreate } from "@/entities/booking";

interface ValidationError {
  field: string;
  message: string;
}

function validateBooking(_booked: BookingCreate[], customer: boolean): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // if (!booked.date)     errors.push({ field: "date",     message: "Выберите дату" });
  // if (!booked.time)     errors.push({ field: "time",     message: "Выберите время" });
  // if (!booked.service)  errors.push({ field: "service",  message: "Выберите услугу" });
  // if (!booked.employee) errors.push({ field: "employee", message: "Выберите сотрудника" });
  if (!customer) errors.push({ field: "customer", message: "Выберите клиента" });
  // if (!booked.location) errors.push({ field: "location", message: "Выберите локацию" });
  // if (!booked.payment_method) errors.push({ field: "payment_method", message: "Выберите способ оплаты" });

  return errors;
}

function validateAddedBooking(booking: BookingCreate): ValidationError[] {
  const errors:ValidationError[] = [];

  if (!booking.service)     errors.push({ field: "service", message: "Выберите услугу" });
  if (!booking.employee)    errors.push({ field: "employee", message: "Выберите сотрудника" });
  if (!booking.date)        errors.push({ field: "date", message: "Выберите дату" });
  if (!booking.time)        errors.push({ field: "time", message: "Выберите время" });

  return errors;
}

export { validateBooking, validateAddedBooking };
