import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartImage from "../SmartImages";

const CulturalGallery = ({
  gallery = [],
  currentSlides,
  setActiveModal,
  setCurrentSlides,
  setZoom,
  setOffset,
}) => {
  const [currentImage, setCurrentImage] = useState(0);

  /* ---------------- FILTER CULTURAL COLLECTIONS ---------------- */
  const culturalCollections = useMemo(() => {
    const TARGET_KEYWORDS = [
      "Annual Function",
      "Cultural",
      "Celebration",
      "Festival",
      "Independence Day",
      "Republic Day",
      "Dance",
      "Music",
      "Art",
    ];

    return gallery.filter((item) =>
      TARGET_KEYWORDS.some((keyword) =>
        item.category?.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  }, [gallery]);

  const featured = culturalCollections[0];
  const images = featured?.images || [];
  const totalImages = images.length;

  /* ---------------- SLIDESHOW TIMER ---------------- */
  useEffect(() => {
    if (!totalImages) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % totalImages);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalImages]);

  if (!totalImages) return null;

  /* ---------------- DERIVED SLIDES ---------------- */
  const currentIndex = currentImage;
  const nextIndex = (currentImage + 1) % totalImages;
  const thirdIndex = (currentImage + 2) % totalImages;

  const current = images[currentIndex] || images[0];
  const next = images[nextIndex] || images[0];
  const third = images[thirdIndex] || images[0];

  /* ---------------- OPEN MODAL ---------------- */
  const openModal = (imageIndex) => {
    setActiveModal(0);
    setCurrentSlides((prev) => ({
      ...prev,
      modal: imageIndex,
    }));
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <section className="bg-[#12157a] text-white py-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="block text-sm font-bold tracking-[0.2em] uppercase text-white/80">
                Cultural Legacy
              </span>

              <h2
                className="text-5xl md:text-6xl font-serif leading-tight"
                style={{ fontFamily: "Libre Caslon Text, serif" }}
              >
                Expression of
                <br />
                Heritage
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-white/90 max-w-md">
              Celebrating the diverse talents and traditions that define our
              community through performance and art.
            </p>

            <button
              onClick={() => openModal(currentIndex)}
              className="inline-block px-8 py-4 border-2 border-white font-bold uppercase tracking-wider hover:bg-white hover:text-[#12157a] transition-all duration-300"
            >
              Explore Performances
            </button>
          </motion.div>

          {/* ================= IMAGE COMPOSITION ================= */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-end gap-5"
          >
            {/* ================= MAIN IMAGE ================= */}
            <AnimatePresence mode="wait">
              <motion.button
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                onClick={() => openModal(currentIndex)}
                className="relative w-full h-[420px] shadow-2xl cursor-pointer group overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-[#cca730]"
              >
                <SmartImage
                  src={current.src}
                  alt={current.description || "Featured cultural event"}
                  wrapperClassName="w-full h-full"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Description */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-[#cca730] text-xs uppercase tracking-[0.2em] font-semibold">
                    {featured.category}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {current.description}
                  </h3>
                </div>
              </motion.button>
            </AnimatePresence>

            {/* ================= BOTTOM IMAGES ================= */}
            <div className="grid grid-cols-2 gap-5 w-[82%]">
              <AnimatePresence mode="wait">
                <motion.button
                  key={`next-${nextIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  onClick={() => openModal(nextIndex)}
                  className="h-[170px] shadow-xl cursor-pointer group overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#cca730]"
                >
                  <SmartImage
                    src={next.src}
                    alt={next.description || "Next cultural event thumbnail"}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.button>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.button
                  key={`third-${thirdIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  onClick={() => openModal(thirdIndex)}
                  className="h-[170px] shadow-xl cursor-pointer group overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#cca730]"
                >
                  <SmartImage
                    src={third.src}
                    alt={third.description || "Third cultural event thumbnail"}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-500"
                  />
                </motion.button>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CulturalGallery;