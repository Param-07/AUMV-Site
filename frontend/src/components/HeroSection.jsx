import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import School from "../assets/images/AlokSchool.png";
import SmartImage from "./SmartImages";

const HeroSection = () => {
  const { hero } = useAppData();
  const [current, setCurrent] = useState(0);

  let slides = [{ url: School, title: "Main Campus", description: "Our beautiful state-of-the-art campus infrastructure." }];

  if (hero && hero.length > 0) {
    const heroSlides = hero.filter((item) => item.category === "Hero");
    if (heroSlides.length > 0) {
      slides = heroSlides.map(slide => ({
        url: slide.url,
        title: slide.title || "Campus View",
        description: slide.description || "Explore our premium academic environments and facilities."
      }));
    }
  }

  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      className="
        relative
        mt-[95px]
        grid
        grid-cols-[46%_54%] 
        /* Dramatically reduced height profiles */
        min-h-[280px]
        sm:min-h-[380px]
        lg:min-h-[460px]
        bg-[#0d104f]
        overflow-hidden
      "
    >
      {/* ================= LEFT CONTENT PANEL ================= */}
      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#15157d]
          via-[#12156d]
          to-[#0d104f]
          flex
          items-center
          /* Tightened internal padding */
          py-4
          px-3
          sm:px-8
          lg:px-12
        "
      >
        <div className="absolute -left-28 -bottom-24 w-64 h-64 rounded-full bg-[#cca730]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tagline Indicator - Shrunk spacing */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-4">
              <span className="w-4 sm:w-8 h-[1px] bg-[#cca730]/50" />
              <span className="uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[8px] sm:text-[10px] text-[#cca730] font-semibold whitespace-nowrap">
                Established Excellence
              </span>
            </div>

            {/* Typography Heading */}
            <h1 className="text-lg sm:text-3xl md:text-5xl xl:text-6xl font-black text-white leading-tight">
              Nurturing Minds,
              <span className="block italic text-[#cca730] my-0">
                Building Futures
              </span>
            </h1>

            {/* Description Paragraph - Shrunk margins and restricted line counts */}
            <p className="mt-1.5 sm:mt-4 text-[10px] sm:text-sm md:text-base text-white/75 leading-relaxed max-w-md line-clamp-2 sm:line-clamp-3">
              A premier educational institution committed to academic excellence, character development, innovation, and lifelong learning.
            </p>

            {/* Compact Action Triggers */}
            <div className="mt-3 sm:mt-6 flex flex-col sm:flex-row gap-1.5 sm:gap-3 w-full">
              <a
                href="/#/admission"
                className="group w-full sm:w-auto text-center whitespace-nowrap bg-[#cca730] text-[#15157d] px-2.5 sm:px-6 py-1.5 sm:py-2.5 text-[9px] sm:text-sm font-bold flex items-center justify-center gap-1 hover:scale-[1.02] transition-all duration-300"
              >
                Admissions
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform hidden sm:inline-block" />
              </a>

              <a
                href="/#/gallery"
                className="w-full sm:w-auto text-center whitespace-nowrap border border-white/20 text-white px-2.5 sm:px-6 py-1.5 sm:py-2.5 text-[9px] sm:text-sm font-semibold hover:bg-white hover:text-[#15157d] transition-all duration-300"
              >
                School Gallery
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= RIGHT IMAGE SLIDER PANEL ================= */}
      <div className="relative overflow-hidden group h-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 1 }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 5.5, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <SmartImage
              src={slides[current]?.url}
              alt={slides[current]?.title || "Campus View"}
              priority
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#15157d]/80 via-black/5 to-transparent" />

        {/* Scaled-down Navigation Indicators */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-1 z-20 bg-black/30 backdrop-blur-md px-1.5 py-1 rounded-full scale-75 sm:scale-90">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full h-1 ${
                current === index ? "w-3 sm:w-4 bg-[#cca730]" : "w-1 bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Low-Profile Floating Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${current}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-2 left-2 right-2 sm:left-auto sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md p-2 sm:p-4 max-w-[220px] sm:max-w-xs shadow-xl border-l-4 border-[#cca730]"
          >
            <span className="uppercase tracking-wider text-[7px] sm:text-[9px] text-slate-500 font-semibold block">
              Featured Highlight
            </span>
            <h3 className="mt-0.5 text-[10px] sm:text-base font-bold text-[#15157d] leading-tight truncate">
              {slides[current]?.title}
            </h3>
            <p className="mt-0.5 text-slate-600 text-[9px] sm:text-xs leading-normal line-clamp-1 sm:line-clamp-2">
              {slides[current]?.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection;