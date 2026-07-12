import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import SmartImage from "../SmartImages";

const FacilitiesHero = () => {
  const { facilities = [] } = useAppData();
  const [currentImage, setCurrentImage] = useState(0);

  /* ---------------- DYNAMIC FACILITIES EXTRACTION ---------------- */
  const facilityImages = useMemo(() => {
    if (!facilities || !facilities.length) {
      return [
        {
          src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800",
          title: "World-Class Infrastructure",
          description: "Sophisticated ecosystem designed to nurture academic brilliance.",
        },
      ];
    }

    const images = facilities.flatMap((group) => {
      const subFacilities = group.facilities || [];
      return subFacilities.map((fac) => ({
        src: fac.src || fac.url,
        title: fac.title || group.title || "Campus Facility",
        description: fac.description || "State-of-the-art campus infrastructure built for excellence.",
      }));
    });

    if (images.length === 0) {
      return [
        {
          src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800",
          title: "World-Class Infrastructure",
          description: "Sophisticated ecosystem designed to nurture academic brilliance.",
        },
      ];
    }

    return images;
  }, [facilities]);

  /* ---------------- TIMED INTERVAL SCHEDULER ---------------- */
  useEffect(() => {
    if (!facilityImages.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % facilityImages.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [facilityImages.length]);

  const current = facilityImages[currentImage];

  return (
    <section
      className="
        relative
        mt-[95px]
        grid
        /* Forced side-by-side split layout ratio on ALL screen resolutions */
        grid-cols-[46%_54%] 
        /* Minimized compressed height limits */
        min-h-[280px]
        sm:min-h-[380px]
        lg:min-h-[460px]
        bg-[#0d104f]
        overflow-hidden
      "
    >
      {/* ================= LEFT CONTENT COLUMN ================= */}
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
          /* Low-profile internal paddings */
          py-4
          px-3
          sm:px-8
          lg:px-12
        "
      >
        {/* Shrunk Decorative Background Element */}
        <div className="absolute -left-28 -bottom-24 w-64 h-64 rounded-full bg-[#cca730]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Tagline Indicator Accent */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-4">
              <span className="w-4 sm:w-8 h-[1px] bg-[#cca730]/50" />
              <span className="uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[8px] sm:text-[10px] text-[#cca730] font-semibold whitespace-nowrap">
                World-Class Infrastructure
              </span>
            </div>

            {/* Shrunk Micro Typography Headings */}
            <h1 className="text-lg sm:text-3xl md:text-5xl xl:text-6xl font-black text-white leading-tight">
              Heritage Excellence,
              <span className="block italic text-[#cca730] my-0">
                Modern Evolution.
              </span>
            </h1>

            {/* Restricted Paragraph Block with Clamp Guards */}
            <p className="mt-1.5 sm:mt-4 text-[10px] sm:text-sm md:text-base text-white/75 leading-relaxed max-w-md line-clamp-2 sm:line-clamp-3">
              Alok Inter College provides a sophisticated ecosystem designed to nurture academic brilliance through state-of-the-art facilities and disciplined mentorship.
            </p>

            {/* Smart Action Triggers (Stacked on Mobile, Balanced on Desktop) */}
            <div className="mt-3 sm:mt-6 flex flex-col sm:flex-row gap-1.5 sm:gap-3 w-full">
              <button className="group w-full sm:w-auto text-center whitespace-nowrap bg-[#cca730] text-[#15157d] px-2.5 sm:px-6 py-1.5 sm:py-2.5 text-[9px] sm:text-sm font-bold flex items-center justify-center gap-1 hover:scale-[1.02] transition-all duration-300">
                Explore Facilities
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform hidden sm:inline-block" />
              </button>

              <button className="w-full sm:w-auto text-center whitespace-nowrap border border-white/20 text-white px-2.5 sm:px-6 py-1.5 sm:py-2.5 text-[9px] sm:text-sm font-semibold hover:bg-white hover:text-[#15157d] transition-all duration-300">
                Virtual Tour
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= RIGHT IMAGE SLIDER COLUMN ================= */}
      <div className="relative overflow-hidden group h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 5.5, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <SmartImage
              src={current.src}
              alt={current.title}
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Shadow Mixing Layer Grid */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15157d]/80 via-black/5 to-transparent" />

        {/* Low Profile Responsive Slider Pagination Array */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-1 z-20 bg-black/30 backdrop-blur-md px-1.5 py-1 rounded-full scale-75 sm:scale-90">
          {facilityImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`transition-all duration-300 rounded-full h-1 ${
                currentImage === index ? "w-3 sm:w-4 bg-[#cca730]" : "w-1 bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Minimal Compact Spotlight Floating Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`card-${currentImage}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-2 left-2 right-2 sm:left-auto sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md p-2 sm:p-4 max-w-[220px] sm:max-w-xs shadow-xl border-l-4 border-[#cca730]"
          >
            <span className="uppercase tracking-wider text-[7px] sm:text-[9px] text-slate-500 font-semibold block">
              Featured Lab & Resource
            </span>
            <h3 className="mt-0.5 text-[10px] sm:text-base font-bold text-[#15157d] leading-tight truncate">
              {current.title}
            </h3>
            <p className="mt-0.5 text-slate-600 text-[9px] sm:text-xs leading-normal line-clamp-1 sm:line-clamp-2">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FacilitiesHero;