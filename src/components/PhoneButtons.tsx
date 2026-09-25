"use client";

import Button from "./Button";
import {
  UK_PHONE_DISPLAY,
  UK_PHONE_HREF,
  US_PHONE_DISPLAY,
  US_PHONE_HREF,
} from "@/lib/phones";

export default function PhoneButtons({
  variant = "primary",
  className = "max-sm:text-[14px] max-sm:px-4",
}: {
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <>
      <Button font="poppins" variant={variant} className={className}>
        <a href={US_PHONE_HREF}>{US_PHONE_DISPLAY}</a>
      </Button>
      <Button font="poppins" variant={variant} className={className}>
        <a href={UK_PHONE_HREF}>{UK_PHONE_DISPLAY}</a>
      </Button>
    </>
  );
}
