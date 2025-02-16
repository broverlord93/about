import { cn } from "@lib/utils";
import {
  CheckboxIndicator,
  CheckedState,
  Root,
} from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

interface IndeterminateCheckboxProps
  extends ComponentPropsWithoutRef<typeof Root> {
  checked: CheckedState;
  onCheckedChange: (checked: CheckedState) => void;
}

const IndeterminateCheckbox = forwardRef<
  ElementRef<typeof Root>,
  IndeterminateCheckboxProps
>(({ checked, onCheckedChange, className, ...props }, ref) => {
  return (
    <Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      ref={ref}
      className={cn(
        "ring-offset-white peer h-4 w-4 shrink-0 rounded-sm border border-lemon-chiffon-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemon-chiffon-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-lemon-chiffon-900 data-[state=indeterminate]:bg-lemon-chiffon-900 data-[state=checked]:text-lemon-chiffon-50 data-[state=indeterminate]:text-lemon-chiffon-50 dark:border-lemon-chiffon-50 dark:ring-offset-lemon-chiffon-950 dark:focus-visible:ring-lemon-chiffon-300 dark:data-[state=checked]:bg-lemon-chiffon-50 dark:data-[state=indeterminate]:bg-lemon-chiffon-50 dark:data-[state=checked]:text-lemon-chiffon-900 dark:data-[state=indeterminate]:text-lemon-chiffon-900",
        className,
      )}
      {...props}
    >
      <CheckboxIndicator
        className={cn("flex items-center justify-center text-current")}
      >
        {checked === "indeterminate" && <Minus className={"h-4 w-4"} />}
        {checked === true && <Check className="h-4 w-4" />}
      </CheckboxIndicator>
    </Root>
  );
});

export default IndeterminateCheckbox;
