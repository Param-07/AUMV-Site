import { motion } from "framer-motion";
import SmartImage from "../SmartImages";

const CulturalGallery = ({
  gallery = [],
  currentSlides,
  setActiveModal,
  setCurrentSlides,
  setZoom,
  setOffset,
}) => {
  const culturalCollections = gallery.filter((item) =>
    [
      "Annual Function",
      "Cultural Event",
      "Celebration",
      "Festival",
      "Independence Day",
      "Republic Day",
      "Dance",
      "Music",
      "Art",
    ].some((keyword) =>
      item.category?.toLowerCase().includes(
        keyword.toLowerCase()
      )
    )
  );

  if (!culturalCollections.length) return null;

  const openModal = (groupIndex, imageIndex = 0) => {
    setActiveModal(groupIndex);

    setCurrentSlides((prev) => ({
      ...prev,
      modal: imageIndex,
    }));

    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const featured = culturalCollections[0];
  const sideCards = culturalCollections.slice(1, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="w-14 h-[2px] bg-[#cca730] mb-4" />

        <h2 className="text-4xl md:text-5xl font-black text-[#15157d]">
          Cultural Showcase
        </h2>

        <p className="mt-4 text-slate-600 max-w-2xl">
          Celebrating traditions, creativity, performances,
          festivals, and unforgettable moments that enrich
          student life beyond academics.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-6">

        {/* FEATURED */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 relative h-[650px] overflow-hidden cursor-pointer group"
          onClick={() => openModal(0)}
        >
          {featured.images?.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                (currentSlides[featured.category] || 0) === i
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className="uppercase tracking-[0.25em] text-[#cca730] text-xs font-semibold">
              Featured Collection
            </span>

            <h3 className="text-4xl font-black mt-3">
              {featured.category}
            </h3>

            <p className="mt-4 text-gray-300">
              Experience the vibrant cultural spirit of
              Alok Inter College.
            </p>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}

        <div className="lg:col-span-5 flex flex-col gap-6">

          {sideCards.map((item, idx) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative h-[312px] overflow-hidden cursor-pointer group"
              onClick={() => openModal(idx + 1)}
            >
              {item.images?.map((img, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    currentSlides[item.category] === i
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

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="uppercase tracking-[0.2em] text-[#cca730] text-xs font-semibold">
                  Event Gallery
                </span>

                <h3 className="text-2xl font-bold mt-2">
                  {item.category}
                </h3>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default CulturalGallery;