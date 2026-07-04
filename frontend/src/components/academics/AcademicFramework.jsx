import { motion } from "framer-motion";
import SmartImage from "../SmartImages";

const frameworkItems = [
  {
    title: "Curriculum Excellence",
    subtitle: "Structured For Success",
    description:
      "Our curriculum is carefully aligned with national educational standards while incorporating modern teaching methodologies that foster intellectual curiosity and academic achievement.",

    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600",

    reverse: false,
  },

  {
    title: "Technology Integration",
    subtitle: "Learning Beyond Boundaries",
    description:
      "Smart classrooms, digital resources, and technology-enabled teaching create engaging learning experiences that prepare students for the future.",

    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600",

    reverse: true,
  },

  {
    title: "Experiential Learning",
    subtitle: "Knowledge Through Practice",
    description:
      "Project-based learning, laboratory work, field experiences, and collaborative activities help students connect theory with real-world application.",

    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600",

    reverse: false,
  },
];

const AcademicFramework = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* SECTION HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="uppercase tracking-[0.25em] text-[#cca730] font-semibold text-sm">
            Educational Philosophy
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-[#15157d] mt-4 mb-5">
            Academic Framework
          </h2>

          <div className="w-24 h-1 bg-[#cca730] mx-auto mb-6" />

          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            Our academic framework combines tradition, innovation,
            and practical learning experiences to ensure holistic
            student development.
          </p>
        </motion.div>

        {/* CONTENT BLOCKS */}

        <div className="space-y-24">
          {frameworkItems.map((item, index) => (
            <div
              key={item.title}
              className={`grid lg:grid-cols-2 gap-16 items-center ${
                item.reverse ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* IMAGE */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: item.reverse ? 50 : -50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="overflow-hidden shadow-2xl"
              >
                <SmartImage
                  src={item.image}
                  alt={item.title}
                  wrapperClassName="w-full h-full"
                  className="w-full h-[420px] object-cover"
                />
              </motion.div>

              {/* CONTENT */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: item.reverse ? -50 : 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <span className="uppercase tracking-[0.25em] text-[#cca730] font-semibold text-sm">
                  {item.subtitle}
                </span>

                <h3 className="text-4xl font-bold text-[#15157d] mt-4 mb-6">
                  {item.title}
                </h3>

                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {item.description}
                </p>

                <div className="grid grid-cols-2 gap-6">

                  <div className="border-l-4 border-[#cca730] pl-4">
                    <div className="text-3xl font-black text-[#15157d]">
                      100%
                    </div>

                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      Student Engagement
                    </div>
                  </div>

                  <div className="border-l-4 border-[#cca730] pl-4">
                    <div className="text-3xl font-black text-[#15157d]">
                      21st
                    </div>

                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      Century Skills
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AcademicFramework;