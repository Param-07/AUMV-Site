import React, { useEffect, useState, useRef } from "react";
import { useAppData } from "../context/AppDataContext";
import SmartImage from "../components/SmartImages";
import { Image as IconImage, GalleryVerticalEnd, Images, Film, Sparkles } from "lucide-react";


// helper for optimized img
const buildOptimizedUrl = (src, width) => {
  if (!src) return "";
  try {
    const url = new URL(src);
    if (width) url.searchParams.set("width", String(width));
    url.searchParams.set("quality", "80");
    url.searchParams.set("format", "webp");
    return url.toString();
  } catch {
    return src;
  }
};

export default function Gallery() {
  const { gallery, videos } = useAppData();

  const [activeModal, setActiveModal] = useState(null);
  const [currentSlides, setCurrentSlides] = useState({});
  const [mainVideo, setMainVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

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
  }, [gallery]);

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

  const availableCategories = ["All", ...(gallery?.map((g) => g.category) || [])];

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
    <div className="bg-gradient-to-b from-[#F4F1FF] via-[#F8F6FF] to-[#EFEAFF]">

      {/* VIDEO GALLERY */}
      <section className="py-14 bg-gradient-to-r from-purple-700 to-orange-500 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white mb-10 flex items-center justify-center gap-3 drop-shadow-lg">
          <Film className="h-9" /> Video Gallery
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
          <div className="lg:col-span-3 aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/40">
            {mainVideo ? (
              <video src={mainVideo} controls preload="metadata" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center text-white text-xl h-full">
                No Videos Available
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-2">
            {videos
              ?.filter((v) => v.video_url !== mainVideo)
              .map((v, i) => (
                <div
                  key={i}
                  onClick={() => setMainVideo(v.video_url)}
                  className="relative h-28 rounded-xl overflow-hidden cursor-pointer shadow-xl border-2 border-white/40 hover:border-white transition group"
                >
                  <video
                    src={v.video_url}
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300"
                  />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* TITLE DIVIDER */}
      <div className="flex justify-center my-12">
        <div className="flex items-center gap-3 text-purple-700 text-lg font-semibold">
          <Sparkles className="h-6" />
          Experience Moments at Alok Inter College
          <Sparkles className="h-6" />
        </div>
      </div>

      {/* IMAGE GALLERY */}
      <section className="py-14">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-10 flex items-center justify-center gap-3">
          <GalleryVerticalEnd className="h-8" /> Our School Gallery
        </h1>

        {/* Category Selector */}
        <div className="flex justify-center mb-10">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-3 bg-white border-2 border-purple-300 rounded-xl shadow text-purple-800 font-medium cursor-pointer hover:border-purple-500 transition"
          >
            {availableCategories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gallery?.map((group, idx) => {
            if (selectedCategory !== "All" && group.category !== selectedCategory) return null;

            if (selectedCategory === "All") {
              return (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl cursor-pointer transition hover:scale-105 bg-white"
                  onClick={() => {
                    setActiveModal(idx);
                    setCurrentSlides((prev) => ({ ...prev, modal: 0 }));
                    setZoom(1);
                    setOffset({ x: 0, y: 0 });
                  }}
                >
                  {group.images.map((img, i) => {
                    const url = buildOptimizedUrl(img.src, 1200);
                    return (
                      <img
                        key={i}
                        src={url}
                        alt={img.heading}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                          currentSlides[idx] === i ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    );
                  })}

                  <div className="absolute bottom-0 w-full bg-black/55 p-4 text-center text-white text-lg font-semibold flex justify-center items-center gap-2 backdrop-blur-sm">
                    <Images className="h-5" /> {group.category}
                  </div>
                </div>
              );
            }

            return (
              <React.Fragment key={idx}>
                {group.images.map((img, i) => (
                  <div
                    key={i}
                    className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl cursor-pointer hover:scale-[1.03] transition bg-white"
                    onClick={() => {
                      setActiveModal(idx);
                      setCurrentSlides((prev) => ({ ...prev, modal: i }));
                      setZoom(1);
                      setOffset({ x: 0, y: 0 });
                    }}
                  >
                    <SmartImage
                      src={img.src}
                      alt={img.heading}
                      width={900}
                      wrapperClassName="w-full h-full"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </div>
      </section>

      {/* MODAL */}
      {activeModal !== null && (
        <div
          className="fixed inset-0 bg-black/85 z-[200] flex items-center justify-center p-4"
          onMouseUp={handleMouseUp}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-orange-300"
            onClick={() => {
              setActiveModal(null);
              setZoom(1);
              setOffset({ x: 0, y: 0 });
            }}
          >
            ×
          </button>

          <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-6 space-y-10 shadow-2xl border border-purple-100">
            {gallery[activeModal].images.map(
              (img, i) =>
                currentSlides.modal === i && (
                  <div className="w-full" key={i}>
                    <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center flex justify-center items-center gap-2">
                      <IconImage className="h-7" /> {img.heading}
                    </h2>

                    <div
                      ref={dragRef}
                      onWheel={handleWheelZoom}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      className="mx-auto overflow-hidden rounded-xl shadow-lg bg-gray-200 border border-gray-300"
                      style={{ height: "65vh", cursor: zoom > 1 ? "grab" : "default" }}
                    >
                      <img
                        src={buildOptimizedUrl(img.src, 1600)}
                        alt={img.heading}
                        style={{
                          transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                          transition: isDragging.current ? "none" : "0.3s",
                        }}
                        className="w-full h-full object-contain select-none"
                        draggable={false}
                      />
                    </div>

                    <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto leading-relaxed">
                      {img.description}
                    </p>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
