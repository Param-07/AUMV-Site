import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FacilitiesCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 text-center">

        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-[#15157d] mb-8"
        >
          Experience the Campus Firsthand
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          We invite parents and prospective students to explore our
          world-class facilities, meet our faculty, and experience
          the vibrant learning environment that defines Alok Inter
          College.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <button
            onClick={() => navigate("/campus-visit")}
            className="bg-[#15157d] text-white px-10 py-4 font-semibold hover:bg-[#2e3192] transition-all duration-300 hover:shadow-xl"
          >
            Schedule a Campus Tour
          </button>

          <button
            onClick={() => navigate("/admission")}
            className="border-2 border-red-700 text-red-700 px-10 py-4 font-semibold hover:bg-red-700 hover:text-white transition-all duration-300"
          >
            Download Prospectus
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default FacilitiesCTA;