import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from "../assets/images/logo.png";
import facebook from "../assets/images/facebook-modified.png";
import instagram from "../assets/images/instagram-modified.png";
import youtube from "../assets/images/youtube.png";
const SchoolLogoPlaceholder = () => (
    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
       <img src={logo} alt="Alok's logo" />
    </div>
);

const Footer = () => {
    return (
        <footer className="bg-[#3d2569] text-white py-10 px-4" id='contact'>
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
                <div className="space-y-4">
                    <h3 className="text-lg font-bold">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                            <img src={instagram} alt="Instagram" className="rounded-full w-10 h-10" />
                        </a>
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook" className="rounded-full w-10 h-10" />
                        </a>
                         <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                            <img src={youtube} alt="Youtube" className="rounded-full w-10 h-10" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-600 pt-4 text-center text-xs text-gray-400">
                <p>&copy; 2024 Alok Inter College, Chandauli. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;