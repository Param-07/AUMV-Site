import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppData } from "../context/AppDataContext";
import School from "../assets/images/AlokSchool.png";
import SmartImage from "./SmartImages";

const HeroSection = () => {
  const { hero } = useAppData();

  const [current, setCurrent] = useState(0);

  let slides = [{ url: School }];

  if (hero && hero.length > 0) {
    const heroSlides = hero.filter((item) => item.category === "Hero");
    if (heroSlides.length > 0) {
      slides = heroSlides;
    }
  }

  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      className="relative h-[85vh] overflow-hidden"
      style={{ marginTop: "95px" }}
    >
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
  <SmartImage
    src={slides[current]?.url}
    alt={slides[current]?.title || "Hero Image"}
    priority
    className="w-full h-full object-cover"
    wrapperClassName="w-full h-full"
  />
</div>

<div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#15157d]/95 via-[#15157d]/75 to-[#15157d]/30" />

      {/* Decorative Accent */}
      <div className="absolute top-0 right-0 w-[35vw] h-full bg-gradient-to-l from-[#cca730]/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-6 md:px-10 flex items-center">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-[#ffe088] uppercase tracking-[0.25em] text-sm font-semibold mb-5"
          >
            Established Excellence
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white font-black text-4xl md:text-6xl lg:text-7xl leading-tight"
          >
            Nurturing Minds,
            <br />
            Building Futures
            <span className="block text-[#ffe088] mt-2">
              In Chandauli
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-7 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
          >
            A premier educational institution committed to academic
            excellence, character development, innovation, and lifelong
            learning for future generations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <a
              href="/#/admission"
              className="px-8 py-4 bg-red-700 hover:bg-red-800 text-white font-semibold rounded-lg shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Explore Admissions
            </a>

            <a
              href="/#/gallery"
              className="px-8 py-4 border border-white/80 text-white font-semibold rounded-lg hover:bg-white hover:text-[#15157d] transition-all duration-300"
            >
              View Campus
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-300 rounded-full ${
              current === index
                ? "w-10 h-3 bg-[#cca730]"
                : "w-3 h-3 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center text-white/80">
        <span className="text-xs uppercase tracking-widest mb-2">
          Scroll
        </span>

        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
          }}
          className="w-[2px] h-10 bg-white/60"
        />
      </div>
    </section>
  );
};

export default HeroSection;