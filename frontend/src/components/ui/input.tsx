import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "ring-offset-white flex h-10 w-full rounded-md border border-lemon-chiffon-900 bg-transparent px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-lemon-chiffon-950 placeholder:text-lemon-chiffon-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lemon-chiffon-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-lemon-chiffon-800 dark:bg-lemon-chiffon-950 dark:ring-offset-lemon-chiffon-950 dark:file:text-lemon-chiffon-50 dark:placeholder:text-lemon-chiffon-400 dark:focus-visible:ring-lemon-chiffon-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
