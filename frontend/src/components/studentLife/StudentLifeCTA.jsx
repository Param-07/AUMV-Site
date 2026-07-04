import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentLifeCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden bg-[#15157d]"
        >
          {/* Decorative Circles */}

          <div className="absolute top-0 left-0 w-72 h-72 border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

          <div className="absolute bottom-0 right-0 w-96 h-96 border border-white/10 rounded-full translate-x-1/2 translate-y-1/2" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#15157d] via-[#20209a] to-[#15157d]" />

          {/* Content */}

          <div className="relative z-10 px-8 md:px-16 py-20 text-center">

            <span className="uppercase tracking-[0.3em] text-[#cca730] text-sm font-semibold">
              Discover Your Potential
            </span>

            <h2 className="text-4xl md:text-6xl font-black text-white mt-6 leading-tight">
              Experience Student Life
              <span className="block text-[#cca730]">
                Beyond Academics
              </span>
            </h2>

            <p className="max-w-3xl mx-auto mt-8 text-lg text-gray-300 leading-relaxed">
              Join a vibrant community where students grow as
              leaders, innovators, athletes, artists, and
              responsible citizens. Every day brings new
              opportunities to learn, explore, and excel.
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
                Schedule Campus Visit

                <ArrowRight size={18} />
              </button>

            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-white/10">

              <div>
                <div className="text-4xl font-black text-[#cca730]">
                  20+
                </div>

                <p className="text-gray-300 uppercase tracking-wider text-sm mt-2">
                  Clubs & Societies
                </p>
              </div>

              <div>
                <div className="text-4xl font-black text-[#cca730]">
                  100+
                </div>

                <p className="text-gray-300 uppercase tracking-wider text-sm mt-2">
                  Annual Events
                </p>
              </div>

              <div>
                <div className="text-4xl font-black text-[#cca730]">
                  500+
                </div>

                <p className="text-gray-300 uppercase tracking-wider text-sm mt-2">
                  Student Leaders
                </p>
              </div>

              <div>
                <div className="text-4xl font-black text-[#cca730]">
                  100%
                </div>

                <p className="text-gray-300 uppercase tracking-wider text-sm mt-2">
                  Holistic Development
                </p>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default StudentLifeCTA;