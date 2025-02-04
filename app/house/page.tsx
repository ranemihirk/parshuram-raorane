"use client";
import { useState, Suspense } from "react";
import "@/style.css";

export default function House() {
    const isProd = process.env.NODE_ENV === "production";
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={`${isProd && ''} container`}>
        <img className="w-full" src="/assets/images/gardening/plant-cheatsheet.jpeg" alt="" />
      </div>
    </Suspense>
  );
}
