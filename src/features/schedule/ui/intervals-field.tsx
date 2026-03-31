import { SelectForm } from "@/shared/ui"
import type { IntervalsSchemaType } from "../model/schemas/schedule.schema"
import { useFieldArray } from "react-hook-form"
import { TIME_OPTIONS } from "@/shared/lib";

interface IntervalsFieldProps {
  control: any;
  formState: any
}

export const IntervalsField = ({ control, formState }: IntervalsFieldProps) => {
  const { fields } = useFieldArray({ control, name: "intervals" })

  return (
    <>
      {fields.map((f, idx) => (
        <div key={f.id} className="grid grid-cols-2 gap-2.5">
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
        </div>
      ))}
    </>
  )
}
