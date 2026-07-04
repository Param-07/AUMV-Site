import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const ContactMap = () => {
  return (
    <section className="relative h-[550px] overflow-hidden">

      {/* GOOGLE MAP */}

      <iframe
        title="Alok Inter College Location"
        src="https://maps.google.com/maps?q=Chandauli%20Uttar%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
        loading="lazy"
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* LOCATION CARD */}

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute left-1/2 md:left-auto md:right-16 bottom-10 -translate-x-1/2 md:translate-x-0 bg-white shadow-2xl max-w-md w-[90%] md:w-auto"
      >
        {/* TOP BAR */}

        <div className="h-2 bg-red-700" />

        <div className="p-8">

          <div className="flex items-center gap-3 mb-4">
            <MapPin
              size={24}
              className="text-[#15157d]"
            />

            <span className="uppercase tracking-[0.2em] text-xs font-semibold text-[#cca730]">
              Campus Location
            </span>
          </div>

          <h3 className="text-3xl font-black text-[#15157d]">
            Alok Inter College
          </h3>

          <p className="text-slate-600 mt-4 leading-relaxed">
            Mughalsarai - Chandauli Road,
            Chandauli, Uttar Pradesh 232104
          </p>

          <a
            href="https://www.google.com/maps/dir/25.2601376,83.2689965/Alok+Inter+College,+7759%2BMQF,+Gautam+Nagar,+Chandauli,+Uttar+Pradesh+232104/@25.2599041,83.2636093,16z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x398e16384b1b1d3b:0x72407a2c76bd8ff2!2m2!1d83.2694118!2d25.2591753?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-red-700 font-bold hover:gap-4 transition-all duration-300"
          >
            Get Directions

            <ArrowRight size={18} />
          </a>

        </div>
      </motion.div>

    </section>
  );
};

export default ContactMap;