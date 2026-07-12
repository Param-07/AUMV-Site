import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Clock3,
  Users,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const ContactCards = () => {
  const handleSocialClick = (e, appUri, webUrl) => {
    // Detect mobile devices
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      e.preventDefault();
      // Attempt to force-open the native mobile app
      window.location.href = appUri;

      // Fallback scheme: If the app isn't installed, open the browser tab after 1.5 seconds
      const fallback = setTimeout(() => {
        window.open(webUrl, "_blank", "noopener,noreferrer");
      }, 1500);

      // Clear timeout if the user switches away from the browser to the app
      window.addEventListener("blur", () => clearTimeout(fallback), { once: true });
    }
    // If desktop, it skips this block and cleanly executes the default href web link
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid md:grid-cols-3 gap-8">

          {/* MAIN CAMPUS */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-slate-200 p-8 bg-white hover:shadow-xl transition-all duration-500"
          >
            <div className="w-14 h-14 bg-indigo-50 flex items-center justify-center mb-6">
              <MapPin
                className="text-[#15157d]"
                size={28}
              />
            </div>

            <h3 className="text-2xl font-bold text-[#15157d] mb-5">
              Main Campus
            </h3>

            <div className="space-y-2 text-slate-600">
              <p>Alok Inter College</p>
              <p>Mughalsarai - Chandauli Road</p>
              <p>Chandauli, Uttar Pradesh</p>
              <p>232104</p>
            </div>

            <div className="border-t border-slate-200 my-6" />

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="text-red-700"
                />

                <span className="text-slate-600">
                  +91 7398332780
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="text-red-700"
                />

                <span className="text-slate-600">
                  info@alokcollege.edu.in
                </span>
              </div>

            </div>
          </motion.div>

          {/* ADMINISTRATION */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border border-slate-200 border-t-4 border-t-[#15157d] p-8 bg-white hover:shadow-xl transition-all duration-500"
          >
            <div className="w-14 h-14 bg-indigo-50 flex items-center justify-center mb-6">
              <ShieldCheck
                className="text-[#15157d]"
                size={28}
              />
            </div>

            <h3 className="text-2xl font-bold text-[#15157d] mb-5">
              Administration
            </h3>

            <p className="text-slate-600 leading-relaxed mb-6">
              For admissions, academic records,
              documentation, and official inquiries.
            </p>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Clock3
                  size={18}
                  className="text-red-700"
                />

                <span className="text-slate-600">
                  Mon - Sat | 8:00 AM - 2:00 PM
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Users
                  size={18}
                  className="text-red-700"
                />

                <span className="text-slate-600">
                  Admission Office
                </span>
              </div>

            </div>

            <button className="mt-8 text-[#cca730] font-bold hover:text-red-700 transition-colors">
              Download Prospectus →
            </button>
          </motion.div>

          {/* SOCIAL */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border border-slate-200 p-8 bg-white hover:shadow-xl transition-all duration-500"
          >
            <div className="w-14 h-14 bg-indigo-50 flex items-center justify-center mb-6">
              <Users
                className="text-[#15157d]"
                size={28}
              />
            </div>

            <h3 className="text-2xl font-bold text-[#15157d] mb-5">
              Social Connection
            </h3>

            <p className="text-slate-600 leading-relaxed mb-8">
              Stay connected with campus life,
              student achievements, events, and
              important announcements.
            </p>

            <div className="flex gap-4">

              {/* ================= FACEBOOK LINK ================= */}
            <a
              href="https://www.facebook.com/p/Alok-Higher-Secondary-School-Chandauli-100063812572249/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) =>
                handleSocialClick(
                  e,
                  "fb://page/100063812572249", // Mobile App Protocol using your Page ID
                  "https://www.facebook.com/p/Alok-Higher-Secondary-School-Chandauli-100063812572249/"
                )
              }
              className="w-12 h-12 border border-[#15157d] flex items-center justify-center text-[#15157d] hover:bg-[#15157d] hover:text-white transition-all"
            >
              <Facebook size={18} />
            </a>

            {/* ================= INSTAGRAM LINK ================= */}
            <a
              href="https://www.instagram.com/alok_inter_college1994/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) =>
                handleSocialClick(
                  e,
                  "instagram://user?username=alok_inter_college1994", // Mobile App Protocol using your Username
                  "https://www.instagram.com/alok_inter_college1994/"
                )
              }
              className="w-12 h-12 border border-[#15157d] flex items-center justify-center text-[#15157d] hover:bg-[#15157d] hover:text-white transition-all"
            >
              <Instagram size={18} />
            </a>

            {/* ================= YOUTUBE LINK ================= */}
            <a
              href="https://www.youtube.com/channel/UCbB250hm3z4-6iKfi8XhyIQ"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) =>
                handleSocialClick(
                  e,
                  "vnd.youtube:UCbB250hm3z4-6iKfi8XhyIQ", // Mobile App Protocol using your Channel ID
                  "https://www.youtube.com/channel/UCbB250hm3z4-6iKfi8XhyIQ"
                )
              }
              className="w-12 h-12 border border-[#15157d] flex items-center justify-center text-[#15157d] hover:bg-[#15157d] hover:text-white transition-all"
            >
              <Youtube size={18} />
            </a>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ContactCards;