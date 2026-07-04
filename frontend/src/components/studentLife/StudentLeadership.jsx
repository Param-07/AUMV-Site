import { motion } from "framer-motion";

const leaders = [
  {
    name: "Aryan Singh",
    role: "Head Prefect",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200",
  },
  {
    name: "Priya Sharma",
    role: "Cultural Captain",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200",
  },
  {
    name: "Rohan Verma",
    role: "Sports Captain",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200",
  },
];

const StudentLeadership = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-16 h-[2px] bg-[#cca730] mx-auto mb-5" />

          <h2 className="text-4xl md:text-5xl font-black text-[#15157d]">
            Student Leadership
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-slate-600 text-lg">
            Empowering students to lead with integrity,
            confidence, responsibility, and vision.
          </p>
        </motion.div>

        {/* LEADERS GRID */}

        <div className="grid md:grid-cols-3 gap-10">

          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
              }}
              className="group"
            >
              {/* IMAGE */}

              <div className="relative overflow-hidden shadow-xl">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                {/* FLOATING INFO */}

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <span className="uppercase tracking-[0.2em] text-[#cca730] text-xs font-semibold">
                    Student Council
                  </span>

                  <h3 className="text-3xl font-black mt-3">
                    {leader.name}
                  </h3>

                  <p className="mt-2 text-gray-300">
                    {leader.role}
                  </p>
                </div>
              </div>

              {/* DESCRIPTION CARD */}

              <div className="bg-white shadow-lg p-6 -mt-8 mx-6 relative z-10 border-t-4 border-[#cca730]">
                <p className="text-slate-600 leading-relaxed">
                  Representing the student body and
                  fostering a culture of leadership,
                  collaboration, and service.
                </p>
              </div>
            </motion.div>
          ))}

        </div>

        {/* QUOTE SECTION */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-[#15157d] text-white p-12 md:p-16 text-center"
        >
          <span className="uppercase tracking-[0.25em] text-[#cca730] text-sm font-semibold">
            Leadership Philosophy
          </span>

          <blockquote className="text-3xl md:text-4xl font-black max-w-4xl mx-auto mt-6 leading-tight">
            "True leadership is not about authority;
            it is about inspiring others to achieve
            excellence together."
          </blockquote>
        </motion.div>

      </div>
    </section>
  );
};

export default StudentLeadership;