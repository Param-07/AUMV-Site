import { motion } from "framer-motion";
import SmartImage from "../SmartImages";

const AcademicGallery = ({
  gallery = [],
  selectedCategory,
  currentSlides,
  setActiveModal,
  setCurrentSlides,
  setZoom,
  setOffset,
}) => {
  const filteredGallery =
    selectedCategory === "All"
      ? gallery
      : gallery.filter(
          (g) => g.category === selectedCategory
        );
  
  const openModal = (groupIndex, imageIndex = 0) => {
    setActiveModal(groupIndex);

    setCurrentSlides((prev) => ({
      ...prev,
      modal: imageIndex,
    }));

    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <section className="py-20 px-8 md:px-20 bg-[#fcf9f8] overflow-hidden">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="w-14 h-[2px] bg-[#cca730] mb-4" />

        <h2 className="text-4xl md:text-5xl font-black text-[#15157d]">
          Academic Collections
        </h2>

        <p className="mt-4 text-slate-600 max-w-2xl">
          A curated showcase of academic excellence,
          classroom experiences, competitions, projects,
          and student achievements.
        </p>
      </motion.div>

      {/* MASONRY STYLE GRID */}

      <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-6">

        {filteredGallery.map((group, idx) => {
          const isLarge = idx % 4 === 0;

          return (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
              }}
              className={`group relative overflow-hidden cursor-pointer ${
                isLarge
                  ? "lg:col-span-8 h-[520px]"
                  : "lg:col-span-4 h-[520px]"
              }`}
              onClick={() => openModal(idx)}
            >
              {/* SLIDESHOW */}

              {group.images.map((img, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentSlides[idx] === i
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <SmartImage
                    src={img.src}
                    alt={img.heading}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* CONTENT */}

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="uppercase tracking-[0.2em] text-[#cca730] text-xs font-semibold">
                  Collection
                </span>

                <h3 className="text-3xl font-black mt-3">
                  {group.category}
                </h3>

                <p className="mt-3 text-gray-300 line-clamp-2">
                  {group.images.length} images available
                  in this collection.
                </p>
              </div>

              {/* IMAGE COUNT */}

              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-2 text-sm font-semibold">
                {group.images.length} Photos
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AcademicGallery;