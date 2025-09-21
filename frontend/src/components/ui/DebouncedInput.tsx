import { Input } from "@components/ui/input";
import useInput from "@src/hooks/useInput";
import { ComponentProps, FC, useEffect } from "react";

interface DebouncedInputProps extends ComponentProps<"input"> {
  value: string | number;
  onDebouncedChange: (value: string | number) => void;
  debounce?: number;
}

const DebouncedInput: FC<DebouncedInputProps> = ({
  value: initialValue,
  onDebouncedChange,
  debounce = 500,
  ...props
}) => {
  const { debouncedValue, onChangeHandler, value } = useInput({
    debounce,
    initialValue,
  });

  useEffect(() => {
    onDebouncedChange(debouncedValue);
  }, [debouncedValue, onDebouncedChange]);

  return <Input value={value} onChange={onChangeHandler} {...props} />;
};

export default DebouncedInput;
