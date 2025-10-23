import React, { useState } from "react";
import {Menu, X, ChevronDown, Phone, Mail, MapPin, Download, ArrowLeft,} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/images/logo.png"; 
const SchoolLogoPlaceholder = () => (
  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
    <span className="text-gray-400 font-bold"><img src={logo} alt="School's Logo" /></span>
  </div>
);

const NavLink = ({ children, to, hasDropdown = false, isHash = false, className=""}) => {
  const Component = isHash ? HashLink : Link;
  return (
    <Component
      smooth
      to={to}
      className={`block px-3 py-2 text-gray-700 transition-colors duration-200 hover:text-[#4B2E83] font-medium ${className}`}
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

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#4B2E83] text-white text-sm py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> +91 9876543210
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> info@alokschool.edu.in
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> Chandauli, Uttar Pradesh
            </span>
          </div>
          <div className="space-x-4">
            <a href="#" className="hover:text-amber-200 transition-colors">
              Alumni
            </a>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Jobs
            </a>
            <a href="/login"  className="hover:text-amber-200 transition-colors">
              login
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <SchoolLogoPlaceholder />
              <div>
                <h3 className="text-[#4B2E83] text-xl font-semibold">
                  ALOK INTER COLLEGE
                </h3>
                <p className="text-gray-500 text-xs">CHANDAULI</p>
              </div>
            </div>
            {location.pathname === "/admissions" ? (
              <div className="hidden lg:flex items-center space-x-1">
                <NavLink
                  to="/prospectus"
                  className="inline-flex items-center gap-2 border border-purple-800 bg-white text-purple-800 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-purple-800 hover:text-white"
                >
                  <Download size={18} />
                  Prospectus
                </NavLink>

                <NavLink
                  to="/"
                  className="inline-flex items-center gap-2 border border-purple-800 bg-white text-purple-800 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-purple-800 hover:text-white"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </NavLink>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-1">
                <NavLink to="/">Home</NavLink>
                <div className="relative group">
                  <NavLink to="/#about" hasDropdown isHash>
                    About
                  </NavLink>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                    <div className="py-1">
                      <HashLink
                        smooth
                        to="/#principal"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Principal's Message
                      </HashLink>
                      <HashLink
                        smooth
                        to="/#director"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Director's Message
                      </HashLink>
                      <HashLink
                        smooth
                        to="/#vision"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Vision & Mission
                      </HashLink>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <NavLink to="/academics" hasDropdown>
                    Academics
                  </NavLink>
                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                    <div className="py-1">
                      <HashLink
                        smooth
                        to="/academics#top-scholars"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Top Scholars
                      </HashLink>
                      <HashLink
                        smooth
                        to="/academics#syllabus"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Syllabus
                      </HashLink>
                      <HashLink
                        smooth
                        to="/academics#calendar"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Academic Calendar
                      </HashLink>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <NavLink to="/admission" hasDropdown>
                    Admissions
                  </NavLink>
                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                    <div className="py-1">
                      <HashLink
                        smooth
                        to="/admission"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        How to Apply
                      </HashLink>
                      <HashLink
                        smooth
                        to="/admission#scholarships"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Scholarships
                      </HashLink>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <NavLink to="/facilities" hasDropdown>
                    Facilities
                  </NavLink>
                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                    <div className="py-1">
                      <HashLink
                        smooth
                        to="/facilities#computer-lab"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Computer Lab
                      </HashLink>
                      <HashLink
                        smooth
                        to="/facilities#library"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Library
                      </HashLink>
                      <HashLink
                        smooth
                        to="/facilities#transport"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Transport
                      </HashLink>
                      <HashLink
                        smooth
                        to="/facilities#sports"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Sports Complex
                      </HashLink>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <NavLink to="/gallery" hasDropdown>
                    Gallery
                  </NavLink>
                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                    <div className="py-1">
                      <HashLink
                        smooth
                        to="/gallery#video-gallery"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Video Gallery
                      </HashLink>
                      <HashLink
                        smooth
                        to="/gallery#photo-gallery"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Photo Gallery
                      </HashLink>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div className="relative group">
                  <NavLink to="/#contact" hasDropdown isHash>
                    Contact
                  </NavLink>
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                    <div className="py-1">
                      <HashLink
                        smooth
                        to="/#contact"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Contact Us
                      </HashLink>
                      <HashLink
                        smooth
                        to="/#contact"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-[#4B2E83]"
                      >
                        Get Directions
                      </HashLink>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          } transition-all duration-300`}
        >
          {location.pathname === "/admissions" ? (
            // Condensed Mobile Menu for /admissions
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/prospectus"
                className="inline-flex items-center gap-2 border border-purple-800 bg-white text-purple-800 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-purple-800 hover:text-white"
              >
                <Download size={18} />
                Prospectus
              </NavLink>

              <NavLink
                to="/"
                className="inline-flex items-center gap-2 border border-purple-800 bg-white text-purple-800 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-purple-800 hover:text-white"
              >
                <ArrowLeft size={18} />
                Back to Home
              </NavLink>
            </div>
          ) : (
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink to="/">Home</NavLink>

              {/* About Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("about")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#4B2E83] font-medium"
                >
                  About
                  <ChevronDown
                    className={`inline-block ml-1 h-4 w-4 transition-transform ${
                      openDropdown === "about" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "about" && (
                  <div className="pl-4 pt-2 pb-1 space-y-1">
                    <HashLink
                      smooth
                      to="/#principal"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Principal's Message
                    </HashLink>
                    <HashLink
                      smooth
                      to="/#director"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Director's Message
                    </HashLink>
                    <HashLink
                      smooth
                      to="/#vision"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Vision & Mission
                    </HashLink>
                  </div>
                )}
              </div>

              {/* Academics Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("academics")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#4B2E83] font-medium"
                >
                  Academics
                  <ChevronDown
                    className={`inline-block ml-1 h-4 w-4 transition-transform ${
                      openDropdown === "academics" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "academics" && (
                  <div className="pl-4 pt-2 pb-1 space-y-1">
                    <HashLink
                      smooth
                      to="/academics#top-scholars"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Top Scholars
                    </HashLink>
                    <HashLink
                      smooth
                      to="/academics#syllabus"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Syllabus
                    </HashLink>
                    <HashLink
                      smooth
                      to="/academics#calendar"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Academic Calendar
                    </HashLink>
                  </div>
                )}
              </div>

              {/* Admissions Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("admissions")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#4B2E83] font-medium"
                >
                  Admissions
                  <ChevronDown
                    className={`inline-block ml-1 h-4 w-4 transition-transform ${
                      openDropdown === "admissions" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "admissions" && (
                  <div className="pl-4 pt-2 pb-1 space-y-1">
                    <HashLink
                      smooth
                      to="/admissions#apply"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      How to Apply
                    </HashLink>
                    <HashLink
                      smooth
                      to="/admissions#scholarships"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Scholarships
                    </HashLink>
                  </div>
                )}
              </div>

              {/* Facilities Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("facilities")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#4B2E83] font-medium"
                >
                  Facilities
                  <ChevronDown
                    className={`inline-block ml-1 h-4 w-4 transition-transform ${
                      openDropdown === "facilities" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "facilities" && (
                  <div className="pl-4 pt-2 pb-1 space-y-1">
                    <HashLink
                      smooth
                      to="/facilities#computer-lab"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Computer Lab
                    </HashLink>
                    <HashLink
                      smooth
                      to="/facilities#library"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Library
                    </HashLink>
                    <HashLink
                      smooth
                      to="/facilities#transport"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Transport
                    </HashLink>
                    <HashLink
                      smooth
                      to="/facilities#sports"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Sports Complex
                    </HashLink>
                  </div>
                )}
              </div>

              {/* Gallery Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("gallery")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#4B2E83] font-medium"
                >
                  Gallery
                  <ChevronDown
                    className={`inline-block ml-1 h-4 w-4 transition-transform ${
                      openDropdown === "gallery" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "gallery" && (
                  <div className="pl-4 pt-2 pb-1 space-y-1">
                    <HashLink
                      smooth
                      to="/gallery#videos"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Video Gallery
                    </HashLink>
                    <HashLink
                      smooth
                      to="/gallery#photos"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Photo Gallery
                    </HashLink>
                  </div>
                )}
              </div>

              {/* Contact Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle("contact")}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#4B2E83] font-medium"
                >
                  Contact
                  <ChevronDown
                    className={`inline-block ml-1 h-4 w-4 transition-transform ${
                      openDropdown === "contact" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openDropdown === "contact" && (
                  <div className="pl-4 pt-2 pb-1 space-y-1">
                    <HashLink
                      smooth
                      to="/#contact"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Contact Us
                    </HashLink>
                    <HashLink
                      smooth
                      to="/#contact"
                      className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                    >
                      Get Directions
                    </HashLink>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
