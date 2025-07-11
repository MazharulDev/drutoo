import { DatePicker, DatePickerProps, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { getErrorMessageByPropertyName } from "@/utils/schema.validatior";

type DatePikerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
  size?: "large" | "small";
  required?: boolean;
  defaultValue?: string;
  disabledDate?: boolean;
};

const FormDatePicker = ({
  name,
  label,
  onChange,
  size = "large",
  value,
  required,
  defaultValue,
  disabledDate,
}: DatePikerProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString as string) : null;
    setValue(name, date);
  };

  return (
    <div>
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      {label ? label : null}
      <br />
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <DatePicker
            value={field.value ? dayjs(field.value) : undefined}
            size={size}
            onChange={handleOnChange}
            onBlur={field.onBlur}
            style={{ width: "100%" }}
            disabled={disabledDate ? disabledDate : false}
          />
        )}
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </div>
  );
};

export default FormDatePicker;
