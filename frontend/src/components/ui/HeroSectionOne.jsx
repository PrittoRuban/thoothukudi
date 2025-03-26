"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = (delay = 0, blur = 4) => ({
  initial: { opacity: 0, filter: `blur(${blur}px)`, y: 10 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: { duration: 0.3, delay, ease: "easeInOut" },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, delay },
});

const buttonStyles =
  "w-60 transform rounded-lg px-6 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5";

export default function HeroSectionOne() {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center px-4">
      {/* Title Animation */}
      <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
        {"Launch your website in hours, not days"
          .split(" ")
          .map((word, index) => (
            <motion.span
              key={index}
              {...fadeInUp(index * 0.1)}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
      </h1>

      {/* Subheading */}
      <motion.p
        {...fadeIn(0.8)}
        className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
      >
        With AI, you can launch your website in hours, not days. Try our
        best-in-class AI tools.
      </motion.p>

      {/* Buttons */}
      <motion.div
        {...fadeIn(1)}
        className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <button
          className={`${buttonStyles} bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200`}
        >
          Explore Now
        </button>
        <button
          className={`${buttonStyles} border border-gray-300 bg-white text-black hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900`}
        >
          Contact Support
        </button>
      </motion.div>

      {/* Preview Image */}
      <motion.div
        {...fadeInUp(1.2)}
        className="relative z-10 mt-20 rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      >
        <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
          <Image
            src="https://assets.aceternity.com/pro/aceternity-landing.webp"
            alt="Landing page preview"
            className="aspect-[16/9] h-auto w-full object-cover"
            height={1000}
            width={1000}
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}
