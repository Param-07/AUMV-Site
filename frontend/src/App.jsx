import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./Pages/AboutSection";
import Facilities from "./pages/Facilities";
import Addmission from "./pages/Admission";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminNavbar from "./components/AdminNavbar";
import Teachers from "./pages/Teachers";
import AdminGallery from "./pages/AdminGallery";
import EventsPage from "./pages/Events";
import VideoGallery from "./pages/VideoGallery";
// import LoadingScreen from "./components/LoadingScreen";

function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementBar />
      <AboutSection />
    </>
  );
}
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admission" element={<Addmission />} />
      </Routes>
      <Footer />
    </>
  );
}


function AdminLayout() {
  return (
    <Routes>
      <Route path="/" element={<AdminNavbar />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="adminGallery" element={<AdminGallery />} />
        <Route path="events" element={<EventsPage />} /> 
        <Route path="videos" element={<VideoGallery />} />
      </Route>
    </Routes>
  );
}
function AppRouter() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const isAdminRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/teachers") ||
    location.pathname.startsWith("/adminGallery") ||
    location.pathname.startsWith("/events") ||
    location.pathname.startsWith("/videos");
  if (location.pathname === "/login") {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  if (isAdminRoute && !token) {
    return <Navigate to="/login" replace />;
  }

  if (isAdminRoute) {
    return <AdminLayout />;
  }
  return <PublicLayout />;
}

export default function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}
