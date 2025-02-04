"use client";
import { useEffect, useState, Suspense } from "react";
import "@/style.css";
import { useDefaultContext } from "@/contexts/DefaultContext";
import { motion } from "motion/react";
import { fetchImages } from "@/actions/fetchImages";
import ImageGroupComponent from "@/components/ImageGroupComponent";

export default function Home() {
  const { isLargeScreen } = useDefaultContext();

  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);

  const imagesData = [
    {
      imageGroupTitle: "Renovate House Front",
      imageGroupKey: "new-front",
      imageGroup: [
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20240611_184451143.jpg",
        },
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20240611_184535860.jpg",
        },
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20240611_184519620.jpg",
        },
      ],
    },
    {
      imageGroupTitle: "Renovate House Back",
      imageGroupKey: "new-back",
      imageGroup: [
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20240611_183822805.jpg",
        },
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20240611_183814969.jpg",
        },
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20240611_183809078.jpg",
        },
      ],
    },
    {
      imageGroupTitle: "Old House Front",
      imageGroupKey: "old-front",
      imageGroup: [
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20230209_101816907.jpg",
        },
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20230206_182527043 (1).jpg",
        },
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG-20221229-WA0006.jpg",
        },
      ],
    },
    {
      imageGroupTitle: "House Border",
      imageGroupKey: "house-border",
      imageGroup: [
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20240611_184657112.jpg",
        },

        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20231028_102827169.jpg",
        },
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20230209_103317140.jpg",
        },
        {
          imageId: "",
          imageTitle: "",
          imageSrc: "/assets/images/house/IMG_20240611_184103792.jpg",
        },
      ],
    },
  ];

  useEffect(() => {
    const isProd = process.env.NODE_ENV === "production";

    if (isProd) {
      fetch("/api/fetchImages")
        .then((res) => res.json())
        .then((data) => setImages(data))
        .catch((err) => console.error("Error loading images", err));
    } else {
      const fetchImg = async () => {
        const result = await fetchImages();
        if (result.status == "success") {
          setImages(result.files);
        }
      };
      fetchImg();
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <header className="hidden border bg-gray p-4 mb-4"></header>
      <main className="">
        <div className="">
          <div className="flex justify-evenly lg:justify-between text-3xl lg:text-[8vw] leading-[0.7]">
            <h1 className="uppercase font-black text-center text-inherit">
              Parshuram
            </h1>
            <h1 className="uppercase font-black text-center text-inherit">
              Raorane
            </h1>
          </div>
          <img
            src="/assets/images/house/IMG_20230206_182527043 (1).jpg"
            alt="HomeImage"
            className="hidden h-[70vh] w-full object-center object-cover"
          />
        </div>

        <div>
          {imagesData &&
            imagesData.length > 0 &&
            imagesData.map((image) => (
              <ImageGroupComponent
                images={image.imageGroup}
                imageGroupTitle={image.imageGroupTitle}
                imageGroupKey={image.imageGroupKey}
              />
            ))}
        </div>

        {/* All Images in folder */}
        <div className="lg:container flex flex-wrap justify-center lg:gap-4 mb-4">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Image ${index}`}
              className="w-1/4 lg:w-1/5 h-auto object-contain rounded-lg shadow-md"
            />
          ))}
        </div>
      </main>
    </Suspense>
  );
}
