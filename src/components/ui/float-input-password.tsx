import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";
import {
  FloatingInput,
  FloatingLabel,
  FloatingLabelInputProps,
} from "./float-input";

interface FloatingLabelInputPasswordProps extends FloatingLabelInputProps {
  register?: UseFormRegisterReturn;
}

export function FloatingLabelInputPassword({
  error,
  register,
  ...props
}: FloatingLabelInputPasswordProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div
      className={twMerge([
        "flex outline-none rounded-md dark:bg-background border border-input dark:border-slate-600 mt-5 focus-within:border-slate-600 dark:focus-within:border-slate-300 max-w-full w-80 relative",
        error ? "!border-red-500 focus-within:border-red-500 " : "",
      ])}
    >
      <div className="relative flex-1 pr-9">
        <FloatingInput
          className="border-0 focus-visible:!ring-0 focus:!ring-0 !ring-0 !ring-offset-0"
          type={showPassword ? "text" : "password"}
          error={error}
          {...register}
          {...props}
        />
        <FloatingLabel error={error}>{props.label}</FloatingLabel>
      </div>

      <Button
        type="button"
        variant="ghost"
        className="hover:bg-transparent absolute right-0"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <>
            <EyeOff
              className={twMerge([
                "size-5 text-muted-foreground dark:text-slate-400 hover:opacity-80",
                error ? "text-red-500" : "",
              ])}
            />
          </>
        ) : (
          <>
            <EyeIcon
              className={twMerge([
                "size-5 text-muted-foreground dark:text-slate-400 hover:opacity-80",
                error ? "text-red-500" : "",
              ])}
            />
          </>
        )}
      </Button>
    </div>
  );
}
