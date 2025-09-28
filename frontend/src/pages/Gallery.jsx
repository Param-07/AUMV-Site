import React, { useEffect, useState } from "react";

const galleryData = [
  {
    title: "Cultural Fest",
    images: [
      { src: "/images/gallery1a.jpg", heading: "Dance Performance", description: "A glimpse of our cultural fest." },
      { src: "/images/gallery1b.jpg", heading: "Music Show", description: "Students performing classical music." },
      { src: "/images/gallery1c.jpg", heading: "Drama", description: "Annual play by class 10th students." },
      { src: "/images/gallery1d.jpg", heading: "Celebration", description: "Students enjoying the festival." }
    ]
  },
  {
    title: "Sports Day",
    images: [
      { src: "/images/gallery2a.jpg", heading: "Track Race", description: "100m race competition." },
      { src: "/images/gallery2b.jpg", heading: "Long Jump", description: "Sportsmanship in action." },
      { src: "/images/gallery2c.jpg", heading: "Relay Race", description: "Teamwork on the field." },
      { src: "/images/gallery2d.jpg", heading: "Victory", description: "Winners holding their medals." }
    ]
  },
  {
    title: "Science Exhibition",
    images: [
      { src: "/images/gallery3a.jpg", heading: "Robotics", description: "Students showcasing robotics projects." },
      { src: "/images/gallery3b.jpg", heading: "Models", description: "Creative science working models." },
      { src: "/images/gallery3c.jpg", heading: "Presentation", description: "Presenting innovations." },
      { src: "/images/gallery3d.jpg", heading: "Experiment", description: "Live experiment demonstrations." }
    ]
  },
  {
    title: "Annual Function",
    images: [
      { src: "/images/gallery4a.jpg", heading: "Chief Guest", description: "Our annual day chief guest speech." },
      { src: "/images/gallery4b.jpg", heading: "Awards", description: "Students receiving awards." },
      { src: "/images/gallery4c.jpg", heading: "Performance", description: "Dance drama on stage." },
      { src: "/images/gallery4d.jpg", heading: "Celebrations", description: "Stage celebrations at the end." }
    ]
  },
  {
    title: "Independence Day",
    images: [
      { src: "/images/gallery5a.jpg", heading: "Flag Hoisting", description: "Tricolor flag hoisting ceremony." },
      { src: "/images/gallery5b.jpg", heading: "Parade", description: "School parade by students." },
      { src: "/images/gallery5c.jpg", heading: "Patriotic Song", description: "Choir group performance." },
      { src: "/images/gallery5d.jpg", heading: "Celebration", description: "Cultural program celebrations." }
    ]
  },
  {
    title: "Workshops",
    images: [
      { src: "/images/gallery6a.jpg", heading: "Coding Workshop", description: "Students learning programming." },
      { src: "/images/gallery6b.jpg", heading: "Art Workshop", description: "Creative art workshop." },
      { src: "/images/gallery6c.jpg", heading: "Science Demo", description: "Hands-on learning." },
      { src: "/images/gallery6d.jpg", heading: "Discussion", description: "Interactive discussion session." }
    ]
  }
];

export default function Gallery() {
  const [activeModal, setActiveModal] = useState(null);
  const [currentSlides, setCurrentSlides] = useState({});

  // Slideshow effect
  useEffect(() => {
    const intervals = [];
    galleryData.forEach((gallery, idx) => {
      let i = 0;
      intervals.push(
        setInterval(() => {
          setCurrentSlides((prev) => ({
            ...prev,
            [idx]: prev[idx] !== undefined ? (prev[idx] + 1) % gallery.images.length : 1
          }));
        }, 3000)
      );
    });
    return () => intervals.forEach((id) => clearInterval(id));
  }, []);

  return (
    <section className="py-12">
      <h1 className="text-3xl font-bold text-center text-white drop-shadow mb-12">
        Our School Gallery
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
        {galleryData.map((gallery, idx) => (
          <div
            key={idx}
            className="relative h-72 rounded-lg overflow-hidden cursor-pointer group transform transition duration-500 hover:scale-110 hover:shadow-2xl"
            onClick={() => setActiveModal(idx)}
          >
            {/* Images Slideshow */}
            {gallery.images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.heading}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 blur-md ${
                  currentSlides[idx] === i ? "opacity-100 blur-0" : "opacity-0"
                }`}
              />
            ))}

            {/* Explosive Title */}
            <h2 className="explosive-text absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold text-white text-center drop-shadow transition-transform duration-500 group-hover:scale-150 group-hover:rotate-[360deg] group-hover:opacity-0">
              {gallery.title}
            </h2>

            {/* Radial Burst */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-transform duration-500 scale-150 group-hover:scale-[2] bg-[repeating-radial-gradient(circle_at_center,#f07c22_1px,transparent_2px,transparent_50px)]"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-transform duration-500 scale-150 group-hover:scale-[2] rotate-45 bg-[repeating-radial-gradient(circle_at_center,#4B2E83_1px,transparent_2px,transparent_50px)]"></div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModal !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-50">
          <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-lg relative p-6">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-3xl font-bold text-gray-700 hover:text-purple-700"
              onClick={() => setActiveModal(null)}
            >
              ×
            </button>

            {/* Modal Content */}
            <div className="flex flex-col gap-10">
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
                    <p>{img.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
