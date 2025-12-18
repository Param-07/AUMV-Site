import React from "react";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import SmartImage from "../SmartImages";
import logo from "../../assets/images/logo.png";
import facebook from "../../assets/images/facebook-modified.png";
import instagram from "../../assets/images/instagram-modified.png";
import youtube from "../../assets/images/youtube.png";

const Footer = () => {
  const quickLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/#about", hash: true },
    { name: "Academics", to: "/academics" },
    { name: "Admissions", to: "/admission" },
    { name: "Facilities", to: "/facilities" },
    { name: "Gallery", to: "/gallery" },
    { name: "Contact", to: "/#contact", hash: true },
    { name: "Alumni", to: "/alumni" },
  ];

  const SmoothLink = ({ to, hash = false, children }) => {
    const Component = hash ? HashLink : "a";
    return (
      <Component
        href={!hash ? to : undefined}
        to={hash ? to : undefined}
        smooth
        className="text-gray-300 hover:text-white transition relative group w-fit"
      >
        {children}
        <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
      </Component>
    );
  };

  return (
    <footer className="bg-[#0F172A] text-white pt-14 px-4" id="contact">
      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto mb-10 px-4">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl text-center py-6 shadow-lg">
          <h3 className="font-semibold text-lg md:text-xl mb-2">
            Admissions Open for Academic Year 2024–25
          </h3>
          <a
            href="/admission"
            className="mt-2 inline-flex items-center gap-2 px-6 py-2 rounded-full font-semibold bg-white text-indigo-700 hover:bg-gray-100 transition"
          >
            Apply Now <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
        {/* About */}
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center space-x-3">
            <SmartImage
              src={logo}
              alt="Alok School Logo"
              width={300}
              wrapperClassName="w-14 h-14"
              className="w-full h-full rounded-full object-cover"
              priority={true}
            />
            <div>
              <h2 className="text-xl font-bold tracking-wide">Alok Inter College</h2>
              <p className="text-sm text-gray-400">Chandauli</p>
            </div>
          </div>
          <p className="italic text-sm text-gray-300">विद्या ददाति विनयम्</p>
          <p className="text-sm text-gray-300 leading-relaxed">
            Nurturing excellence in education and character development for over a decade.
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-2">Contact Information</h3>
          <p className="flex items-center gap-2 text-sm text-gray-300">
            <Phone size={18} /> +91 9876543210
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-300">
            <Mail size={18} /> info@alokschool.edu.in
          </p>
          <p className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
            <MapPin size={18} className="mt-1" />
            Alok Higher Secondary School,<br /> Chandauli, Uttar Pradesh – 232104
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {quickLinks.map((item, i) => (
              <SmoothLink key={i} to={item.to} hash={item.hash}>
                {item.name}
              </SmoothLink>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <SmartImage
                src={instagram}
                alt="Instagram"
                width={100}
                wrapperClassName="w-10 h-10"
                className="w-full h-full rounded-full shadow-md hover:shadow-purple-500/40 object-cover"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <SmartImage
                src={facebook}
                alt="Facebook"
                width={100}
                wrapperClassName="w-10 h-10"
                className="w-full h-full rounded-full shadow-md hover:shadow-blue-500/40 object-cover"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <SmartImage
                src={youtube}
                alt="Youtube"
                width={100}
                wrapperClassName="w-10 h-10"
                className="w-full h-full rounded-full shadow-md hover:shadow-red-500/40 object-cover"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Alok Inter College, Chandauli — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
