// context/DataContext.js
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
import { fetchRentersData } from "@/actions/fetchRentersData";
import { fetchRentData } from "@/actions/fetchRentData";

type DataContextProviderProps = {
  children: ReactNode;
};

type DataContextProp = {
  data: Array<any>;
  rentersData: Array<any>;
  rentData: Array<any>;
  setData: Dispatch<SetStateAction<Array<any>>>;
  setRentersData: Dispatch<SetStateAction<Array<any>>>;
  setRentData: Dispatch<SetStateAction<Array<any>>>;
  fetchRenter: () =>void;
  fetchRents: () =>void;
};

export const DataContext = createContext<DataContextProp | null>(null);

export default function DataContextProvider({
  children,
}: DataContextProviderProps) {
  const [data, setData] = useState<Array<any>>([]);
  const [rentersData, setRentersData] = useState<Array<any>>([]);
  const [rentData, setRentData] = useState<Array<any>>([]);

  // async function getData() {
  //   const client = await clientPromise;
  //   const db = client.db("student-allocation");
  //   const collection = db.collection("renters");

  //   const data = await collection.find({}).toArray();
  //   setData(data);
  // }

  const fetchRenter = async () => {
    const result = await fetchRentersData();
    console.log("result: ", result);
    setRentersData(result);
  };

  const fetchRents = async () => {
    const rentResult = await fetchRentData();
    console.log("rentResult: ", rentResult);
    setRentData(rentResult);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchRenter();
      await fetchRents();
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("data: ", data);
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        data,
        rentersData,
        rentData,
        setData,
        setRentersData,
        setRentData,
        fetchRenter,
        fetchRents,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      "useBillContext must be called within a BillContextProvider"
    );
  }
  return context;
}
