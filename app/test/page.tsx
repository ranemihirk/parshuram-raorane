"use client";
import { useState, Suspense } from "react";

export default function Test() {
  const isProd = process.env.NODE_ENV === "production";
  const expenses = [25000, 20000, 9696, 824, 3000, 5417, 20000, 2000];
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={`${isProd && ""} container flex justify-evenly`}>
        <h2>Expenses:</h2>{" "}
        <span>{expenses.reduce((acc, num) => acc + num, 0)}</span>
        <span>{110000 - expenses.reduce((acc, num) => acc + num, 0)}</span>
      </div>
    </Suspense>
  );
}
