import { motion } from "framer-motion";
import School from "../../assets/images/AlokSchool.png";

const ContactHero = () => {
  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden flex items-center justify-center">
      
      {/* BACKGROUND IMAGE */}

      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1 }}
          animate={{ scale: 1.08 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          src={School}
          alt="Alok Inter College Campus"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#15157d]/65" />
      </div>

      {/* CONTENT */}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="uppercase tracking-[0.3em] text-[#cca730] text-sm font-semibold">
            Contact Alok Inter College
          </span>

          <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">
            Get In Touch
          </h1>

          <div className="w-24 h-[3px] bg-[#cca730] mx-auto mt-6 mb-8" />

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Experience the heritage of excellence.
            Reach out to the heart of Chandauli's
            premier educational institution and let
            us help you begin your academic journey.
          </p>
        </motion.div>

      </div>

    </section>
  );
};

export default ContactHero;