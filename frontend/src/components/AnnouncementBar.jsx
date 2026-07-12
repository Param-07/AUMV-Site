import React, { useEffect, useState } from "react";
import { X, Megaphone, ChevronDown } from "lucide-react";
import { apiRequest } from "../utils/ApiCall";

const AnnouncementBar = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await apiRequest("GET", "/events/");
        const events = res?.events || [];

        // Filter events that are still valid (valid_till >= today)
        const today = new Date();
        const validEvents = events.filter((ev) => {
          if (!ev.valid_till) return false;
          return new Date(ev.valid_till) >= today;
        });

        setAnnouncements(validEvents);
      } catch (err) {
        console.error("Announcements fetch failed");
      }
    };

    fetchAnnouncements();
  }, []);

  if (!announcements.length) return null;

  // FIX: Combined title and description, dropped the valid_till dates completely
  const fullText = announcements
    .map((ev) => {
      const heading = ev.title;
      const desc = ev.description ? `: ${ev.description}` : "";
      return `${heading}${desc}`;
    })
    .join("   |   ");

  return (
    <>
      {/* Collapsed Button */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="fixed top-0 left-1/2 -translate-x-1/2 z-40 bg-indigo-700 text-white px-4 py-2 rounded-b-xl flex items-center gap-2 shadow-md hover:bg-indigo-800 transition"
        >
          <ChevronDown size={18} /> Announcements
        </button>
      )}

      {/* Announcements Bar */}
      {isVisible && (
        <div
          className={`bg-indigo-50 border-b border-indigo-200 py-3 transition-all duration-500 ${
            isCollapsed ? "h-[52px] overflow-hidden" : "h-auto"
          }`}
        >
          {/* Marquee animation containing the hover state handler rule */}
          <style>
            {`
              @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
              /* FIX: Pauses the marquee running animation loop on text container hover */
              .marquee-track:hover {
                animation-play-state: paused !important;
                cursor: pointer;
              }
            `}
          </style>

          <div className="max-w-7xl mx-auto px-4 flex items-center gap-4 overflow-hidden">
            <Megaphone className="text-indigo-700 flex-shrink-0" size={24} />

            <div className="w-full overflow-hidden">
              {/* FIX: Appended 'marquee-track' key class to catch the hover pause style rule */}
              <p className="marquee-track whitespace-nowrap inline-block animate-[marquee_30s_linear_infinite] font-medium text-indigo-900">
                {fullText}
              </p>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="ml-2 p-1 rounded-md text-indigo-800 hover:bg-indigo-200 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnouncementBar;