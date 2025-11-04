import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./Pages/AboutSection";
import Facilities from "./pages/Facilities";
import Gallery from "./pages/Gallery";
import Addmission from "./pages/Admission";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminNavbar from "./components/AdminNavbar";
import Teachers from "./pages/Teachers"
import AdminGallery from "./pages/AdminGallery";


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
  const isLoggedIn = localStorage.getItem('token');

  return (
    <>
      {!hideNav && !isLoggedIn && <Navbar />}
      {!hideNav && isLoggedIn && <AdminNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admission" element={<Addmission />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/videos" element={<AdminGallery />} />
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
