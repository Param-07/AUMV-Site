import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
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
    <footer className="bg-[#0b0b3f] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-extrabold text-[#cca730] mb-4">
              Alok Inter College
            </h3>

            <p className="text-gray-400 leading-relaxed">
              Empowering young minds through quality education,
              discipline, innovation, and character development.
            </p>

            <div className="flex gap-4 mt-6">
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
                className="w-12 h-12 border border-[#dadae1] flex items-center justify-center text-[#e7e7ef] hover:bg-[#458ee3] hover:text-white transition-all"
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
                className="w-12 h-12 border border-[#babacd] flex items-center justify-center text-[#c013a6] hover:bg-[#ba1c9b] hover:text-white transition-all"
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
                className="w-12 h-12 border border-[#d7d7e6] flex items-center justify-center text-[#7d1219] hover:bg-[#aa1010] hover:text-white transition-all"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-5 text-[#cca730]">
              Quick Links
            </h4>

            <ul className="space-y-3 text-gray-400">
              <li><a href="/#/academics">Academics</a></li>
              <li><a href="/#/facilities">Facilities</a></li>
              <li><a href="/#/gallery">Gallery</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-xl mb-5 text-[#cca730]">
              Support
            </h4>

            <ul className="space-y-3 text-gray-400">
              <li><a href="#/contact">Admissions</a></li>
              <li><a href="#/contact">Contact Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-xl mb-5 text-[#cca730]">
              Contact
            </h4>

            <div className="space-y-4 text-gray-400">
              <div className="flex gap-3">
                <MapPin size={18} />
                <span>
                  Indira Nagar, Chandauli,
                  Uttar Pradesh
                </span>
              </div>

              <div className="flex gap-3">
                <Phone size={18} />
                <span>+91 7398332780</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                <span>alokic003@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-14 pt-8 text-center text-gray-500">
          © {new Date().getFullYear()} Alok Inter College.
          All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;