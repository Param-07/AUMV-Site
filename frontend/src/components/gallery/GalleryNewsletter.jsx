import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GalleryNewsletter = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden bg-[#15157d]"
      >
        {/* Decorative Elements */}

        <div className="absolute top-0 left-0 w-72 h-72 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

        <div className="absolute bottom-0 right-0 w-96 h-96 border border-white/10 rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#15157d] via-[#1b1b96] to-[#15157d]" />

        {/* Content */}

        <div className="relative z-10 px-8 md:px-16 py-16 md:py-24 text-center">

          <span className="uppercase tracking-[0.3em] text-[#cca730] font-semibold text-sm">
            Join Our Journey
          </span>

          <h2 className="text-4xl md:text-6xl font-black text-white mt-6 leading-tight">
            Experience Life At
            <span className="block text-[#cca730]">
              Alok Inter College
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg text-gray-300 leading-relaxed">
            Every image tells a story of growth, achievement,
            friendship, leadership, and excellence. Become part
            of a learning environment that inspires future leaders.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">

            <button
              onClick={() => navigate("/admission")}
              className="bg-[#cca730] text-black px-8 py-4 font-bold hover:scale-105 transition-all duration-300"
            >
              Apply For Admission
            </button>

            <button
              onClick={() => navigate("/campus-visit")}
              className="border border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-[#15157d] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Schedule A Visit

              <ArrowRight size={18} />
            </button>

          </div>

          {/* Stats */}

          <div className="grid md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">

            <div>
              <div className="text-4xl font-black text-[#cca730]">
                5000+
              </div>

              <p className="text-gray-300 uppercase tracking-wider text-sm mt-2">
                Students Educated
              </p>
            </div>

            <div>
              <div className="text-4xl font-black text-[#cca730]">
                25+
              </div>

              <p className="text-gray-300 uppercase tracking-wider text-sm mt-2">
                Years Of Excellence
              </p>
            </div>

            <div>
              <div className="text-4xl font-black text-[#cca730]">
                100%
              </div>

              <p className="text-gray-300 uppercase tracking-wider text-sm mt-2">
                Commitment To Growth
              </p>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default GalleryNewsletter;