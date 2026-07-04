import React from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-[#15157d] py-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#cca730]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-6"
        >
          Begin Your Journey
          <span className="block text-[#cca730]">
            Toward Excellence
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed mb-10"
        >
          Admissions are now open for the upcoming academic session.
          Join a community that inspires learning, leadership,
          innovation, and lifelong success.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-5"
        >
          <a
            href="/#/admission-form"
            className="px-8 py-4 bg-[#cca730] text-black font-bold rounded-xl hover:scale-105 transition-all"
          >
            Apply Online
          </a>

          <a
            href="/#/contact"
            className="px-8 py-4 border border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#15157d] transition-all"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;