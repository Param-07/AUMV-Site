import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./Pages/AboutSection";
import Facilities from "./pages/Facilities";
import Addmission from "./pages/Admission";
import Gallery from "./pages/Gallery";
import Login from "./components/common/Login";
import Dashboard from "./adminPages/Dashboard";
import AdminNavbar from "./components/common/AdminNavbar";
import Teachers from "./adminPages/Teachers";
import AdminGallery from "./adminPages/AdminGallery";
import EventsPage from "./adminPages/Events";
import VideoGallery from "./adminPages/VideoGallery";
import TopScholars from "./pages/TopScholor";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/common/LoadingScreen";
import SkeletonBlock from "./components/SkeletonBlock";
import { apiRequest } from "./utils/ApiCall";
import Achievers from "./adminPages/Achievers";

import { AppDataProvider, useAppData } from "./context/AppDataContext";
import AdminFacilities from "./adminPages/AdminFacilities";

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
        <Route path="/academics" element={<TopScholars />} />
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
        <Route path="achievers" element={<Achievers />} />
        <Route path="adminfacilities" element={<AdminFacilities />} />
      </Route>
    </Routes>
  );
}

function AppRouter() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const adminPaths = ["/dashboard", "/teachers", "/adminGallery", "/events", "/videos", "/achievers", "/adminfacilities"];
  const isAdminRoute = adminPaths.some((p) => location.pathname.startsWith(p));

  if (location.pathname === "/login") {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  }

  if (isAdminRoute && !token) return <Navigate to="/login" replace />;
  if (isAdminRoute) return <AdminLayout />;

  return <PublicLayout />;
}

function AppContent() {
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const { setGallery, setHero, setVideos, setFacilities} = useAppData();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [galleryRes, videosRes, facilitiesRes] = await Promise.all([
          apiRequest("GET", "/gallery/"),
          apiRequest("GET", "/videos/getVideos"),
          apiRequest("GET", "/facilities/"),
          // apiRequest("GET", "/gallery/"),
        ]);

        setGallery(galleryRes.images ?? []);
        setVideos(videosRes.videos ?? []);
        setHero(galleryRes.hero_images ?? []);
        setFacilities(facilitiesRes.facilities ?? []);

        setTimeout(() => {
          setLoadingScreen(false);
          setTimeout(() => setShowSkeleton(false), 900);
        }, 2000);

      } catch (error) {
        console.error("Preload error:", error);
        setLoadingScreen(false);
      }
    };

    loadData();
  }, []);

  if (loadingScreen) return <LoadingScreen />;

  return (
    <div className="animate-fadeIn">
      {showSkeleton ? (
        <div className="p-6 space-y-6">
          <SkeletonBlock height="h-64" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SkeletonBlock height="h-40" />
            <SkeletonBlock height="h-40" />
            <SkeletonBlock height="h-40" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonBlock key={i} height="h-32" />
            ))}
          </div>
        </div>
      ) : (
        <Router>
          <AppRouter />
        </Router>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppDataProvider>
      <AppContent />
    </AppDataProvider>
  );
}
