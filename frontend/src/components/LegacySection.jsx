import React from "react";
import { motion } from "framer-motion";
import {
  School,
  FlaskConical,
  Library,
  Trophy,
} from "lucide-react";

const LegacySection = () => {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.25em] text-red-700 font-semibold text-sm">
            Our Heritage
          </span>

          <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-[#15157d]">
            A Legacy of Excellence
          </h2>

          <div className="w-20 h-[3px] bg-[#cca730] mx-auto mt-5 rounded-full" />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Academic Distinction */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="md:col-span-7 relative overflow-hidden border border-gray-200 bg-gray-50 p-10 min-h-[380px] flex flex-col justify-end rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <School
              size={150}
              className="absolute top-5 right-5 text-[#15157d]/10"
            />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-[#15157d] mb-4">
                Academic Distinction
              </h3>

              <p className="text-gray-600 leading-relaxed max-w-xl mb-6">
                Our students consistently achieve outstanding
                results in board examinations and competitive
                assessments through dedicated faculty guidance
                and innovative teaching methodologies.
              </p>

              <a href="#/academics" className="group flex items-center gap-2 font-semibold text-[#cca730]">
                Explore Academics

                <span className="transition-transform group-hover:translate-x-2">
                  →
                </span>
              </a>
            </div>
          </motion.div>

          {/* Holistic Growth */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="md:col-span-5 bg-[#15157d] text-white rounded-3xl p-10 border-t-4 border-[#cca730] flex flex-col justify-center shadow-xl"
          >
            <h3 className="text-3xl font-bold mb-5">
              Holistic Growth
            </h3>

            <p className="text-white/80 leading-relaxed mb-10">
              Beyond academics, we encourage leadership,
              sportsmanship, creativity, and social
              responsibility to develop well-rounded
              individuals prepared for future challenges.
            </p>

            <div className="grid grid-cols-2 gap-5">
              <div className="border-l-2 border-[#cca730] pl-4">
                <h4 className="text-3xl font-bold">98%</h4>
                <p className="text-sm text-white/70">
                  Board Results
                </p>
              </div>

              <div className="border-l-2 border-[#cca730] pl-4">
                <h4 className="text-3xl font-bold">50+</h4>
                <p className="text-sm text-white/70">
                  Awards Won
                </p>
              </div>
            </div>
          </motion.div>

          {/* Labs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300"
          >
            <FlaskConical
              size={40}
              className="text-red-700 mb-5"
            />

            <h4 className="text-2xl font-bold text-[#15157d] mb-3">
              Modern Labs
            </h4>

            <p className="text-gray-600 leading-relaxed">
              Advanced Physics, Chemistry, Biology and
              Computer laboratories designed for practical
              learning and innovation.
            </p>
          </motion.div>

          {/* Library */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300"
          >
            <Library
              size={40}
              className="text-red-700 mb-5"
            />

            <h4 className="text-2xl font-bold text-[#15157d] mb-3">
              Rich Library
            </h4>

            <p className="text-gray-600 leading-relaxed">
              Thousands of books, journals, references and
              digital resources supporting academic growth
              and lifelong learning.
            </p>
          </motion.div>

          {/* Sports */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300"
          >
            <Trophy
              size={40}
              className="text-red-700 mb-5"
            />

            <h4 className="text-2xl font-bold text-[#15157d] mb-3">
              Athletic Arena
            </h4>

            <p className="text-gray-600 leading-relaxed">
              Spacious playgrounds and sports facilities
              promoting physical fitness, teamwork and
              competitive excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LegacySection;