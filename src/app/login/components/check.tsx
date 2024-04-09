"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

export function CheckInput() {
  function handleCheck(e: CheckedState) {
    console.log(e);
  }

  return (
    <Checkbox
      id="remember-me"
      className="mr-2 border"
      onCheckedChange={handleCheck}
    />
  );
}
