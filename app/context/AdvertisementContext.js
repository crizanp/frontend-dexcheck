import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Advertisement Context
const AdvertisementContext = createContext();

// Provider Component
export const AdvertisementProvider = ({ children }) => {
  const [advertisement, setAdvertisement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        const response = await axios.get(
          "https://dextools1jsseuer32das3.vercel.app/api/advertisements"
        );
        console.log("API Response:", response.data); // Debug API response
        const activeAd = response.data.find((ad) => ad.active === true);
        console.log("Active Advertisement:", activeAd); // Debug active ad

        if (activeAd) {
          setAdvertisement(activeAd);
        } else {
          console.warn("No active advertisement found.");
        }
      } catch (error) {
        console.error("Error fetching advertisement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisement();
  }, []);

  return (
    <AdvertisementContext.Provider value={{ advertisement, loading }}>
      {children}
    </AdvertisementContext.Provider>
  );
};

// Hook to use the Advertisement Context
export const useAdvertisement = () => {
  const context = useContext(AdvertisementContext);
  if (!context) {
    console.error(
      "useAdvertisement must be used within an AdvertisementProvider"
    );
  }
  return context;
};
