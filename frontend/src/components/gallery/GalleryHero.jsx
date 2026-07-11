import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Infinity,
} from "lucide-react";
import { useAppData } from "../../context/AppDataContext";
import SmartImage from "../SmartImages";

const GalleryHero = ({
  mediaType,
  setMediaType,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  const { gallery } = useAppData();

  /* ---------------- HERO IMAGES ---------------- */

  const heroImages = useMemo(() => {
    return gallery.flatMap((item) =>
      item.images.map((image) => ({
        ...image,
        category: item.category,
      }))
    );
  }, [gallery]);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!heroImages.length) return;

    const interval = setInterval(() => {
      setCurrentImage(
        (prev) => (prev + 1) % heroImages.length
      );
    }, 4500);

    return () => clearInterval(interval);
  }, [heroImages]);

  if (!heroImages.length) return null;

  const current = heroImages[currentImage];

  return (
    <>
      {/* ================= HERO ================= */}

      <section
        className="
          relative
          mt-[95px]
          grid
          grid-cols-1
          lg:grid-cols-[45%_55%]
          min-h-screen
          lg:min-h-[760px]
        "
      >
        {/* ================= LEFT ================= */}

        <div className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#15157d]
          via-[#12156d]
          to-[#0d104f]
          flex
          items-center
          py-16
          lg:py-0
          ">

          {/* Decorative Blur */}

          <div className="absolute -left-28 -bottom-24 w-96 h-96 rounded-full bg-[#cca730]/10 blur-3xl" />

          <div className="relative z-10 max-w-xl px-8 lg:px-16">

            {/* Heading */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-4 mb-8">

                <span className="w-12 h-[1px] bg-[#cca730]/50" />

                <span className="uppercase tracking-[0.35em] text-xs text-[#cca730] font-semibold">
                  Gallery & Archive
                </span>

              </div>

              <h1 className="text-6xl xl:text-7xl font-black text-white leading-tight">

                Capturing

                <span className="block italic text-[#cca730]">
                  Every
                </span>

                <span className="block">
                  Moment
                </span>

              </h1>

              <p className="mt-8 text-lg text-white/75 leading-relaxed max-w-md">
                Step through a visual journey of heritage,
                academic excellence, student achievements,
                sporting spirit, and unforgettable memories
                that define Alok Inter College.
              </p>              
              {/* ================= CTA ================= */}

              <div className="mt-12 flex flex-wrap items-center gap-6">

                <button
                  onClick={() => {
                    const element = document.getElementById("gallery-filter");

                    if (element) {
                      const navbarHeight = 95; // Your navbar height

                      const elementPosition =
                        element.getBoundingClientRect().top + window.pageYOffset;

                      window.scrollTo({
                        top: elementPosition - navbarHeight - 20, // 20px extra spacing
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="group bg-[#cca730] text-[#15157d] px-8 py-4 font-bold flex items-center gap-3 hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
                >
                  View Gallery

                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                {/* Infinity Card */}

                <div className="flex items-center gap-5">

                  <div className="w-px h-12 bg-white/20" />

                  <div>

                    <Infinity
                      size={42}
                      strokeWidth={2}
                      className="text-[#cca730]"
                    />

                    <p className="uppercase tracking-[0.35em] text-[11px] text-white/60 mt-2">
                      Stories
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div
  className="
    relative
    overflow-hidden
    group
    h-[420px]
    md:h-[550px]
    lg:h-auto
  "
>

          <AnimatePresence mode="wait">

            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: 1.08,
              }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: {
                  duration: 0.8,
                },
                scale: {
                  duration: 4.8,
                  ease: "linear",
                },
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

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-[#15157d]/80 via-black/15 to-transparent" />

          {/* Floating Card */}

          <motion.div
            key={`card-${currentImage}`}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="absolute bottom-10 right-10 bg-white/95 backdrop-blur-md p-6 max-w-sm shadow-2xl border-l-4 border-[#cca730]"
          >

            <span className="uppercase tracking-[0.2em] text-[11px] text-slate-500 font-semibold">
              Featured Moment
            </span>

            <h3 className="mt-2 text-2xl font-bold text-[#15157d] leading-tight">
              {current.description}
            </h3>

            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
              Explore memorable moments from the vibrant
              journey of Alok Inter College.
            </p>

          </motion.div>

        </div>

      </section>

      {/* ================= FILTER BAR ================= */}

      <section
        id="gallery-filter"
        className="bg-white border-y border-slate-200 py-8"
      >
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">            {/* ================= LEFT ================= */}

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-5 py-2.5 font-semibold transition-all duration-300 ${
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
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`px-5 py-2.5 font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-[#15157d] text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-[#15157d] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}

            </div>

            {/* ================= RIGHT ================= */}

            {/* <div className="flex items-center gap-3 bg-slate-100 rounded-full p-1">

              <button
                onClick={() => setMediaType("all")}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                  mediaType === "all"
                    ? "bg-[#15157d] text-white shadow-lg"
                    : "text-slate-600 hover:text-[#15157d]"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setMediaType("photos")}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                  mediaType === "photos"
                    ? "bg-[#15157d] text-white shadow-lg"
                    : "text-slate-600 hover:text-[#15157d]"
                }`}
              >
                Photos
              </button>

              <button
                onClick={() => setMediaType("videos")}
                className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${
                  mediaType === "videos"
                    ? "bg-[#15157d] text-white shadow-lg"
                    : "text-slate-600 hover:text-[#15157d]"
                }`}
              >
                Videos
              </button>

            </div> */}

          </div>

        </div>

      </section>

    </>
  );
};

export default GalleryHero;