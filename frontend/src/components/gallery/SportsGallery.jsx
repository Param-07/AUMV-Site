import { motion } from "framer-motion";
import SmartImage from "../SmartImages";

const SportsGallery = ({
  gallery = [],
  currentSlides,
  setActiveModal,
  setCurrentSlides,
  setZoom,
  setOffset,
}) => {
  const sportsCollections = gallery.filter((item) =>
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
  );

  if (!sportsCollections.length) return null;

  const featured = sportsCollections[0];
  const otherCollections = sportsCollections;

  const openModal = (index) => {
    setActiveModal(index);

    setCurrentSlides((prev) => ({
      ...prev,
      modal: 0,
    }));

    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">

      {/* SECTION HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <div className="w-14 h-[2px] bg-[#cca730] mb-4" />

        <h2 className="text-4xl md:text-5xl font-black text-[#15157d]">
          Sporting Excellence
        </h2>

        <p className="mt-4 text-slate-600 max-w-2xl">
          Celebrating athletic achievements, teamwork,
          determination, and competitive spirit across
          various sports disciplines.
        </p>
      </motion.div>

      {/* FEATURED SPORTS STORY */}

      {/* <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative h-[650px] overflow-hidden cursor-pointer group mb-8"
        onClick={() => openModal(0)}
      >
        {featured.images?.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlides[featured.category] === i
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

        <div className="absolute inset-0 bg-gradient-to-r from-[#15157d]/90 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-2xl px-12 text-white">

            <span className="uppercase tracking-[0.25em] text-[#cca730] text-xs font-semibold">
              Featured Achievement
            </span>

            <h3 className="text-5xl md:text-6xl font-black mt-4 leading-tight">
              {featured.category}
            </h3>

            <p className="mt-6 text-lg text-gray-200 leading-relaxed">
              Excellence in sports through discipline,
              dedication, teamwork, and perseverance.
            </p>

          </div>
        </div>
      </motion.div> */}

      {/* SPORTS CARDS */}

      <div className="grid md:grid-cols-3 gap-6">

        {otherCollections.map((item, index) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white shadow-lg overflow-hidden cursor-pointer"
            onClick={() => openModal(index + 1)}
          >
            <div className="h-[260px] overflow-hidden relative">

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
                    alt={img.description}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}

            </div>

            <div className="p-6">

              <span className="uppercase tracking-[0.2em] text-[#cca730] text-xs font-semibold">
                Sports Collection
              </span>

              <h3 className="text-2xl font-bold text-[#15157d] mt-3">
                {item.category}
              </h3>

              <p className="mt-3 text-gray-600">
                {item.images?.length || 0} moments captured
                from competitions and achievements.
              </p>

            </div>
          </motion.div>
        ))}

      </div>

    </section>
  );
};

export default SportsGallery;