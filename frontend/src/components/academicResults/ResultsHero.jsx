import { motion } from "framer-motion";

const ResultsHero = ({ classId }) => {
  const isClass10 = classId === "10";

  return (
    <section
      className="relative min-h-[650px] overflow-hidden"
      style={{ marginTop: "95px" }}
    >
      {/* Background Image */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800')",
        }}
      />

      {/* Overlays */}

      <div className="absolute inset-0 bg-[#15157d]/85" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#15157d]/95 via-[#15157d]/80 to-transparent" />

      {/* Hero Content */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 min-h-[650px] flex items-center">
        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 border border-[#cca730] text-[#ffe088] uppercase tracking-[0.25em] text-sm font-semibold mb-8"
          >
            Board Examination Results
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            {isClass10
              ? "Class X Results"
              : "Class XII Results"}

            <span className="block text-[#cca730]">
              Academic Excellence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-8 text-lg md:text-xl text-gray-200 max-w-3xl leading-relaxed"
          >
            {isClass10
              ? "Celebrating exceptional performance, dedication, and achievement in the High School Board Examination."
              : "Recognizing outstanding academic accomplishments across Science and Humanities streams in the Intermediate Examination."}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ResultsHero;