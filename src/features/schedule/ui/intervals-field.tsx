import { Button, SelectForm } from "@/shared/ui"
import type { IntervalsSchemaType } from "../model/schemas/schedule.schema"
import { useFieldArray } from "react-hook-form"
import { TIME_OPTIONS } from "@/shared/lib";
import { AddIcon, CloseIcon } from "@/shared/icons";

interface IntervalsFieldProps {
  control: any;
  formState: any;
  isLoading: boolean;
}

export const IntervalsField = ({ control, formState, isLoading }: IntervalsFieldProps) => {
  const { fields, append, remove } = useFieldArray({ control, name: "intervals" });

  return (
    <>
      {fields.map((f, idx) => (
        <div key={f.id} className="grid grid-cols-2 gap-2.5 relative">
          <SelectForm<IntervalsSchemaType>
            name={`intervals.${idx}.start`}
            control={control}
            options={TIME_OPTIONS}
            error={formState.errors.intervals?.[idx]?.start}
            label={"Начало"}
            required
          />
          <SelectForm<IntervalsSchemaType>
            name={`intervals.${idx}.end`}
            control={control}
            options={TIME_OPTIONS}
            error={formState.errors.intervals?.[idx]?.end}
            label={"Конец"}
            required
          />
          {idx !== 0 && (
            <Button
              type="button"
              variant={"remove"}
              size={"icon_20"}
              onClick={() => remove(idx)}
              className="absolute top-0 right-0"
            ><CloseIcon width={14} height={14}/></Button>
          )}
        </div>
      ))}

      {fields.length < 6 && (
        <div className="flex items-center justify-center mt-2.5">
          <Button
            variant={"transparent"}
            size={"sm"}
            type={"button"}
            className={"font-medium"}
            iconLeft={<AddIcon width={16} height={16}/>}
            onClick={() => append({ start: "", end: "" })}
            disabled={isLoading}
          >
            Добавить интервал
          </Button>
        </div>
      )}
    </>
  )
}
