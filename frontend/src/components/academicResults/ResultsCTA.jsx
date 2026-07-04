import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResultsCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden bg-[#15157d]"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 border border-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 border border-white rounded-full translate-x-1/2 translate-y-1/2" />
          </div>

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-24 text-center">

            <span className="uppercase tracking-[0.25em] text-[#cca730] font-semibold text-sm">
              Join Excellence
            </span>

            <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6">
              Become Part of
              <span className="block text-[#cca730]">
                Our Success Story
              </span>
            </h2>

            <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed mb-10">
              Academic excellence, holistic development, and
              future-ready education await you at Alok Inter College.
              Start your journey with one of the region's most
              accomplished institutions.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5">

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
                Schedule Campus Visit
                <ArrowRight size={18} />
              </button>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ResultsCTA;