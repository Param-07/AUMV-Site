import { motion } from "framer-motion";
import SmartImage from "../SmartImages";

const CinematicGallery = ({
  gallery = [],
  currentSlides = {},
  setActiveModal,
  setCurrentSlides,
  setZoom,
  setOffset,
}) => {
  console.log("Cinematic Gallery:", gallery);
  const featuredGroups = gallery.slice(0, 3);
  console.log("Featured Groups:", featuredGroups);
  if (!featuredGroups.length) return null;

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
      {/* SECTION HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-10"
      >
        <div>
          <div className="w-14 h-[2px] bg-[#cca730] mb-4" />

          <h2 className="text-4xl md:text-5xl font-black text-[#15157d]">
            Featured Stories
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl">
            Capturing memorable moments, achievements,
            celebrations, and experiences from school life.
          </p>
        </div>
      </motion.div>

      {/* BENTO GRID */}

      <div className="grid lg:grid-cols-12 gap-6">

        {/* LARGE FEATURED CARD */}

        {featuredGroups[0] && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 relative h-[600px] overflow-hidden cursor-pointer group"
            onClick={() => openModal(0)}
          >
            {featuredGroups[0].images.map((img, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlides[0] === i
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <span className="uppercase tracking-[0.25em] text-[#cca730] text-xs font-semibold">
                Featured Story
              </span>

              <h3 className="text-4xl font-black mt-3">
                {featuredGroups[0].category}
              </h3>

              <p className="mt-3 text-gray-300 max-w-xl">
                Explore moments and highlights from this
                collection.
              </p>
            </div>
          </motion.div>
        )}

        {/* RIGHT STACKED CARDS */}

        <div className="lg:col-span-4 flex flex-col gap-6">

          {featuredGroups.slice(1, 3).map(
            (group, groupIndex) => {
              const actualIndex = groupIndex + 1;

              return (
                <motion.div
                  key={group.category}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  className="relative flex-1 min-h-[285px] overflow-hidden cursor-pointer group"
                  onClick={() =>
                    openModal(actualIndex)
                  }
                >
                  {group.images.map((img, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        currentSlides[
                          actualIndex
                        ] === i
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <SmartImage
                        src={img.src}
                        alt={img.description}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="uppercase tracking-[0.2em] text-[#cca730] text-xs font-semibold">
                      Collection
                    </span>

                    <h3 className="text-2xl font-bold mt-2">
                      {group.category}
                    </h3>
                  </div>
                </motion.div>
              );
            }
          )}

        </div>

      </div>
    </section>
  );
};

export default CinematicGallery;