import { motion } from "framer-motion";

const AcademicsHero = () => {
  return (
    <section
      className="relative min-h-[650px] overflow-hidden"
      style={{ marginTop: "95px" }}
    >
      {/* Background */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800')",
        }}
      />

      {/* Overlays */}

      <div className="absolute inset-0 bg-[#15157d]/80" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#15157d]/95 via-[#15157d]/80 to-transparent" />

      {/* Content */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 min-h-[650px] flex items-center">
        <div className="max-w-3xl">

          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 border border-[#cca730] text-[#ffe088] uppercase tracking-[0.25em] text-sm font-semibold mb-8"
          >
            Academic Excellence
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            Curriculum &
            <span className="block text-[#cca730]">
              Pedagogy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-8 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
          >
            At Alok Inter College, learning extends beyond textbooks.
            Our curriculum integrates academic rigor, innovation,
            critical thinking, and values-driven education to prepare
            students for a rapidly evolving world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <button className="bg-[#cca730] text-black px-8 py-4 font-semibold hover:scale-105 transition-all duration-300">
              Explore Curriculum
            </button>

            <button className="border border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-[#15157d] transition-all duration-300">
              Academic Results
            </button>
          </motion.div>

        </div>
      </div>

      {/* Floating Statistics */}

    </section>
  );
};

export default AcademicsHero;