"use client";
import { useState, useCallback, Suspense, useEffect } from "react";
import "@/style.css";
import Image from "next/image";
import { motion } from "motion/react";
import { useDefaultContext } from "@/contexts/DefaultContext";

export default function ImageComponent(props) {
  const { isLargeScreen, imageLayout } = useDefaultContext();

  const { group, groupKey, image, index, numberOfImages, setGroup } = props;

  const [hoveredIndex, setHoveredIndex] = useState<string>("");

  const imageId = `${groupKey}-${index}`;
  const normalWidth = (1 / numberOfImages) * 100;
  const hoveredImagesWidth = (40 / 100 / (numberOfImages - 1)) * 100;

  const handleMouseEnter = useCallback(() => {
    setHoveredIndex(imageId);
    setGroup(groupKey);
  }, [group, setGroup, setHoveredIndex]);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex("");
    setGroup(null);
  }, [group, setGroup, setHoveredIndex]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <motion.div
        key={imageId}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          width: isLargeScreen
            ? imageLayout
              ? "100%"
              : group !== null &&
                group === groupKey &&
                hoveredIndex.includes(groupKey) &&
                hoveredIndex === imageId
              ? "60%"
              : `${
                  group !== null && group === groupKey
                    ? hoveredImagesWidth
                    : normalWidth
                }%`
            : "100%", // Expand hovered image
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative h-full rounded-lg overflow-hidden shadow-lg cursor-pointer"
      >
        <Image
          className={`size-full ${
            imageLayout ? "object-contain" : "object-cover"
          } rounded-lg shadow-md`}
          src={image.imageSrc}
          alt="Home Left"
          width={2000}
          height={2000}
        />
        {/* <img
          className="size-full object-cover rounded-lg shadow-md"
          src={image.imageSrc}
          alt="Home Left"
        /> */}
      </motion.div>
    </Suspense>
  );
}
