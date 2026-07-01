import React, { useEffect, useState, useRef } from "react";
import { useAppData } from "../context/AppDataContext";
import SmartImage from "../components/SmartImages";
import useScrollToTop from "../hooks/useScrollToTop";
import { Image as IconImage, GalleryVerticalEnd, Images, Film, Sparkles } from "lucide-react";


export default function Gallery() {
  const { gallery, videos } = useAppData();
  useScrollToTop();

  const [activeModal, setActiveModal] = useState(null);
  const [currentSlides, setCurrentSlides] = useState({});
  const [mainVideo, setMainVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterClass, setFilterClass] = useState(null); 

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

   useEffect(() => {
    const hash = location.hash;
    
    if (hash === "#/gallery#video-gallery") {
      setFilterClass("video");
    } else {
      setFilterClass("photo");
    }
  }, [location.hash]);

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
    <div className="bg-gradient-to-b from-[#F4F1FF] via-[#F8F6FF] to-[#EFEAFF]" style={{ marginTop: "95px" }}>

      {filterClass === "video" ? (
  /* VIDEO GALLERY */
        <section id="video-gallery" className="py-14">
  <div className="max-w-7xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold text-purple-800 flex items-center justify-center gap-3">
        <Film className="h-9 w-9" />
        Video Gallery
      </h1>
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
        Explore memorable moments, annual functions, sports events, cultural
        programs, and other activities through our video collection.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

      {/* Main Video */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
        <div className="aspect-video bg-slate-100">
          {mainVideo ? (
            <video
              src={mainVideo}
              controls
              preload="metadata"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-500 text-lg">
              No Videos Available
            </div>
          )}
        </div>
      </div>

      {/* Video List */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          More Videos
        </h3>

        <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
          {videos
            ?.filter((v) => v.video_url !== mainVideo)
            .map((v, i) => (
              <div
                key={i}
                onClick={() => setMainVideo(v.video_url)}
                className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-video bg-slate-100">
                  <video
                    src={v.video_url}
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {v.title || `Video ${i + 1}`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  </div>
</section>
      ) : (
        /* IMAGE GALLERY */
        <section id="photo-gallery" className="py-14">
          <h1 className="text-4xl font-bold text-center text-purple-800 mb-10 flex items-center justify-center gap-3">
            <GalleryVerticalEnd className="h-8" /> Our School Gallery
          </h1>

          <div className="flex justify-center mb-10">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-3 bg-white border-2 border-purple-300 rounded-xl shadow text-purple-800 font-medium cursor-pointer hover:border-purple-500 transition"
            >
              {availableCategories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {gallery?.map((group, idx) => {
              if (
                selectedCategory !== "All" &&
                group.category !== selectedCategory
              )
                return null;

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
                    {group.images.map((img, i) => (
                      <div
                        key={i}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                          currentSlides[idx] === i ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <SmartImage
                          src={img.src}
                          alt={img.heading}
                          width={1200}
                          wrapperClassName="w-full h-full"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}

                    <div className="absolute bottom-0 w-full bg-black/55 p-4 text-center text-white text-lg font-semibold flex justify-center items-center gap-2 backdrop-blur-sm">
                      <Images className="h-5" />
                      {group.category}
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
      )}

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
                      <SmartImage
                        src={img.src}
                        alt={img.heading}
                        width={1600}
                        wrapperClassName="w-full h-full"
                        className="w-full h-full object-contain select-none"
                        style={{
                          transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                          transition: isDragging.current ? "none" : "0.3s",
                          pointerEvents: "none",
                        }}
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
