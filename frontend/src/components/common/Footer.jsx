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
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#cca730] hover:text-black transition-all cursor-pointer">
                <Facebook size={18} />
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#cca730] hover:text-black transition-all cursor-pointer">
                <Instagram size={18} />
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#cca730] hover:text-black transition-all cursor-pointer">
                <Youtube size={18} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xl mb-5 text-[#cca730]">
              Quick Links
            </h4>

            <ul className="space-y-3 text-gray-400">
              <li><a href="/#/about">About Us</a></li>
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
              <li>Admissions</li>
              <li>Privacy Policy</li>
              <li>Contact Support</li>
              <li>Mandatory Disclosure</li>
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
                <span>+91 XXXXX XXXXX</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                <span>info@alokschool.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-8 text-center text-gray-500">
          © {new Date().getFullYear()} Alok Inter College.
          All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;