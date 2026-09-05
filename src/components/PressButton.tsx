"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type PressButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onClick" | "onPointerDown"
> & {
  onPress: () => void;
  children: ReactNode;
};

export function dismissKeyboard() {
  const active = document.activeElement;
  if (active instanceof HTMLElement) active.blur();
}

/** Fires on the first touch so the keypad cannot swallow the tap. */
export function PressButton({
  onPress,
  type = "button",
  ...props
}: PressButtonProps) {
  return (
    <button
      type={type}
      {...props}
      onPointerDown={(event) => {
        if (event.pointerType === "touch" || event.pointerType === "pen") {
          event.preventDefault();
          onPress();
        }
      }}
      onClick={(event) => {
        const pointer =
          "pointerType" in event.nativeEvent
            ? event.nativeEvent.pointerType
            : "mouse";
        if (pointer === "touch" || pointer === "pen") return;
        onPress();
      }}
    />
  );
}
