import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ChevronDown, Phone, Mail, MapPin } from 'lucide-react';

const SchoolLogoPlaceholder = () => (
    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.483 9.279 5 7.5 5S4.168 5.483 3 6.253m9 0c1.168.77 2.721 1.253 4.5 1.253S20.832 6.483 22 6.253m-10 0v-2.5m-9 2.5a.75.75 0 011.5 0v.5A.75.75 0 013 7.75V19.5c0 .414.336.75.75.75h1.5a.75.75 0 01.75-.75v-10.5c0-.414-.336-.75-.75-.75H3.75a.75.75 0 01-.75-.75v-.5z" />
        </svg>
    </div>
);


const NavLink = ({ children, to, hasDropdown = false, className = '' }) => {
    return (
        <a href={to} className={`block px-3 py-2 text-gray-700 transition-colors duration-200 hover:text-[#4B2E83] font-medium ${className}`}>
            {children}
            {hasDropdown && <ChevronDown className="inline-block ml-1 h-4 w-4" />}
        </a>
    );
};

const DropdownMenu = ({ children, isVisible }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // Here, we would close the dropdown in a more complete implementation.
                // For this example, we'll rely on the hover functionality.
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <ul ref={dropdownRef} className={`absolute z-50 left-0 mt-2 min-w-[200px] rounded-md bg-white p-2 shadow-lg transition-all duration-300 ease-out ${isVisible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`}>
            {children}
        </ul>
    );
};

