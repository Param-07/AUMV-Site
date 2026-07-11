import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "../SmartImages";

const SportsGallery = ({
  gallery = [],
  setActiveModal,
  setCurrentSlides,
  setZoom,
  setOffset,
}) => {

  /* ---------------- ALL SPORTS IMAGES ---------------- */

  const sportsImages = useMemo(() => {
    return gallery
      .filter((item) =>
        [
          "sports",
          "sport",
          "cricket",
          "football",
          "basketball",
          "volleyball",
          "athletics",
          "kabaddi",
          "tournament",
          "competition",
          "games",
        ].some((keyword) =>
          item.category?.toLowerCase().includes(keyword)
        )
      )
      .flatMap((item, groupIndex) =>
        item.images.map((image, imageIndex) => ({
          src: image.src,
          description: image.description,
          groupIndex,
          imageIndex,
        }))
      );
  }, [gallery]);

  const [startIndex, setStartIndex] = useState(0);

  if (!sportsImages.length) return null;

  const visibleImages = Array.from(
    { length: Math.min(3, sportsImages.length) },
    (_, i) =>
      sportsImages[
        (startIndex + i) % sportsImages.length
      ]
  );

  const next = () =>
    setStartIndex(
      (prev) => (prev + 1) % sportsImages.length
    );

  const previous = () =>
    setStartIndex(
      (prev) =>
        (prev - 1 + sportsImages.length) %
        sportsImages.length
    );

  const openModal = (item) => {
    setActiveModal(item.groupIndex);

    setCurrentSlides((prev) => ({
      ...prev,
      modal: item.imageIndex,
    }));

    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };  return (
    <section className="py-20 px-8 md:px-20 bg-[#fcf9f8] overflow-hidden">
      <div className="max-w-[1250px] mx-auto">

        {/* ================= HEADER ================= */}
        <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="w-14 h-[2px] bg-[#cca730] mb-4" />

        <h2 className="text-4xl md:text-5xl font-black text-[#15157d]">
          Athletic Spirit
        </h2>

        <p className="mt-4 text-slate-600 max-w-2xl">
          Building character and resilience on the field.
        </p>
      </motion.div>
        {/* <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
        >
          <div>
            <h2
              className="text-4xl font-serif text-[#12157a]"
              style={{ fontFamily: "Libre Caslon Text, serif" }}
            >
              Athletic Spirit
            </h2>

            <p className="text-slate-600 mt-2">
              Building character and resilience on the field.
            </p>
          </div>

          <button className="font-bold text-[10px] uppercase tracking-[0.2em] text-[#12157a] hover:opacity-70 transition">
            Sports Gallery →
          </button>
        </motion.div> */}

        {/* ================= CAROUSEL ================= */}

        <div className="relative">

          {/* LEFT BUTTON */}

          <button
            onClick={previous}
            className="absolute left-[-28px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-[#12157a] hover:text-white transition-all duration-300"
          >
            <ChevronLeft size={22} />
          </button>

          {/* RIGHT BUTTON */}

          <button
            onClick={next}
            className="absolute right-[-28px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:bg-[#12157a] hover:text-white transition-all duration-300"
          >
            <ChevronRight size={22} />
          </button>

          {/* IMAGES */}

          <AnimatePresence mode="wait">

            <motion.div
              key={startIndex}
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -150, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >

              {visibleImages.map((item, index) => (

                <motion.div
                  key={`${item.src}-${index}`}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => openModal(item)}
                  className="relative group overflow-hidden cursor-pointer bg-white shadow-lg"
                >

                  <div className="relative h-[340px] overflow-hidden">

                    <SmartImage
                      src={item.src}
                      alt={item.description}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                    {/* DESCRIPTION */}

                    <div className="absolute bottom-0 left-0 right-0 p-6">

                      <p className="text-white text-lg font-semibold leading-snug">
                        {item.description}
                      </p>

                    </div>

                  </div>

                </motion.div>

              ))}

            </motion.div>

          </AnimatePresence>

        </div>
      </div>    </section>
  );
};

export default SportsGallery;