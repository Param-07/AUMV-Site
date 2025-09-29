import React, { useEffect, useState } from "react";

const galleryData = [
  {
    title: "Cultural Events",
    images: [
      { src: "/images/gallery1a.jpg", heading: "Dance Performance", description:"A dance performance is a captivating blend of movement, rhythm, and expression, where dancers use their bodies to convey stories, emotions, and cultural heritage. Through carefully choreographed sequences, performers synchronize steps, gestures, and facial expressions to music, creating a visually stunnin" },
      { src: "/images/gallery1b.jpg", heading: "Music Show", description:"" },
      { src: "/images/gallery1c.jpg", heading: "Drama", description:"" },
      { src: "/images/gallery1d.jpg", heading: "Celebration", description:"" }
    ]
  },
  {
    title: "Sports",
    images: [
      { src: "/images/gallery2a.jpg", heading: "Track Race", description:"" },
      { src: "/images/gallery2b.jpg", heading: "Long Jump", description:"" },
      { src: "/images/gallery2c.jpg", heading: "Relay Race", description:"" },
      { src: "/images/gallery2d.jpg", heading: "Victory", description:"" }
    ]
  },
  {
    title: "Class Gallery",
    images: [
      { src: "/images/gallery3a.jpg", heading: "Robotics", description:"" },
      { src: "/images/gallery3b.jpg", heading: "Models", description:"" },
      { src: "/images/gallery3c.jpg", heading: "Presentation", description:"" },
      { src: "/images/gallery3d.jpg", heading: "Experiment", description:"" }
    ]
  },
  {
    title: "Annual Function",
    images: [
      { src: "/images/gallery4a.jpg", heading: "Chief Guest", description:"" },
      { src: "/images/gallery4b.jpg", heading: "Awards", description:"" },
      { src: "/images/gallery4c.jpg", heading: "Performance", description:"" },
      { src: "/images/gallery4d.jpg", heading: "Celebrations", description:"" }
    ]
  },
  {
    title: "Acheivers",
    images: [
      { src: "/images/gallery5a.jpg", heading: "Flag Hoisting", description:"" },
      { src: "/images/gallery5b.jpg", heading: "Parade", description:"" },
      { src: "/images/gallery5c.jpg", heading: "Patriotic Song", description:"" },
      { src: "/images/gallery5d.jpg", heading: "Celebration", description:"" }
    ]
  },
  {
    title: "Teachers",
    images: [
      { src: "/images/gallery6a.jpg", heading: "Coding Workshop", description:"" },
      { src: "/images/gallery6b.jpg", heading: "Art Workshop", description:"" },
      { src: "/images/gallery6c.jpg", heading: "Science Demo", description:"" },
      { src: "/images/gallery6d.jpg", heading: "Discussion", description:"" }
    ]
  }
];

export default function Gallery() {
  const [activeModal, setActiveModal] = useState(null);
  const [currentSlides, setCurrentSlides] = useState({});
  const [mainVideo, setMainVideo] = useState("/videos/school-event.mp4");

  useEffect(() => {
    const intervals = [];
    galleryData.forEach((gallery, idx) => {
      intervals.push(
        setInterval(() => {
          setCurrentSlides((prev) => ({
            ...prev,
            [idx]:
              prev[idx] !== undefined
                ? (prev[idx] + 1) % gallery.images.length
                : 1,
          }));
        }, 3000)
      );
    });
    return () => intervals.forEach((id) => clearInterval(id));
  }, []);

  return (
    <div >
    
      <section id="video-gallery"
        className="py-5 bg-gradient-to-r from-purple-700 to-orange-500"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white drop-shadow mb-10"  >
          Video Gallery
        </h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
          <div className="lg:col-span-3 w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/30">
            <video
              src={mainVideo}
              controls
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            {[
              { src: "/videos/thumb1.jpg", video: "/videos/annual.mp4" },
              { src: "/videos/thumb2.jpg", video: "/videos/sports.mp4" },
              { src: "/videos/thumb3.jpg", video: "/videos/science.mp4" }
            ].map((vid, i) => (
              <div
                key={i}
                onClick={() => setMainVideo(vid.video)}
                className="w-full h-28 rounded-lg overflow-hidden shadow-md cursor-pointer transform transition hover:scale-[1.03] hover:shadow-xl"
              >
                <img
                  src={vid.src}
                  alt="video thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-purple-900 to-black" id="photo-gallery">
        <h1 className="text-3xl font-bold text-center text-white drop-shadow mb-12" >
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
              <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white text-center drop-shadow transition-transform duration-500 group-hover:scale-125 group-hover:rotate-[360deg] group-hover:opacity-0">
                {gallery.title}
              </h2>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition duration-500 bg-[repeating-radial-gradient(circle_at_center,#f07c22_1px,transparent_2px,transparent_50px)]"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition duration-500 rotate-45 bg-[repeating-radial-gradient(circle_at_center,#4B2E83_1px,transparent_2px,transparent_50px)]"></div>
            </div>
          ))}
        </div>

        {activeModal !== null && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50 p-4">
            <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg relative p-6">
              <button
                className="absolute top-4 right-4 text-3xl font-bold text-gray-700 hover:text-purple-700"
                onClick={() => setActiveModal(null)}
              >
                ×
              </button>
              <div className="flex flex-col gap-5 bg-gradient-to-r from-purple-700 to-orange-500 p-8">
                {galleryData[activeModal].images.map((img, i) => (
                  <div
                    key={i}
                    className={`flex flex-col md:flex-row ${
                      i % 2 === 1 ? "md:flex-row-reverse" : ""
                    } items-center gap-6 bg-white/80 rounded-xl shadow p-6`}
                  >
                    <img
                      src={img.src}
                      alt={img.heading}
                      className="w-full md:w-1/2 rounded-lg shadow"
                    />
                    <div className="md:w-1/2 text-gray-800">
                      <h3 className="text-xl font-bold text-orange-600 mb-2">
                        {img.heading}
                      </h3>
                      <span>{img.description}</span>
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
