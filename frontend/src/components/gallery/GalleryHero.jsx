import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Infinity } from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import SmartImage from "../SmartImages";

const GalleryHero = ({
  mediaType,
  setMediaType,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { gallery = [] } = useAppData();
  const [currentImage, setCurrentImage] = useState(0);

  /* ---------------- HERO IMAGES FILTER & FALLBACK ---------------- */
  const heroImages = useMemo(() => {
    const fallback = [
      {
        src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800",
        description: "Explore memorable moments from the vibrant journey of Alok Inter College.",
        category: "Campus Life",
      },
    ];

    if (!gallery || !gallery.length) return fallback;

    const flattened = gallery.flatMap((item) =>
      (item.images || []).map((image) => ({
        ...image,
        category: item.category || "General",
        src: image.src || image.url,
        description: image.description || "Capturing milestones and unforgettable campus highlights.",
      }))
    );

    return flattened.length > 0 ? flattened : fallback;
  }, [gallery]);

  /* ---------------- TIMED INTERVAL SCHEDULER ---------------- */
  useEffect(() => {
    if (!heroImages.length) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const current = heroImages[currentImage];

  return (
    <>
      {/* ================= HERO WRAPPER GRID ================= */}
      <section
        className="
          relative
          mt-[95px]
          grid
          /* Forced side-by-side split layout ratio on ALL screen resolutions */
          grid-cols-[46%_54%] 
          /* Minimized compressed height limits matching architectural guidelines */
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
            /* Low-profile internal vertical and horizontal paddings */
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
                  Gallery & Archive
                </span>
              </div>

              {/* Shrunk Micro Typography Headings */}
              <h1 className="text-lg sm:text-3xl md:text-5xl xl:text-6xl font-black text-white leading-tight">
                Capturing
                <span className="block italic text-[#cca730] my-0">
                  Every
                </span>
                <span className="block">
                  Moment
                </span>
              </h1>

              {/* Restricted Paragraph Block with Clamp Guards */}
              <p className="mt-1.5 sm:mt-4 text-[10px] sm:text-sm md:text-base text-white/75 leading-relaxed max-w-md line-clamp-2 sm:line-clamp-3">
                Step through a visual journey of heritage, academic excellence, student achievements, sporting spirit, and unforgettable memories that define Alok Inter College.
              </p>

              {/* Action Buttons Layout + Infinity Metric Counter */}
              <div className="mt-3 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full">
                <button
                  onClick={() => {
                    const element = document.getElementById("gallery-filter");
                    if (element) {
                      const navbarHeight = 95;
                      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                      window.scrollTo({
                        top: elementPosition - navbarHeight - 20,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="group w-full sm:w-auto text-center whitespace-nowrap bg-[#cca730] text-[#15157d] px-2.5 sm:px-6 py-1.5 sm:py-2.5 text-[9px] sm:text-sm font-bold flex items-center justify-center gap-1 hover:scale-[1.02] transition-all duration-300"
                >
                  View Gallery
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform hidden sm:inline-block" />
                </button>

                {/* Minimalist Visual Counter Link */}
                <div className="flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                  <div className="hidden sm:block w-px h-8 bg-white/20" />
                  <div className="flex items-center sm:block gap-1.5">
                    <Infinity
                      size={18}
                      strokeWidth={2}
                      className="text-[#cca730] sm:scale-125 origin-left"
                    />
                    <p className="uppercase tracking-widest text-[7px] sm:text-[9px] text-white/60 sm:mt-0.5 whitespace-nowrap">
                      Stories
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ================= RIGHT IMAGE COLUMN ================= */}
        <div className="relative overflow-hidden group h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1.03 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { duration: 4.8, ease: "linear" },
              }}
              className="absolute inset-0"
            >
              <SmartImage
                src={current.src}
                alt={current.description}
                wrapperClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Dynamic Shadow Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#15157d]/80 via-black/5 to-transparent" />

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
                Featured Moment ({current.category})
              </span>
              <h3 className="mt-0.5 text-[10px] sm:text-base font-bold text-[#15157d] leading-tight truncate">
                {current.description}
              </h3>
              <p className="mt-0.5 text-slate-600 text-[9px] sm:text-xs leading-normal line-clamp-1 sm:line-clamp-2">
                Explore memorable highlights from the digital archive matrix of Alok Inter College.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= COMPACT FILTER BAR ARCHITECTURE ================= */}
      <section
        id="gallery-filter"
        className="bg-white border-y border-slate-200 py-4 sm:py-6"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Left Filter Actions Group */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === "All"
                    ? "bg-[#15157d] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-[#15157d] hover:text-white"
                }`}
              >
                All Collections
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#15157d] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-[#15157d] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryHero;