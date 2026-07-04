import { motion } from "framer-motion";
import {
  Microscope,
  Palette,
  Megaphone,
  Trophy,
} from "lucide-react";

const ClubsSocieties = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* SECTION HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-[#15157d] mb-5">
            Clubs & Societies
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 text-lg">
            Discover your passions, develop new skills,
            and become part of vibrant student communities.
          </p>
        </motion.div>

        {/* BENTO GRID */}

        <div className="grid md:grid-cols-12 gap-6">

          {/* SCIENCE */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bg-white border border-slate-200 p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-500"
          >
            <span className="inline-block bg-indigo-100 text-[#15157d] px-4 py-1 text-xs font-bold tracking-wider uppercase mb-6">
              Academic Excellence
            </span>

            <Microscope
              size={180}
              className="absolute -right-10 -bottom-10 text-slate-100 group-hover:text-slate-200 transition-all duration-500"
            />

            <div className="relative z-10">
              <h3 className="text-4xl font-black text-[#15157d]">
                Science & Innovation Lab
              </h3>

              <p className="text-slate-600 mt-5 max-w-xl leading-relaxed">
                From robotics and coding to chemistry
                symposiums and research projects, our
                science clubs encourage curiosity,
                experimentation, and innovation.
              </p>

            </div>
          </motion.div>

          {/* HERITAGE */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-red-700 text-white p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-500"
          >
            <div>
              <Palette size={42} />

              <h3 className="text-3xl font-bold mt-6">
                Heritage & Arts
              </h3>

              <p className="mt-4 text-white/90 leading-relaxed">
                Celebrating Indian culture through
                dance, music, drama, fine arts,
                and heritage preservation.
              </p>
            </div>

          </motion.div>

          {/* DEBATE */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-4 bg-[#15157d] text-white p-8 hover:shadow-xl transition-all duration-500"
          >
            <Megaphone size={42} />

            <h3 className="text-3xl font-bold mt-6">
              Vaktavya Debate Club
            </h3>

            <p className="mt-4 text-white/90 leading-relaxed">
              Master public speaking, critical
              thinking, and leadership through
              competitive debates and discussions.
            </p>
          </motion.div>

          {/* SPORTS */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-8 bg-white border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500"
          >
            <div className="grid md:grid-cols-[1fr_250px] h-full">

              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy
                    size={34}
                    className="text-[#cca730]"
                  />

                  <h3 className="text-4xl font-black text-[#15157d]">
                    Athletic Foundation
                  </h3>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  Our sports programs build discipline,
                  teamwork, resilience, and physical
                  excellence through professional
                  coaching and modern facilities.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">
                  {[
                    "Cricket",
                    "Football",
                    "Yoga",
                    "Athletics",
                  ].map((sport) => (
                    <span
                      key={sport}
                      className="bg-slate-100 px-4 py-2 text-sm font-semibold"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden md:block">
                <img
                  src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200"
                  alt="Sports"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ClubsSocieties;