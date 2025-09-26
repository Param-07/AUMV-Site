import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./Pages/AboutSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
   <>
    < Navbar/>
    <HeroSection/>
    <AnnouncementBar/>
     <AboutSection/>
    <Footer/>
   </>
  );
}

export default App;

