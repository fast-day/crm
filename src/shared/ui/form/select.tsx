import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { FieldWrapper, type FieldWrapperPassThroughProps } from "./field-wrapper"
import { Select, type SelectOptions } from "../select"

interface SelectFormProps<F extends FieldValues> extends FieldWrapperPassThroughProps {
  name: Path<F>;
  options: SelectOptions[];
  control: Control<F>;
  isError?: boolean;
  placeholder?: string;
}

export const SelectForm = <F extends FieldValues>({ name, placeholder, options, control, label, error, required }: SelectFormProps<F>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FieldWrapper label={label} error={error} required={required}>
          <Select
            options={options}
            value={field.value}
            onChange={(v) => field.onChange(v)}
            isError={!!error}
            placeholder={placeholder}
          />
        </FieldWrapper>
      )}
    />
  )
}
