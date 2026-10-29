import React from "react";
import { usePhoneInput, defaultCountries } from "react-international-phone";
import { FieldWrapper, type FieldWrapperPassThroughProps } from ".";
import type { VariantProps } from "class-variance-authority";
import { inputVariants } from "../input/variants";
import { cn } from "@/shared/utils";

type PhoneValue = { value: string; masked: string };

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> &
  FieldWrapperPassThroughProps &
  VariantProps<typeof inputVariants> & {
    onChange: (v: PhoneValue) => void;
    value?: string;
    className?: string;
    isError?: boolean;
    labelInput?: string;
  };

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className = "", variant, inputSize, label, error, required, message,
      isError = false, labelInput = "", value, onChange, ...props
    },
    ref,
  ) => {
    const raw = value as unknown;
    const phoneValue = typeof raw === "string" ? raw : (raw as PhoneValue | undefined)?.value ?? "";

    const { inputValue, handlePhoneValueChange, inputRef } = usePhoneInput({
      defaultCountry: "ru",
      value: phoneValue,
      countries: defaultCountries,
      onChange: ({ inputValue, phone, country }) => onChange(phone === `+${country.dialCode}` ? { value: "", masked: "" } : { value: phone, masked: inputValue }),
    });

    const setRefs = (el: HTMLInputElement | null) => {
      inputRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) ref.current = el;
    };

    return (
      <FieldWrapper label={label} error={error} required={required} message={message}>
        <div className="relative">
          <input
            {...props}
            ref={setRefs}
            type="tel"
            value={inputValue}
            onChange={handlePhoneValueChange}
            className={cn(
              inputVariants({ variant, inputSize, className }),
              (error || isError) && "border-error-color-icon focus:border-error-color-icon",
              labelInput && "pr-20",
            )}
          />
          {labelInput && (
            <div className="absolute bg-primary/90 h-full w-16 font-bold text-white right-0 bottom-0 flex items-center justify-center rounded-r-xl">
              {labelInput}
            </div>
          )}
        </div>
      </FieldWrapper>
    );
  },
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
