import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const SchoolLogoPlaceholder = () => (
    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.483 9.279 5 7.5 5S4.168 5.483 3 6.253m9 0c1.168.77 2.721 1.253 4.5 1.253S20.832 6.483 22 6.253m-10 0v-2.5m-9 2.5a.75.75 0 011.5 0v.5A.75.75 0 013 7.75V19.5c0 .414.336.75.75.75h1.5a.75.75 0 01.75-.75v-10.5c0-.414-.336-.75-.75-.75H3.75a.75.75 0 01-.75-.75v-.5z" />
        </svg>
    </div>
);

const Footer = () => {
    return (
        <footer className="bg-[#3d2569] text-white py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {/* About Section */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <SchoolLogoPlaceholder />
                        <div>
                            <h2 className="text-xl font-bold">Alok Inter College</h2>
                            <p className="text-sm text-gray-400">Chandauli</p>
                        </div>
                    </div>
                    <p className="italic text-sm text-gray-300">विद्या ददाति विनयम्</p>
                    <p className="text-sm text-gray-300">
                        Nurturing excellence in education and character development for over a decade.
                    </p>
                </div>

                {/* Contact Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Contact Information</h3>
                    <div className="space-y-2">
                        <p className="flex items-center space-x-2 text-sm text-gray-300">
                            <Phone className="w-4 h-4" /> <span>+91 9876543210</span>
                        </p>
                        <p className="flex items-center space-x-2 text-sm text-gray-300">
                            <Mail className="w-4 h-4" /> <span>info@alokschool.edu.in</span>
                        </p>
                        <p className="flex items-start space-x-2 text-sm text-gray-300">
                            <MapPin className="w-4 h-4 mt-1" />
                            <span>
                                Alok Higher Secondary School<br />
                                Chandauli, Uttar Pradesh - 232104
                            </span>
                        </p>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Academics</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Admissions</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Facilities</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Gallery</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">Alumni</a>
                    </div>
                </div>

                {/* Social Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Follow Us</h3>
                    <div className="flex space-x-4">
                        {/* Placeholder for social icons */}
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                            <img src="https://placehold.co/40x40/ffffff/000000?text=IG" alt="Instagram" className="rounded-full w-10 h-10" />
                        </a>
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                            <img src="https://placehold.co/40x40/ffffff/000000?text=FB" alt="Facebook" className="rounded-full w-10 h-10" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-600 pt-4 text-center text-xs text-gray-400">
                <p>&copy; 2024 Alok Inter College, Chandauli. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
