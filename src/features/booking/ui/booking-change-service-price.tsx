import type { BookingCreate } from "@/entities/booking";
import { Input } from "@/shared/ui"
import { useState } from "react";

interface BookingChangeServicePriceProps {
  price: number | undefined;
  setSetting: React.Dispatch<React.SetStateAction<BookingCreate>>;
}

export const BookingChangeServicePrice = ({ price, setSetting }: BookingChangeServicePriceProps) => {
  const [text, setText] = useState(price?.toString() ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    setText(value);
    setSetting(p => {
      if (!p.service) return p;
      return {
        ...p,
        service: { ...p.service, prices: { ...p.service.prices, price: Number(value) } },
      };
    });
  };

  return (
    <Input
      name={"service-price"}
      id={"service-price"}
      type={"text"}
      inputMode={"numeric"}
      inputSize={"size_60"}
      value={text}
      onChange={handleChange}
      label={"RUB"}
      step={1}
    />
  )
}
