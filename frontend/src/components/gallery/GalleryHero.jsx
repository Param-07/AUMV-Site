import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const GalleryHero = ({
  mediaType,
  setMediaType,
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <section className="relative h-[520px] md:h-[620px] overflow-hidden" style={{ marginTop: "95px" }}>
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8 mb-12">
        <div className="max-w-3xl">
          <div className="w-16 h-[2px] bg-[#cca730] mb-5" />

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-[#15157d] leading-tight"
          >
            Heritage &
            <span className="block text-[#cca730]">
              Excellence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mt-6 text-lg text-slate-600 max-w-2xl leading-relaxed"
          >
            Explore the vibrant life, academic excellence,
            sporting achievements, cultural heritage, and
            memorable moments that define Alok Inter College.
          </motion.p>
        </div>

        {/* MEDIA SWITCHER */}

        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="border-b border-slate-300 flex gap-8"
        >
          <button
            onClick={() => setMediaType("all")}
            className={`pb-3 font-semibold transition-all ${
              mediaType === "all"
                ? "text-[#15157d] border-b-2 border-[#15157d]"
                : "text-slate-500"
            }`}
          >
            All Media
          </button>

          <button
            onClick={() => setMediaType("photos")}
            className={`pb-3 font-semibold transition-all ${
              mediaType === "photos"
                ? "text-[#15157d] border-b-2 border-[#15157d]"
                : "text-slate-500"
            }`}
          >
            Photos
          </button>

          <button
            onClick={() => setMediaType("videos")}
            className={`pb-3 font-semibold transition-all ${
              mediaType === "videos"
                ? "text-[#15157d] border-b-2 border-[#15157d]"
                : "text-slate-500"
            }`}
          >
            Videos
          </button>
        </motion.div>
      </div>

      {/* CATEGORY FILTERS */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-5 py-2 text-sm font-semibold transition-all ${
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
            className={`px-5 py-2 text-sm font-semibold transition-all ${
              selectedCategory === category
                ? "bg-[#15157d] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-[#15157d] hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}

        <div className="ml-auto hidden lg:flex items-center gap-2 text-[#cca730]">
          <Sparkles size={18} />
          <span className="text-sm font-semibold uppercase tracking-widest">
            Heritage Edition
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default GalleryHero;