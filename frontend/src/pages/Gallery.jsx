import React, { useEffect, useState, useRef } from "react";
import { useAppData } from "../context/AppDataContext";
import SmartImage from "../components/SmartImages";
import useScrollToTop from "../hooks/useScrollToTop";
import { Image as IconImage, GalleryVerticalEnd, Images, Film, Sparkles } from "lucide-react";
import GalleryHero from "../components/gallery/GalleryHero";
import CinematicGallery from "../components/gallery/CinematicGallery";
import AcademicGallery from "../components/gallery/AcademicGallery";
import CulturalGallery from "../components/gallery/CulturalGallery";
import SportsGallery from "../components/gallery/SportsGallery";
import GalleryNewsletter from "../components/gallery/GalleryNewsletter";

export default function Gallery() {
  const { gallery, videos } = useAppData();
  useScrollToTop();

  const [filteredGallery, setFilteredgallery] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [currentSlides, setCurrentSlides] = useState({});
  const [mainVideo, setMainVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const [mediaType, setMediaType] = useState("all");

  const categories =
  gallery
    ?.filter(
      (g) =>
        g.category !== "Student Life" &&
        g.category !== "Student Life Gallery"
    )
    .map((g) => g.category) || [];

  /* VIDEO INIT */
  useEffect(() => {
    if (videos?.length > 0) setMainVideo(videos[0].video_url);
  }, [videos]);

  /* AUTO SLIDES ON CARDS */
  useEffect(() => {
    if (!gallery || gallery.length === 0) return;
    const timers = gallery.map((group, idx) =>
      setInterval(() => {
        setCurrentSlides((prev) => {
          const cur = prev[idx] ?? 0;
          const next = (cur + 1) % group.images.length;
          return { ...prev, [idx]: next };
        });
      }, 3500)
    );
    return () => timers.forEach(clearInterval);
  }, [filteredGallery]);

  useEffect(() =>{
    setFilteredgallery(gallery
    ?.filter(
      (g) =>
        g.category !== "Student Life" &&
        g.category !== "Student Life Gallery"
    ) || []);
  }, [gallery])

  /* MODAL SLIDESHOW */
  useEffect(() => {
    if (activeModal === null) return;
    const timer = setInterval(() => {
      setCurrentSlides((prev) => {
        const cur = prev.modal ?? 0;
        const next = (cur + 1) % gallery[activeModal].images.length;
        return { ...prev, modal: next };
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [activeModal, gallery]);

  /* LOCK SCROLL ON MODAL */
  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";
  }, [activeModal]);

  /* ZOOM + DRAG */
  const handleWheelZoom = (e) => {
    e.preventDefault();
    setZoom((prev) =>
      Math.min(3, Math.max(1, prev + (e.deltaY > 0 ? -0.2 : 0.2)))
    );
  };
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startPos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setOffset({ x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y });
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <>
    <GalleryHero
  mediaType={mediaType}
  setMediaType={setMediaType}
  categories={categories}
  selectedCategory={selectedCategory}
  setSelectedCategory={setSelectedCategory}
/>
<CinematicGallery
  gallery={filteredGallery}
  currentSlides={currentSlides}
  setActiveModal={setActiveModal}
  setCurrentSlides={setCurrentSlides}
  setZoom={setZoom}
  setOffset={setOffset}
/>
<AcademicGallery
  gallery={filteredGallery}
  selectedCategory={selectedCategory}
  currentSlides={currentSlides}
  setActiveModal={setActiveModal}
  setCurrentSlides={setCurrentSlides}
  setZoom={setZoom}
  setOffset={setOffset}
/>
<CulturalGallery
  gallery={filteredGallery}
  currentSlides={currentSlides}
  setActiveModal={setActiveModal}
  setCurrentSlides={setCurrentSlides}
  setZoom={setZoom}
  setOffset={setOffset}
/>
<SportsGallery
  gallery={filteredGallery}
  currentSlides={currentSlides}
  setActiveModal={setActiveModal}
  setCurrentSlides={setCurrentSlides}
  setZoom={setZoom}
  setOffset={setOffset}
/>
<GalleryNewsletter />
    </>
  );
}
