import { HashRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AnnouncementBar from "./components/AnnouncementBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./pages/AboutSection";
import Facilities from "./components/facilities/Facilities";
import Addmission from "./components/admission/Admission";
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
import LegacySection from "./components/LegacySection";
import useScrollToTop from "./hooks/useScrollToTop";

import { AppDataProvider, useAppData } from "./context/AppDataContext";
import AdminFacilities from "./adminPages/AdminFacilities";
import Academics from "./components/academics/Academics";
import MainPageManager from "./adminPages/MainPageManager";
import LeadershipSection from "./components/LeadershipSection";
import RecentHighlights from "./components/RecentHighlights";
import CTASection from "./components/CTASection";
import AdmissionForm from "./components/admission/AdmissionForm";
import CampusVisitForm from "./components/admission/CampusVisitForm";
import AcademicResults from "./components/academicResults/AcademicResults";
import StudentLife from "./components/studentLife/StudentLife";
import Contact from "./components/contact/Contact";
import ScrollToTopButton from "./components/common/scrollToTopButton";

function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementBar />
      <LegacySection />
      <LeadershipSection />
      {/* <RecentHighlights /> */}
      <CTASection />
      {/* <AboutSection /> */}
    </>
  );
}

// 1. Layout components now use <Outlet /> to render child matches
function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> 
      <Footer />
    </>
  );
}

// 2. Route Protection wrapper component
function ProtectedAdminElement({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function AppRouter() {
  return (
    <Routes>
      {/* Public Facing Routes Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/facilities/:facilityId?" element={<Facilities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admission" element={<Addmission />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admission-form" element={<AdmissionForm />} />
        <Route path="/campus-visit" element={<CampusVisitForm />} />
        <Route path="/academic-results/:classId" element={<AcademicResults />} />
        <Route path="/student-life" element={<StudentLife />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Standalone Route for Login (No Header or Footer) */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes Layout */}
      <Route 
        element={
          <ProtectedAdminElement>
            <AdminNavbar />
          </ProtectedAdminElement>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mainpage" element={<MainPageManager />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/adminGallery" element={<AdminGallery />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/videos" element={<VideoGallery />} />
        <Route path="/achievers" element={<Achievers />} />
        <Route path="/adminfacilities" element={<AdminFacilities />} />
      </Route>

      {/* Fallback Catch-All Redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppContent() {
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const { setGallery, setHero, setVideos, setFacilities } = useAppData();
  const location = useLocation();

  useScrollToTop();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/adminLogin") {
      setTimeout(() => {
        setLoadingScreen(false);
        setTimeout(() => setShowSkeleton(false), 450);
      }, 250);
      setShowSkeleton(false);
      return;
    }

    const loadData = async () => {
      try {
        const [galleryRes, videosRes, facilitiesRes] = await Promise.all([
          apiRequest("GET", "/gallery/"),
          apiRequest("GET", "/videos/getVideos"),
          apiRequest("GET", "/facilities/"),
        ]);

        setGallery(galleryRes.images.get_gallery_grouped ?? []);
        setVideos(videosRes.videos ?? []);
        setHero(galleryRes.hero_images ?? []);
        setFacilities(facilitiesRes.facilities.get_facilities_grouped ?? []);
        
        setTimeout(() => {
          setLoadingScreen(false);
          setTimeout(() => setShowSkeleton(false), 250);
        }, 250);

      } catch (error) {
        console.error("Preload error:", error);
        setLoadingScreen(false);
      }
    };

    loadData();
  }, [location.pathname]);

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
        <AppRouter />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppDataProvider>
        <AppContent />
        <ScrollToTopButton />
      </AppDataProvider>
    </Router>
  );
}