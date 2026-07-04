import { motion } from "framer-motion";
import { useAppData } from "../../context/AppDataContext";
import SmartImage from "../SmartImages";

const LeadershipSection = () => {
  const { facilities = [] } = useAppData();

  const showcaseImage =
    facilities?.[0]?.facilities?.[0]?.src ||
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800";

  return (
    <section className="bg-slate-100 py-24 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#15157d] leading-tight mb-6">
              Designed for
              <span className="block italic text-red-700">
                Leadership
              </span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Architecture at Alok Inter College is more than
              infrastructure. Every classroom, laboratory,
              library, and sports arena has been designed to
              inspire discipline, creativity, and academic
              excellence.
            </p>

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-white border border-slate-200 p-6 shadow-sm">
                <div className="text-4xl font-black text-[#cca730] mb-2">
                  20+
                </div>

                <div className="text-xs uppercase tracking-[0.25em] text-gray-500">
                  Specialized Labs
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6 shadow-sm">
                <div className="text-4xl font-black text-[#cca730] mb-2">
                  5000+
                </div>

                <div className="text-xs uppercase tracking-[0.25em] text-gray-500">
                  Digital Resources
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative h-[500px] overflow-hidden shadow-2xl"
          >
            <SmartImage
              src={showcaseImage}
              alt="Student Excellence"
              wrapperClassName="w-full h-full"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 border-[12px] border-white/20 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;