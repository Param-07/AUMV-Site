import React, { useEffect, useState } from "react";
import { apiRequest } from "../utils/ApiCall";

export default function Gallery() {
  const [activeModal, setActiveModal] = useState(null);
  const [currentSlides, setCurrentSlides] = useState({});
  const [galleryData, setGalleryData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [mainVideo, setMainVideo] = useState(null);

  // Preload images
  const preloadImages = (images) => {
    images.forEach((gallery) => {
      gallery.images.forEach((img) => {
        const image = new Image();
        image.src = img.src;
      });
    });
  };

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await apiRequest("GET", "/gallery");
        const videoRes = await apiRequest("GET","/getVideos");

        if (response.message === "success") {
          setGalleryData(response.images);
          preloadImages(response.images);
        }

        if (videoRes.message === "success") {
          setVideoData(videoRes.videos);
          if (videoRes.videos.length > 0) setMainVideo(videoRes.videos[0].video_url);
        }

      } catch (error) {
        console.error("Error loading:", error);
      }
    };
    fetchGallery();
  }, []);

  // Image slideshow
  useEffect(() => {
    if (galleryData.length === 0) return;

    const intervals = galleryData.map((gallery, idx) =>
      setInterval(() => {
        setCurrentSlides((prev) => {
          const currentIndex = prev[idx] ?? 0;
          const nextIndex = (currentIndex + 1) % gallery.images.length;
          return { ...prev, [idx]: nextIndex };
        });
      }, 3000)
    );

    return () => intervals.forEach((id) => clearInterval(id));
  }, [galleryData]);

  return (
    <div>

      {/* VIDEO GALLERY */}
      <section className="py-5 bg-gradient-to-r from-purple-700 to-orange-500">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white drop-shadow mb-10">
          Video Gallery
        </h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">

          {/* MAIN VIDEO */}
          <div className="lg:col-span-3 w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/30">
            {mainVideo ? (
              <video
                src={mainVideo}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-xl">
                No Videos Available
              </div>
            )}
          </div>

          {/* VIDEO PREVIEW TILES */}
<div className="flex flex-col gap-6">
  {videoData
    .filter((vid) => vid.video_url !== mainVideo) // Hide active video
    .map((vid, i) => (
      <div
        key={i}
        onClick={() => setMainVideo(vid.video_url)}
        className="relative w-full h-28 rounded-xl overflow-hidden shadow-lg border-2 border-white/40 hover:border-white transition cursor-pointer group"
      >
        <video
          src={vid.video_url}
          muted
          preload="metadata"
          playsInline
          className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-300"
        />

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white drop-shadow-xl"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    ))}
</div>


        </div>
      </section>

      {/* IMAGE GALLERY */}
      <section className="py-12 bg-gradient-to-r from-purple-900 to-black">
        <h1 className="text-3xl font-bold text-center text-white drop-shadow mb-12">
          Our School Gallery
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {galleryData.map((gallery, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group transform transition duration-500 hover:scale-105 hover:shadow-2xl"
              onClick={() => setActiveModal(idx)}
            >
              {gallery.images.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.heading}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    currentSlides[idx] === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 text-center">
                <h2 className="text-xl font-semibold text-white">
                  {gallery.category}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {activeModal !== null && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50 p-4">
            <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg relative p-6">

              <button
                className="absolute top-4 right-4 text-3xl font-bold text-gray-700 hover:text-purple-700"
                onClick={() => setActiveModal(null)}
              >
                ×
              </button>

              <div className="flex flex-col gap-6 bg-gradient-to-r from-purple-700 to-orange-500 p-8 rounded-lg">
                {galleryData[activeModal].images.map((img, i) => (
                  <div
                    key={i}
                    className={`flex flex-col md:flex-row ${
                      i % 2 === 1 ? "md:flex-row-reverse" : ""
                    } items-center gap-8 bg-white/90 rounded-xl shadow-lg p-6`}
                  >
                    <div className="w-full md:w-1/2 flex justify-center">
                      <div className="w-full aspect-[4/3] overflow-hidden rounded-lg shadow">
                        <img
                          src={img.src}
                          alt={img.heading}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </div>

                    <div className="w-full md:w-1/2 text-gray-800">
                      <h3 className="text-2xl font-bold text-orange-600 mb-3 text-center md:text-left">
                        {img.heading}
                      </h3>
                      <p className="text-base leading-relaxed text-justify">
                        {img.description || "No description available."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </section>

    </div>
  );
}
