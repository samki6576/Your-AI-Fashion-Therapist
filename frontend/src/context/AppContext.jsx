import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [faceData, setFaceData] = useState(() => {
    try {
      const saved = localStorage.getItem('faceData');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [wardrobeItems, setWardrobeItems] = useState(() => {
    try {
      const saved = localStorage.getItem('wardrobeItems');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [recommendations, setRecommendations] = useState(() => {
    try {
      const saved = localStorage.getItem('recommendations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [outfits, setOutfits] = useState(() => {
    try {
      const saved = localStorage.getItem('outfits');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [userImage, setUserImage] = useState(() => {
    return localStorage.getItem('userImage') || null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('faceData', JSON.stringify(faceData));
  }, [faceData]);

  useEffect(() => {
    localStorage.setItem('wardrobeItems', JSON.stringify(wardrobeItems));
  }, [wardrobeItems]);

  useEffect(() => {
    localStorage.setItem('recommendations', JSON.stringify(recommendations));
  }, [recommendations]);

  useEffect(() => {
    localStorage.setItem('outfits', JSON.stringify(outfits));
  }, [outfits]);

  useEffect(() => {
    if (userImage) {
      localStorage.setItem('userImage', userImage);
    } else {
      localStorage.removeItem('userImage');
    }
  }, [userImage]);

  const fetchWardrobeItems = useCallback(async () => {
    // No need to fetch, already loaded from localStorage
    setIsLoading(false);
  }, []);

  const updateFaceData = useCallback((data) => {
    setFaceData(data);
    setError(null);
  }, []);

  const addWardrobeItem = useCallback((item) => {
    setWardrobeItems(prev => [...prev, item]);
  }, []);

  const removeWardrobeItem = useCallback((itemId) => {
    setWardrobeItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  const updateRecommendations = useCallback((recs) => {
    setRecommendations(recs);
  }, []);

  const updateOutfits = useCallback((newOutfits) => {
    setOutfits(newOutfits);
  }, []);

  const setErrorMessage = useCallback((message) => {
    setError(message);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetApp = useCallback(() => {
    setFaceData(null);
    setWardrobeItems([]);
    setRecommendations([]);
    setOutfits([]);
    setUserImage(null);
    setError(null);
    // Clear localStorage
    localStorage.removeItem('faceData');
    localStorage.removeItem('wardrobeItems');
    localStorage.removeItem('recommendations');
    localStorage.removeItem('outfits');
    localStorage.removeItem('userImage');
  }, []);

  const value = {
    // State
    faceData,
    wardrobeItems,
    recommendations,
    outfits,
    userImage,
    isLoading,
    error,
    // Actions
    updateFaceData,
    setUserImage,
    addWardrobeItem,
    removeWardrobeItem,
    updateRecommendations,
    updateOutfits,
    setErrorMessage,
    clearError,
    setIsLoading,
    resetApp,
    fetchWardrobeItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
