import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./Pages/AboutSection";
import Facilities from "./pages/Facilities";
import Gallery from "./Pages/Gallery";
import Addmission from "./pages/Admission";
function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementBar />
      <AboutSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admission" element={<Addmission />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
