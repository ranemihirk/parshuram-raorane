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
  clicks: boolean;
  imageLayout: boolean;
  setClicks: Dispatch<SetStateAction<boolean>>;
  setImageLayout: Dispatch<SetStateAction<boolean>>;
};

export const DefaultContext = createContext<DefaultContextProp | null>(null);

export default function DefaultContextProvider({
  children,
}: DefaultContextProviderProps) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const [clicks, setClicks] = useState(false);
  const [imageLayout, setImageLayout] = useState(false);

  useEffect(() => {
    if (clicks) {
      setTimeout(() => {
        setClicks(false);
      }, 10000);
    }
  }, [clicks]);

  return (
    <DefaultContext.Provider
      value={{
        isLargeScreen,
        clicks,
        imageLayout,
        setClicks,
        setImageLayout,
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
