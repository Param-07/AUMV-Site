import { motion } from "framer-motion";
import admissionOpen from "../../assets/images/AdmissionOpen.jpeg"
import SmartImage from "../SmartImages";

const AdmissionsHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#fcf9f8]">
      <div className="max-w-7xl mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="uppercase tracking-[0.25em] text-[#cca730] font-semibold text-sm block mb-5"
          >
            Heritage Edition
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-black text-[#15157d] leading-tight mb-8"
          >
            Admissions
            <span className="block text-[#cca730]">
              Outlook
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg text-gray-600 leading-relaxed max-w-xl mb-10"
          >
            Joining Alok Inter College is an invitation to a legacy
            of academic excellence, character building, innovation,
            and leadership development.
          </motion.p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#admission-form"
              className="px-8 py-4 bg-[#15157d] text-white rounded-xl font-semibold hover:scale-105 transition-all"
            >
              Apply for Admission
            </a>

            <a
              href="#contact"
              className="px-8 py-4 border-2 border-red-700 text-red-700 rounded-xl font-semibold hover:bg-red-700 hover:text-white transition-all"
            >
              Inquiry
            </a>
          </div>
        </div>

        <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
        >
            <div className="aspect-[4/5] max-w-[360px] mx-auto overflow-hidden rounded-lg border-8 border-white shadow-xl relative z-10">
                <SmartImage
                src={admissionOpen}
                alt="Admission"
                className="w-full h-full object-cover"
                />
            </div>

            {/* Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#ffe088]/20 rounded-full blur-3xl -z-10" />

            <div className="absolute -top-10 -left-10 w-48 h-48 bg-red-500/10 rounded-full blur-2xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionsHero;