"use client";
import dynamic from 'next/dynamic';
import { useState, Suspense } from "react";
import "@/style.css";
import { useDefaultContext } from "@/contexts/DefaultContext";
const ImageComponent = dynamic(() => import('@/components/ImageComponent'), { ssr: false });
// import ImageComponent from "@/components/ImageComponent";

export default function ImageGroupComponent(props) {
  const { images, imageGroupTitle, imageGroupKey } = props;

  const { isLargeScreen, clicks, setClicks, imageLayout, setImageLayout } =
  useDefaultContext();

  const [group, setGroup] = useState<string | null>(null);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1
        className={`${imageGroupTitle == 'Renovate House Front' && 'hidden'} text-xl lg:text-4xl font-black text-center mb-4`}
        key={`title_${imageGroupKey}`}
      >
        {imageGroupTitle}
      </h1>
      <div
        className={`flex flex-wrap justify-center w-full ${imageLayout ? 'lg:flex-wrap':'lg:flex-nowrap lg:h-screen'} mb-4`}
        key={imageGroupKey}
      >
        {images &&
          images.length > 0 &&
          images.map((image, key) => (
            <ImageComponent
              image={image}
              groupKey={imageGroupKey}
              index={key}
              numberOfImages={images.length}
              group={group}
              setGroup={setGroup}
            />
          ))}
      </div>
    </Suspense>
  );
}
