import { createContext, useContext, useState } from "react";

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  const [gallery, setGallery] = useState([]);
  const [videos, setVideos] = useState([]);
  const [hero, setHero] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const value = {
    gallery,
    setGallery,
    videos,
    setVideos,
    hero,
    setHero,
    facilities,
    setFacilities,
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
export default AppDataContext;
