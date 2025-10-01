import React, { useState } from "react";
import School from "../assets/images/AlokSchool.png";
import logo from "../assets/images/logo.png"; 
const HeroSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    handleClosePopup();
  };

  return (
    <>
      <section className="  relative h-96 md:h-[24rem] ">
        <div
          className="absolute inset-0  bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${School})`,
            backgroundSize: "100% 100%",
          }}
          role="img"
          aria-label="School Building"
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-center text-white">
          <div className="px-4">
            <h2 className="text-lg md:text-xl font-medium mb-1">Welcome to</h2>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              ALOK INTER COLLEGE, CHANDAULI
            </h1>
            <p className="text-base md:text-lg mb-8">विद्या ददाति विनयम्</p>
            <div className="flex justify-center space-x-4">
              <a href="/admission" className="inline-block">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg">
                  Apply Now
                </button>
              </a>
              <button
                onClick={handleOpenPopup}
                className="bg-transparent border border-white text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 hover:bg-white hover:text-gray-800 shadow-lg"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      <div
        className={`fixed inset-0 z-[999] flex items-center justify-center transition-opacity duration-300 ${
          isPopupOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={handleClosePopup}
        ></div>
        <div
          className={`relative bg-white p-6 md:p-8 rounded-2xl w-[90%] max-w-xl shadow-2xl transition-transform duration-400 ease-in-out ${
            isPopupOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            className="absolute top-3 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200"
            onClick={handleClosePopup}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="School Logo"
              className="rounded-full shadow-lg h-36 w-36 object-cover"
            />
          </div>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div>
              <label
                htmlFor="name"
                className="text-gray-700 font-semibold after:content-['*'] after:text-red-500 after:ml-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="name"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-gray-700 font-semibold after:content-['*'] after:text-red-500 after:ml-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="text-gray-700 font-semibold after:content-['*'] after:text-red-500 after:ml-1"
              >
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Phone number"
                required
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-gray-700 font-semibold after:content-['*'] after:text-red-500 after:ml-1"
              >
                Address
              </label>
              <textarea
                id="address"
                name="Address"
                placeholder="Write your Address"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg text-sm resize-y focus:ring focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full p-3 font-semibold text-white bg-purple-800 rounded-lg shadow-md hover:bg-purple-900 transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default HeroSection;