import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Download,
  ArrowLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/images/logo.png";

const NavLink = ({
  children,
  to,
  hasDropdown = false,
  isHash = false,
  className = "",
}) => {
  const Component = isHash ? HashLink : Link;
  return (
    <Component
      smooth
      to={to}
      className={`relative block px-3 py-2 text-[15px] font-medium text-slate-700 transition-colors duration-200 hover:text-indigo-900 ${className}`}
    >
      {children}
      {hasDropdown && <ChevronDown className="inline-block ml-1 h-4 w-4" />}
    </Component>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  const handleDropdownToggle = (dropdown) =>
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);

  const isAdmissionsPage = location.pathname === "/admissions";

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-100 text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-300" /> +91 9876543210
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-300" /> info@alokschool.edu.in
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-300" /> Chandauli, Uttar Pradesh
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-amber-200 transition-colors">
              Alumni
            </a>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Jobs
            </a>
            <a href="/login" className="hover:text-amber-200 transition-colors">
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* Brand — CLICKABLE NOW */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center ring-2 ring-indigo-700/20 shadow-md transition-transform group-hover:scale-[1.04]">
                <img src={logo} alt="School Logo" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h3 className="text-indigo-900 text-xl font-semibold tracking-tight group-hover:text-indigo-700 transition">
                  ALOK INTER COLLEGE
                </h3>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Chandauli
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            {!isAdmissionsPage && (
              <div className="hidden lg:flex items-center space-x-1 text-sm">
                {/* --- MENU ITEMS WITH NEW PREMIUM DROPDOWNS --- */}
                {[
                  { label: "Home", to: "/" },
                  {
                    label: "About",
                    to: "/#about",
                    dropdown: [
                      { label: "Principal's Message", to: "/#principal" },
                      { label: "Director's Message", to: "/#director" },
                      { label: "Vision & Mission", to: "/#vision" },
                    ],
                    isHash: true,
                  },
                  {
                    label: "Academics",
                    to: "/academics",
                    dropdown: [
                      { label: "Top Scholars", to: "/academics#top-scholars" },
                      { label: "Syllabus", to: "/academics#syllabus" },
                      { label: "Academic Calendar", to: "/academics#calendar" },
                    ],
                  },
                  {
                    label: "Admissions",
                    to: "/admission",
                    dropdown: [
                      { label: "How to Apply", to: "/admission" },
                      { label: "Scholarships", to: "/admission#scholarships" },
                    ],
                  },
                  {
                    label: "Facilities",
                    to: "/facilities",
                    dropdown: [
                      { label: "Computer Lab", to: "/facilities#computer-lab" },
                      { label: "Library", to: "/facilities#library" },
                      { label: "Transport", to: "/facilities#transport" },
                      { label: "Sports Complex", to: "/facilities#sports" },
                    ],
                  },
                  {
                    label: "Gallery",
                    to: "/gallery",
                    dropdown: [
                      { label: "Video Gallery", to: "/gallery#video-gallery" },
                      { label: "Photo Gallery", to: "/gallery#photo-gallery" },
                    ],
                  },
                  {
                    label: "Contact",
                    to: "/#contact",
                    dropdown: [
                      { label: "Contact Us", to: "/#contact" },
                      {
                        label: "Get Directions",
                        external:
                          "https://www.google.com/maps/dir/?api=1&destination=Alok+Inter+College+Chandauli",
                      },
                    ],
                    isHash: true,
                  },
                ].map(({ label, to, dropdown, isHash }, idx) => (
                  <div key={idx} className="relative group">
                    <NavLink to={to} hasDropdown={!!dropdown} isHash={isHash} className="group">
                      {label}
                    </NavLink>

                    {/* --- Dropdown */}
                    {dropdown && (
                      <div className="absolute left-0 mt-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 origin-top scale-95 group-hover:scale-100 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.10)] ring-1 ring-slate-200">
                        <ul className="py-2">
                          {dropdown.map((item, i) => (
                            <li key={i}>
                              {item.external ? (
                                <a
                                  href={item.external}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-4 py-2 text-[14px] text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-amber-50 hover:text-indigo-900 transition rounded-lg"
                                >
                                  {item.label}
                                </a>
                              ) : (
                                <HashLink
                                  smooth
                                  to={item.to}
                                  className="block px-4 py-2 text-[14px] text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-amber-50 hover:text-indigo-900 transition rounded-lg"
                                >
                                  {item.label}
                                </HashLink>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Desktop Prospectus Buttons for Admission Page */}
            {isAdmissionsPage && (
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/prospectus"
                  className="inline-flex items-center gap-2 border border-indigo-700 bg-white text-indigo-800 px-4 py-2 rounded-full shadow hover:bg-indigo-700 hover:text-white transition"
                >
                  <Download size={18} /> Prospectus
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-full shadow hover:bg-slate-900 hover:text-white transition"
                >
                  <ArrowLeft size={18} /> Back to Home
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          } bg-white/95 backdrop-blur-xl border-t border-slate-200`}
        >
          <div className="px-4 py-4 text-[15px] space-y-2 text-slate-800">
            <NavLink to="/" className="block">Home</NavLink>

            {/* --- Mobile Dropdowns --- */}
            {[
              {
                key: "about",
                label: "About",
                items: [
                  ["Principal's Message", "/#principal"],
                  ["Director's Message", "/#director"],
                  ["Vision & Mission", "/#vision"],
                ],
              },
              {
                key: "academics",
                label: "Academics",
                items: [
                  ["Top Scholars", "/academics#top-scholars"],
                  ["Syllabus", "/academics#syllabus"],
                  ["Academic Calendar", "/academics#calendar"],
                ],
              },
              {
                key: "admissions",
                label: "Admissions",
                items: [
                  ["How to Apply", "/admission"],
                  ["Scholarships", "/admission#scholarships"],
                ],
              },
              {
                key: "facilities",
                label: "Facilities",
                items: [
                  ["Computer Lab", "/facilities#computer-lab"],
                  ["Library", "/facilities#library"],
                  ["Transport", "/facilities#transport"],
                  ["Sports Complex", "/facilities#sports"],
                ],
              },
              {
                key: "gallery",
                label: "Gallery",
                items: [
                  ["Video Gallery", "/gallery#video-gallery"],
                  ["Photo Gallery", "/gallery#photo-gallery"],
                ],
              },
              {
                key: "contact",
                label: "Contact",
                items: [
                  ["Contact Us", "/#contact"],
                  ["Get Directions", "/#contact"],
                ],
              },
            ].map(({ key, label, items }) => (
              <div key={key}>
                <button
                  onClick={() => handleDropdownToggle(key)}
                  className="w-full flex items-center justify-between px-3 py-2 font-medium text-slate-700 hover:text-indigo-900"
                >
                  {label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openDropdown === key ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === key && (
                  <div className="pl-5 py-1 space-y-1">
                    {items.map(([name, to], i) => (
                      <HashLink
                        smooth
                        to={to}
                        key={i}
                        className="block px-3 py-1.5 text-[14px] text-slate-600 hover:text-indigo-900"
                      >
                        {name}
                      </HashLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
