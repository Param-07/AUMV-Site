import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight } from "lucide-react";
import School from "../../assets/images/AlokSchool.png";

const ContactHero = () => {
  return (
    <section
      className="
        relative
        grid
        /* Forced structural split layout constraint on ALL viewport configurations */
        grid-cols-[46%_54%] 
        /* Compressed low-profile macro height limits matching core architecture */
        min-h-[280px]
        sm:min-h-[380px]
        lg:min-h-[460px]
        bg-[#0d104f]
        overflow-hidden
      "
    >
      {/* ================= LEFT CONTROLS & CONTENT PANEL ================= */}
      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#15157d]
          via-[#12156d]
          to-[#0d104f]
          flex
          items-center
          /* Low-profile internal vertical and horizontal paddings */
          py-4
          px-3
          sm:px-8
          lg:px-12
        "
      >
        {/* Shrunk Decorative Background Element */}
        <div className="absolute -left-28 -bottom-24 w-64 h-64 rounded-full bg-[#cca730]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top Minimal Track Accent Line */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-4">
              <span className="w-4 sm:w-8 h-[1px] bg-[#cca730]/50" />
              <span className="uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[8px] sm:text-[10px] text-[#cca730] font-semibold whitespace-nowrap">
                Contact Administration
              </span>
            </div>

            {/* Scaled Responsive Core Micro Headings */}
            <h1 className="text-lg sm:text-3xl md:text-5xl xl:text-6xl font-black text-white leading-tight">
              Get In
              <span className="block italic text-[#cca730] my-0">
                Touch
              </span>
            </h1>

            {/* Restricted Content Paragraph Block with Text-Clamping Guards */}
            <p className="mt-1.5 sm:mt-4 text-[10px] sm:text-sm md:text-base text-white/75 leading-relaxed max-w-md line-clamp-2 sm:line-clamp-3">
              Experience the heritage of excellence. Reach out to the heart of Chandauli's premier educational institution and let us help you begin your academic journey.
            </p>

            {/* Inline Action Layout System Group */}
            <div className="mt-3 sm:mt-5 flex flex-col sm:flex-row gap-1.5 sm:gap-3 w-full">
              <button className="group w-full sm:w-auto text-center whitespace-nowrap bg-[#cca730] text-[#15157d] px-2.5 sm:px-5 py-1.5 sm:py-2.5 text-[9px] sm:text-sm font-bold flex items-center justify-center gap-1 hover:scale-[1.02] transition-all duration-300">
                Send Message
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform hidden sm:inline-block" />
              </button>

              <button className="w-full sm:w-auto text-center whitespace-nowrap border border-white/20 text-white px-2.5 sm:px-5 py-1.5 sm:py-2.5 text-[9px] sm:text-sm font-semibold hover:bg-white hover:text-[#15157d] transition-all duration-300">
                Admissions Info
              </button>
            </div>

            {/* Low-Profile Grid Matrix Communication Channels */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-3 sm:mt-6 pt-3 sm:pt-5 border-t border-white/10">
              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="p-1 sm:p-2 bg-white/5 rounded">
                  <Phone size={14} className="text-[#cca730] sm:scale-125" />
                </div>
                <div className="truncate">
                  <h4 className="text-[9px] sm:text-xs text-white/60 tracking-tight leading-none">Call Support</h4>
                  <p className="text-[10px] sm:text-sm font-bold text-white mt-0.5 sm:mt-1 truncate">Immediate Response</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-3">
                <div className="p-1 sm:p-2 bg-white/5 rounded">
                  <Mail size={14} className="text-[#cca730] sm:scale-125" />
                </div>
                <div className="truncate">
                  <h4 className="text-[9px] sm:text-xs text-white/60 tracking-tight leading-none">Email Desk</h4>
                  <p className="text-[10px] sm:text-sm font-bold text-white mt-0.5 sm:mt-1 truncate">24 Hour Turnaround</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= RIGHT IMAGE PANEL (CAMPUS HEADQUARTERS) ================= */}
      <div className="relative overflow-hidden group h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1.03 }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 15, ease: "linear" },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={School}
            alt="Alok Inter College Central Campus HQ"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Ambient Dark Core Mixing Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#15157d]/80 via-black/5 to-transparent" />

        {/* Minimal Micro Spotlight Floating Location Context Card */}
        <div className="absolute bottom-2 left-2 right-2 sm:left-auto sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md p-2 sm:p-4 max-w-[220px] sm:max-w-xs shadow-xl border-l-4 border-[#cca730]">
          <span className="uppercase tracking-wider text-[7px] sm:text-[9px] text-slate-500 font-semibold block">
            Central Headquarters
          </span>
          <h3 className="mt-0.5 text-[10px] sm:text-base font-bold text-[#15157d] leading-tight truncate">
            Alok Inter College
          </h3>
          <p className="mt-0.5 text-slate-600 text-[9px] sm:text-xs leading-normal line-clamp-1 sm:line-clamp-2">
            Chandauli, Uttar Pradesh, India
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;