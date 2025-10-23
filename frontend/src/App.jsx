import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./Pages/AboutSection";
import Facilities from "./pages/Facilities";
import Gallery from "./Pages/Gallery";
import Addmission from "./pages/Admission";
import Login from "./pages/Login";
function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementBar />
      <AboutSection />
    </>
  );
}

function LoginShowed() {
  const location = useLocation();
  const hideNav = location.pathname === "/login";

  return (
    <>
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admission" element={<Addmission />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideNav && <Footer />}
    </>
  );
}
export default function App() {
  return (
    <Router>
      <LoginShowed />
    </Router>
  );
}
