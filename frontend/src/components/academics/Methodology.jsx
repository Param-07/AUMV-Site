import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";

const methodologyItems = [
  {
    icon: Lightbulb,
    title: "Inquiry-Based Learning",
    description:
      "Students are encouraged to question, explore, and discover concepts independently through guided learning experiences.",
  },
  {
    icon: Users,
    title: "Collaborative Development",
    description:
      "Teamwork, communication, and peer learning foster confidence and essential life skills.",
  },
  {
    icon: Target,
    title: "Outcome-Oriented Education",
    description:
      "Every learning experience is aligned with measurable academic and personal growth outcomes.",
  },
];

const Methodology = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="uppercase tracking-[0.25em] text-[#cca730] font-semibold text-sm">
            Teaching Excellence
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#15157d] mt-4 mb-5">
            Our Learning Methodology
          </h2>

          <div className="w-24 h-1 bg-[#cca730] mx-auto mb-6" />

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            Our educational philosophy combines academic rigor,
            experiential learning, and character development to
            nurture confident, capable, and compassionate leaders.
          </p>
        </motion.div>

        {/* METHODOLOGY CARDS */}

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {methodologyItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="group border border-slate-200 p-8 hover:border-[#15157d] hover:shadow-xl transition-all duration-500"
              >
                <div className="w-16 h-16 bg-[#15157d] text-white flex items-center justify-center mb-6 group-hover:bg-[#cca730] group-hover:text-black transition-all duration-500">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-bold text-[#15157d] mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* FEATURE QUOTE */}

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-slate-50 border border-slate-200 p-12 text-center mb-20"
        >
          <p className="text-2xl md:text-3xl font-light italic text-[#15157d] max-w-4xl mx-auto leading-relaxed">
            "Education is not merely the acquisition of knowledge,
            but the cultivation of wisdom, character, and purpose."
          </p>

          <div className="w-16 h-1 bg-[#cca730] mx-auto my-6" />

          <p className="uppercase tracking-[0.25em] text-sm text-gray-500">
            Alok Inter College Philosophy
          </p>
        </motion.div>

        {/* CTA SECTION */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#15157d] text-white p-12 md:p-16 text-center"
        >
          <span className="uppercase tracking-[0.25em] text-[#cca730] text-sm font-semibold">
            Begin Your Journey
          </span>

          <h3 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Discover Academic Excellence
          </h3>

          <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed mb-10">
            Explore our academic programs, meet our educators,
            and experience a learning environment designed for
            success in the modern world.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button className="bg-[#cca730] text-black px-8 py-4 font-semibold hover:scale-105 transition-all duration-300">
              Apply For Admission
            </button>

            <button className="border border-white px-8 py-4 font-semibold hover:bg-white hover:text-[#15157d] transition-all duration-300 flex items-center justify-center gap-2">
              Explore Programs
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Methodology;