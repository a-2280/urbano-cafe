"use client";

import { useMobileMenu } from "./MobileMenuContext";

export default function MobileMenuCloseButton() {
  const { setIsOpen } = useMobileMenu();
  return (
    <button
      className="button-secondary m-show"
      onClick={() => setIsOpen(false)}
    >
      Close
    </button>
  );
}
