"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

type OverlayContextValue = {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
};

const DropdownOverlayContext = createContext<OverlayContextValue | null>(null);

export const DropdownOverlayProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  const setVisible = useCallback((visible: boolean) => {
    setIsVisible(visible);
  }, []);

  const value = useMemo(() => ({ isVisible, setVisible }), [isVisible, setVisible]);

  return (
    <DropdownOverlayContext.Provider value={value}>{children}</DropdownOverlayContext.Provider>
  );
};

export const useDropdownOverlay = () => {
  const ctx = useContext(DropdownOverlayContext);
  if (!ctx) throw new Error("useDropdownOverlay must be used within DropdownOverlayProvider");
  return ctx;
};