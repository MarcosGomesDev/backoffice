import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";
import { FloatingLabelInput, FloatingLabelInputProps } from "./float-input";

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
        "flex outline-none rounded-md dark:bg-background border border-input dark:border-slate-600 mt-5 focus-within:border-slate-600 dark:focus-within:border-slate-300 min-w-[350px]",
        error ? "border-red-500 focus-within:border-red-500 " : "",
      ])}
    >
      <FloatingLabelInput
        error={error}
        type={showPassword ? "text" : "password"}
        className={twMerge([
          "!flex-1 border-0 focus-visible:!ring-0 focus:!ring-0 !ring-0 !ring-offset-0 w-full !pr-0 min-w-[305px]",
        ])}
        {...register}
        {...props}
      />

      <Button
        type="button"
        variant="ghost"
        className="hover:bg-transparent pl-2"
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
