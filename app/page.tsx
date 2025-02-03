"use client";
import { useEffect, useState } from "react";
import "@/style.css";
import { motion, useInView } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faSitemap } from "@fortawesome/free-solid-svg-icons/faSitemap";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons/faWheelchair";
import useMediaQuery from "@mui/material/useMediaQuery";
import { fetchImages } from "@/actions/fetchImages";

export default function Home() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImg = async () => {
      const result = await fetchImages();
    setImages(result);
    };
    fetchImg();
  }, []);

  useEffect(() => {
    console.log("hoveredIndex: ", hoveredIndex);
  }, [hoveredIndex]);
  return (
    <>
      <header className="p-4 mb-4">
        <div className="bg-gray text-dark shadow-md shadow-dark/30 rounded-full px-8 py-4 delay-300 transition-all">
          <h1 className="text-4xl font-black cursor-pointer text-center">
            Parshuram Raorane
          </h1>
        </div>
      </header>
      <main className="">
        {/* All Images in folder */}
        <div
          className={`${
            process.env.NODE_ENV === "production" && "hidden"
          } container flex flex-wrap justify-center gap-4 mb-4`}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Image ${index}`}
              className="w-1/5 h-auto rounded-lg shadow-md"
            />
          ))}
        </div>
        {/* Renovated House Images */}
        <h1 className="text-4xl font-black text-center mb-4">Renovated</h1>
        <div className="flex flex-wrap w-full lg:h-[50vh] lg:flex-nowrap gap-2 mb-4">
          <motion.div
            onMouseEnter={() => setHoveredIndex("new-left")}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              width: isLargeScreen
                ? hoveredIndex != null && hoveredIndex.includes("new")
                  ? hoveredIndex === "new-left"
                    ? "60%"
                    : "20%"
                  : "33.33%"
                : "100%", // Expand hovered image
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              className="size-full object-cover rounded-lg shadow-md"
              src="/assets/images/house/IMG_20240611_184451143.jpg"
              alt="Home Left"
            />
          </motion.div>
          <motion.div
            onMouseEnter={() => setHoveredIndex("new-center")}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              width: isLargeScreen
                ? hoveredIndex != null && hoveredIndex.includes("new")
                  ? hoveredIndex === "new-center"
                    ? "60%"
                    : "20%"
                  : "33.33%"
                : "100%", // Expand hovered image
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              className="size-full object-cover rounded-lg shadow-md"
              src="/assets/images/house/IMG_20240611_184535860.jpg"
              alt="Home Front"
            />
          </motion.div>
          <motion.div
            onMouseEnter={() => setHoveredIndex("new-right")}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              width: isLargeScreen
                ? hoveredIndex != null && hoveredIndex.includes("new")
                  ? hoveredIndex === "new-right"
                    ? "60%"
                    : "20%"
                  : "33.33%"
                : "100%", // Expand hovered image
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              className="size-full object-cover rounded-lg shadow-md"
              src="/assets/images/house/IMG_20240611_184519620.jpg"
              alt="Home Right"
            />
          </motion.div>
        </div>
        {/* Old House Images */}
        <h1 className="text-4xl font-black text-center mb-4">Old</h1>
        <div className="flex flex-wrap w-full lg:h-[50vh] lg:flex-nowrap gap-2 mb-4">
          <motion.div
            onMouseEnter={() => setHoveredIndex("old-left")}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              width: isLargeScreen
                ? hoveredIndex != null && hoveredIndex.includes("old")
                  ? hoveredIndex === "old-left"
                    ? "60%"
                    : "20%"
                  : "33.33%"
                : "100%", // Expand hovered image
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              className="size-full object-cover rounded-lg shadow-md"
              src="/assets/images/house/IMG_20230209_101816907.jpg"
              alt="Home Left"
            />
          </motion.div>
          <motion.div
            onMouseEnter={() => setHoveredIndex("old-center")}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              width: isLargeScreen
                ? hoveredIndex != null && hoveredIndex.includes("old")
                  ? hoveredIndex === "old-center"
                    ? "60%"
                    : "20%"
                  : "33.33%"
                : "100%", // Expand hovered image
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              className="size-full object-cover rounded-lg shadow-md"
              src="/assets/images/house/IMG_20230206_182527043 (1).jpg"
              alt="Home Front"
            />
          </motion.div>
          <motion.div
            onMouseEnter={() => setHoveredIndex("old-right")}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              width: isLargeScreen
                ? hoveredIndex != null && hoveredIndex.includes("old")
                  ? hoveredIndex === "old-right"
                    ? "60%"
                    : "20%"
                  : "33.33%"
                : "100%", // Expand hovered image
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
          >
            <img
              className="size-full object-cover rounded-lg shadow-md"
              src="/assets/images/house/IMG-20221229-WA0006.jpg"
              alt="Home Right"
            />
          </motion.div>
        </div>
      </main>
    </>
  );
}
