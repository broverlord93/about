import { Input } from "@components/ui/input";
import flatpickr from "flatpickr";
import { CalendarClock } from "lucide-react";
import { ComponentProps, type FC, type ReactNode } from "react";
import Flatpickr, { type DateTimePickerProps } from "react-flatpickr";
import Hook = flatpickr.Options.Hook;

type UseIconProps =
  | {
      useIcon: true;
      Icon?: never;
    }
  | {
      useIcon?: false;
      Icon?: ReactNode;
    };

interface Props
  extends Omit<DateTimePickerProps, "children" | "onChange" | "render"> {
  onChange: Hook;
  inputProps?: ComponentProps<"input">;
}

export const DateTimePicker: FC<Props & UseIconProps> = ({
  Icon,
  inputProps,
  onChange,
  options,
  useIcon = true,
  ...rest
}) => (
  <Flatpickr
    onChange={onChange}
    options={{ dateFormat: "F j, Y H:i", enableTime: true, ...options }}
    render={(_props, ref) => (
      <div className="relative mb-4 flex items-stretch">
        {(useIcon || Icon) && (
          <span
            className="text-surface dark:border-white/10 flex items-center whitespace-nowrap rounded-l-md border border-b border-l border-r-0 border-t border-solid border-lemon-chiffon-900 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] dark:text-lemon-chiffon-900"
            id="basic-addon1"
          >
            {useIcon ? <CalendarClock /> : Icon}
          </span>
        )}
        <Input
          className={"rounded-none rounded-r-md"}
          ref={ref}
          {...inputProps}
        />
      </div>
    )}
    {...rest}
  />
);

export default DateTimePicker;