const NestedDropdown = ({ children, label }) => {
    const [isNestedVisible, setIsNestedVisible] = useState(false);

    return (
        <li
            className="relative"
            onMouseEnter={() => setIsNestedVisible(true)}
            onMouseLeave={() => setIsNestedVisible(false)}
        >
            <a href="#" className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#4B2E83] hover:text-white rounded-md transition-colors duration-200">
                {label}
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isNestedVisible ? 'rotate-90' : 'rotate-0'}`} />
            </a>
            <ul className={`absolute z-50 top-0 left-full ml-2 min-w-[200px] rounded-md bg-white p-2 shadow-lg transition-all duration-300 ease-out ${isNestedVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {children}
            </ul>
        </li>
    );
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

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
                        <a href="#" className="hover:text-amber-200 transition-colors">Alumni</a>
                        <a href="#" className="hover:text-amber-200 transition-colors">Jobs</a>
                        <a href="#" className="hover:text-amber-200 transition-colors">हिन्दी</a>
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
                                <h3 className="text-[#4B2E83] text-xl font-semibold">ALOK INTER COLLEGE</h3>
                                <p className="text-gray-500 text-xs">CHANDAULI</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {/* Nav Links */}
                            <div className="relative group">
                                <NavLink to="#" className="group-hover:text-[#4B2E83]">Home</NavLink>
                            </div>

                            <div className="relative group">
                                <NavLink to="#" hasDropdown>About</NavLink>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Principal's Message</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Director's Message</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Vision & Mission</a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <NavLink to="#" hasDropdown>Academics</NavLink>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Top Scholars</a>
                                        <div className="relative group/nested">
                                            <a href="#" className="flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">
                                                Syllabus
                                                <ChevronDown className="w-4 h-4 transition-transform group-hover/nested:rotate-180" />
                                            </a>
                                            <div className="absolute left-full top-0 ml-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible group-hover/nested:visible transition-all duration-200 origin-left scale-x-0 group-hover/nested:scale-x-100">
                                                <div className="py-1">
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">CBSE Board</a>
                                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">UP Board</a>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Academic Calendar</a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative group">
                                <NavLink to="#" hasDropdown>Admissions</NavLink>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">How to Apply</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Scholarships</a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <NavLink to="#" hasDropdown>Facilities</NavLink>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Computer Lab</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Library</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Transport</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Sports Complex</a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <NavLink to="#" hasDropdown>Gallery</NavLink>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Video Gallery</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Photo Gallery</a>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <NavLink to="#" hasDropdown>Contact</NavLink>
                                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible transition-all duration-200 origin-top scale-y-0 group-hover:scale-y-100">
                                    <div className="py-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Contact Form</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#4B2E83]">Campus Location</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <X className="block h-6 w-6" />
                                ) : (
                                    <Menu className="block h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <NavLink to="#" className="text-gray-900">Home</NavLink>
                        <div className="relative">
                            <button
                                onClick={() => handleDropdownToggle('about')}
                                className="w-full text-left px-3 py-2 text-gray-700 transition-colors duration-200 hover:text-[#4B2E83] font-medium"
                            >
                                About
                                <ChevronDown className={`inline-block ml-1 h-4 w-4 transition-transform duration-300 ${openDropdown === 'about' ? 'rotate-180' : 'rotate-0'}`} />
                            </button>
                            {openDropdown === 'about' && (
                                <div className="pl-4 pt-2 pb-1 space-y-1">
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Principal's Message</a>
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Director's Message</a>
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Vision & Mission</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => handleDropdownToggle('academics')}
                                className="w-full text-left px-3 py-2 text-gray-700 transition-colors duration-200 hover:text-[#4B2E83] font-medium"
                            >
                                Academics
                                <ChevronDown className={`inline-block ml-1 h-4 w-4 transition-transform duration-300 ${openDropdown === 'academics' ? 'rotate-180' : 'rotate-0'}`} />
                            </button>
                            {openDropdown === 'academics' && (
                                <div className="pl-4 pt-2 pb-1 space-y-1">
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Top Scholars</a>
                                    <div className="relative">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDropdownToggle('syllabus');
                                            }}
                                            className="w-full text-left flex justify-between items-center px-3 py-2 text-gray-600 hover:text-[#4B2E83]"
                                        >
                                            Syllabus
                                            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openDropdown === 'syllabus' ? 'rotate-180' : 'rotate-0'}`} />
                                        </button>
                                        {openDropdown === 'syllabus' && (
                                            <div className="pl-4 pt-2 pb-1 space-y-1">
                                                <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">CBSE Board</a>
                                                <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">UP Board</a>
                                            </div>
                                        )}
                                    </div>
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Academic Calendar</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => handleDropdownToggle('admissions')}
                                className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#4B2E83] font-medium"
                            >
                                Admissions
                                <ChevronDown className={`inline-block ml-1 h-4 w-4 transition-transform duration-300 ${openDropdown === 'admissions' ? 'rotate-180' : 'rotate-0'}`} />
                            </button>
                            {openDropdown === 'admissions' && (
                                <div className="pl-4 pt-2 pb-1 space-y-1">
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">How to Apply</a>
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Scholarships</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => handleDropdownToggle('facilities')}
                                className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#4B2E83] font-medium"
                            >
                                Facilities
                                <ChevronDown className={`inline-block ml-1 h-4 w-4 transition-transform duration-300 ${openDropdown === 'facilities' ? 'rotate-180' : 'rotate-0'}`} />
                            </button>
                            {openDropdown === 'facilities' && (
                                <div className="pl-4 pt-2 pb-1 space-y-1">
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Computer Lab</a>
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Library</a>
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Transport</a>
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Sports Complex</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => handleDropdownToggle('gallery')}
                                className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#4B2E83] font-medium"
                            >
                                Gallery
                                <ChevronDown className={`inline-block ml-1 h-4 w-4 transition-transform duration-300 ${openDropdown === 'gallery' ? 'rotate-180' : 'rotate-0'}`} />
                            </button>
                            {openDropdown === 'gallery' && (
                                <div className="pl-4 pt-2 pb-1 space-y-1">
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Video Gallery</a>
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Photo Gallery</a>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => handleDropdownToggle('contact')}
                                className="w-full text-left px-3 py-2 text-gray-700 hover:text-[#4B2E83] font-medium"
                            >
                                Contact
                                <ChevronDown className={`inline-block ml-1 h-4 w-4 transition-transform duration-300 ${openDropdown === 'contact' ? 'rotate-180' : 'rotate-0'}`} />
                            </button>
                            {openDropdown === 'contact' && (
                                <div className="pl-4 pt-2 pb-1 space-y-1">
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Contact Form</a>
                                    <a href="#" className="block px-3 py-2 text-gray-600 hover:text-[#4B2E83]">Campus Location</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
