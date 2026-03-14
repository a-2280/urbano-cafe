"use client";

import { createContext, useContext, useState } from "react";

const MobileMenuContext = createContext();

export function MobileMenuProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MobileMenuContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  return useContext(MobileMenuContext);
}
