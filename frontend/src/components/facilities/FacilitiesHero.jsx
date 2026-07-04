import { motion } from "framer-motion";
import { useAppData } from "../../context/AppDataContext";
import SmartImage from "../SmartImages";

const FacilitiesHero = () => {
  const { facilities = [] } = useAppData();

  const heroImage =
    facilities?.[0]?.facilities?.[0]?.src ||
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800";

  return (
    <section
      className="relative h-[520px] md:h-[620px] overflow-hidden bg-[#15157d]"
      style={{ marginTop: "95px" }}
    >
      <div className="absolute inset-0">
        <SmartImage
          src={heroImage}
          alt="School Infrastructure"
          className="w-full h-full object-cover opacity-40"
          wrapperClassName="w-full h-full"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#15157d]/90 via-[#15157d]/70 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 flex items-center">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 border border-[#cca730] text-[#ffe088] rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            World-Class Infrastructure
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white leading-tight"
          >
            Heritage Excellence,
            <span className="block text-[#cca730]">
              Modern Evolution.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
          >
            Alok Inter College provides a sophisticated ecosystem
            designed to nurture academic brilliance through
            state-of-the-art facilities and disciplined mentorship.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesHero;