import { memo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/hooks";
import { bookingSelector, setBookingMark } from "@/entities/booking";
import { RadioGroup, RadioGroupItem } from "@/shared/ui"

export const BookingChangeMark = memo(() => {
  const dispatch = useAppDispatch();
  const mark =  useSelector(bookingSelector).mark;

  const onValueChange = (m: MarkType) => {
    dispatch(setBookingMark(m))
  }

  return (
    <div>
      <RadioGroup
        name={"mark"}
        className={"flex items-center gap-2.5"}
        onValueChange={onValueChange}
        value={mark}
      >
        <RadioGroupItem className="bg-red-500 w-7 h-7 border-none data-checked:bg-red-500!" value={"red"} id={"red"} />
        <RadioGroupItem className="bg-orange-500 w-7 h-7 border-none data-checked:bg-orange-500!" value={"orange"} id={"orange"} />
        <RadioGroupItem className="bg-green-500 w-7 h-7 border-none data-checked:bg-green-500!" value={"green"} id={"green"} />
        <RadioGroupItem className="bg-blue-500 w-7 h-7 border-none data-checked:bg-blue-500!" value={"blue"} id={"blue"} />
        <RadioGroupItem className="bg-purple-500 w-7 h-7 border-none data-checked:bg-purple-500!" value={"purple"} id={"purple"} />
        <RadioGroupItem className="bg-teal-500 w-7 h-7 border-none data-checked:bg-teal-500!" value={"teal"} id={"teal"} />
        <RadioGroupItem className="bg-pink-500 w-7 h-7 border-none data-checked:bg-pink-500!" value={"pink"} id={"pink"} />
        <RadioGroupItem className="bg-primary w-7 h-7 border-none data-checked:bg-primary!" value={"primary"} id={"primary"} />
      </RadioGroup>
    </div>
  )
})

BookingChangeMark.displayName = "BookingChangeMark";
