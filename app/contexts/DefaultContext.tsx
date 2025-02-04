// context/DefaultContext.js
"use client";

import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

type DefaultContextProviderProps = {
  children: ReactNode;
};

type DefaultContextProp = {
  isLargeScreen: boolean;
};

export const DefaultContext = createContext<DefaultContextProp | null>(null);

export default function DefaultContextProvider({
  children,
}: DefaultContextProviderProps) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <DefaultContext.Provider
      value={{
        isLargeScreen,
      }}
    >
      {children}
    </DefaultContext.Provider>
  );
}

export function useDefaultContext() {
  const context = useContext(DefaultContext);
  if (!context) {
    throw new Error(
      "useBillContext must be called within a BillContextProvider"
    );
  }
  return context;
}
