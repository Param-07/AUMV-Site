import { motion } from "framer-motion";
import { Users, Award } from "lucide-react";

const StudentLifeHero = () => {
  return (
    <section className="relative h-[520px] md:h-[620px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}

          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-[2px] bg-[#cca730] mb-6" />

              <h1 className="text-5xl md:text-7xl font-black text-[#15157d] leading-tight">
                Beyond the
                <span className="block italic text-red-700">
                  Classroom
                </span>
              </h1>

              <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-xl">
                At Alok Inter College, we cultivate leaders,
                innovators, artists, athletes, and responsible
                citizens. Student life is designed to nurture
                confidence, creativity, leadership, and lifelong
                friendships.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">

                <button className="bg-[#15157d] text-white px-8 py-4 font-semibold hover:shadow-xl transition-all duration-300">
                  Explore Clubs
                </button>

                <button className="border-2 border-red-700 text-red-700 px-8 py-4 font-semibold hover:bg-red-700 hover:text-white transition-all duration-300">
                  Join Leadership
                </button>

              </div>

              {/* QUICK STATS */}

              <div className="grid grid-cols-2 gap-6 mt-14">

                <div className="border border-slate-200 p-6 bg-white shadow-sm">
                  <Users
                    size={36}
                    className="text-[#15157d] mb-3"
                  />

                  <h3 className="text-3xl font-black text-[#15157d]">
                    20+
                  </h3>

                  <p className="text-slate-600 mt-1">
                    Clubs & Societies
                  </p>
                </div>

                <div className="border border-slate-200 p-6 bg-white shadow-sm">
                  <Award
                    size={36}
                    className="text-[#cca730] mb-3"
                  />

                  <h3 className="text-3xl font-black text-[#15157d]">
                    100+
                  </h3>

                  <p className="text-slate-600 mt-1">
                    Annual Events
                  </p>
                </div>

              </div>
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600"
                alt="Student Life"
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-[#15157d]/30 to-transparent" />

            {/* Floating Card */}

            <div className="absolute -bottom-8 -left-8 bg-white shadow-2xl p-6 max-w-xs">
              <span className="uppercase tracking-[0.2em] text-xs text-[#cca730] font-semibold">
                Student Experience
              </span>

              <h4 className="text-2xl font-bold text-[#15157d] mt-2">
                Learning Beyond Books
              </h4>

              <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                Leadership, creativity, collaboration,
                and character development at every stage.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default StudentLifeHero;