import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@components/ui/input-group";
import flatpickr from "flatpickr";
import { CalendarClock } from "lucide-react";
import { ComponentProps, type FC } from "react";
import Flatpickr, { type DateTimePickerProps } from "react-flatpickr";
import Hook = flatpickr.Options.Hook;

interface Props
  extends Omit<DateTimePickerProps, "children" | "onChange" | "render"> {
  onChange: Hook;
  inputProps?: ComponentProps<"input">;
}

export const DateTimePicker: FC<Props> = ({
  inputProps,
  onChange,
  options,
  ...rest
}) => (
  <Flatpickr
    onChange={onChange}
    options={{ dateFormat: "F j, Y H:i", enableTime: true, ...options }}
    render={(_props, ref) => (
      <div className="relative mb-4 flex items-stretch">
        <InputGroup>
          <InputGroupAddon>
            <CalendarClock />
          </InputGroupAddon>
          <InputGroupInput
            className={"rounded-none rounded-r-md"}
            ref={ref}
            {...inputProps}
          ></InputGroupInput>
        </InputGroup>
      </div>
    )}
    {...rest}
  />
);

export default DateTimePicker;
