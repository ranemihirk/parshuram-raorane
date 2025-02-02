"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

export default function Test() {
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const ref = useRef(null);
  // const isInView = useInView({ root: container });
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
  };

  return (
    <div className="relative">
      <motion.div
        className={`${
          open ? "overflow-y-hidden" : "overflow-y-scroll"
        } h-screen w-full flex items-end justify-end flex-wrap`}
      >
        <motion.div className="h-screen w-full" initial={{ opacity: 1 }}>
          <div className="overflow-hidden">
            <motion.h1
              className="text-9xl relative backface-hidden will-change-transform"
              initial={{
                opacity: 1,

                y: "100%",
              }}
              whileInView={{
                opacity: 1,
                y: "0%", // Slide in to its original position
                transition: {
                  duration: 1, // Animation duration
                },
              }}
              viewport={{ once: true }}
            >
              Mihir Rane
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="text-5xl relative backface-hidden will-change-transform"
              initial={{
                opacity: 1,

                y: "100%",
              }}
              whileInView={{
                opacity: 1,
                y: "0%", // Slide in to its original position
                transition: {
                  duration: 1, // Animation duration
                },
              }}
              viewport={{ once: true }}
            >
              Mihir Rane
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="text-xl relative backface-hidden will-change-transform"
              initial={{
                opacity: 1,

                y: "100%",
              }}
              whileInView={{
                opacity: 1,
                y: "0%", // Slide in to its original position
                transition: {
                  duration: 1, // Animation duration
                },
              }}
              viewport={{ once: true }}
            >
              Mihir Rane
            </motion.h1>
          </div>
          <button className="p-4 border" onClick={() => setOpen(true)}>
            Click me
          </button>
        </motion.div>
        <motion.div
          className="h-screen w-full bg-red"
          initial={{
            opacity: 0,
            // if odd index card,slide from right instead of left
            y: 200,
          }}
          whileInView={{
            opacity: 1,
            y: 0, // Slide in to its original position
            transition: {
              duration: 1, // Animation duration
            },
          }}
          viewport={{ once: true }}
        >
          <div
            className="flex justify-center relative w-fit m-auto group/item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="/test.png"
              alt=""
              className="transition delay-150 ease-in-out absolute top-0 left-0 z-10 opacity-100 group-hover/item:opacity-0"
            />
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              className="rounded-lg shadow-lg w-full max-w-2xl"
            >
              <source src="/test.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
        <motion.div
          className="w-full bg-green"
          initial={{
            opacity: 0,
            // if odd index card,slide from right instead of left
            y: 200,
          }}
          whileInView={{
            opacity: 1,
            y: 0, // Slide in to its original position
            transition: {
              duration: 1, // Animation duration
            },
          }}
          viewport={{ once: true }}
        >
          <div className="w-[90vw] m-auto">
            <div className="grid grid-cols-4 xl:grid-cols-12 gap-1 mb-4">
              <div className="col-[1/5] xl:col-[4/11] border w-full aspect-video"></div>
            </div>
            <div className="grid grid-cols-4 xl:grid-cols-12 gap-4 mb-4">
              <div className="col-[1/5] xl:col-[3/9] border w-full aspect-video"></div>
              <div className="col-[1/5] xl:col-[9/13] border w-full aspect-video"></div>
            </div>
            <div className=" grid grid-cols-4 xl:grid-cols-12 gap-4 mb-4">
              <div className="col-[1/5] xl:col-[5/10] border w-full aspect-video"></div>
            </div>
            <div className=" grid grid-cols-4 xl:grid-cols-12 gap-4 mb-4">
              <div className="col-[1/5] xl:col-[3/7] border w-full aspect-video"></div>
              <div className="col-[1/5] xl:col-[7/13] border w-full aspect-video"></div>
            </div>
            <div className=" grid grid-cols-4 xl:grid-cols-12 gap-4 mb-4">
              <div className="col-[1/5] xl:col-[4/11] border w-full aspect-video"></div>
            </div>
            <div className=" grid grid-cols-4 xl:grid-cols-12 gap-4 mb-4">
              <div className="col-[1/5] xl:col-[7/13] border w-full aspect-video"></div>
            </div>
            <div className=" grid grid-cols-4 xl:grid-cols-12 gap-4 mb-4">
              <div className="col-[1/5] xl:col-[3/8] border w-full aspect-video"></div>
              <div className="col-[1/5] xl:col-[8/12] border w-full aspect-video"></div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="h-screen w-full bg-gray"
          initial={{
            opacity: 0,
            // if odd index card,slide from right instead of left
            y: 200,
          }}
          whileInView={{
            opacity: 1,
            y: 0, // Slide in to its original position
            transition: {
              duration: 1, // Animation duration
            },
          }}
          viewport={{ once: true }}
        ></motion.div>
      </motion.div>
      <motion.div
        className={`${
          open && "overflow-y-scroll"
        } fixed bg-red min-h-screen max-h-screen w-screen`}
        initial={{ left: 0, top: "100%" }}
        animate={{ top: open ? "0%" : "100%" }}
        transition={{ duration: 0.5 }}
      >
        <button className="p-4 border" onClick={() => setOpen(false)}>
          GoBack
        </button>
        <div className="border h-[350px]"></div>
        <div className="border h-[350px]"></div>
        <div className="border h-[350px]"></div>
        <div className="border h-[350px]"></div>
      </motion.div>
    </div>
  );
}
