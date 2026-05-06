import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'production' ? '' : 'http://localhost:5000');

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add error handling interceptor
client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error.message);
    return Promise.reject(error);
  }
);

export const analyzeFace = (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  return client.post('/api/face/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const addWardrobeItem = (item) => {
  return client.post('/api/wardrobe/add', item);
};

export const getWardrobeItems = () => {
  return client.get('/api/wardrobe/items');
};

export const deleteWardrobeItem = (itemId) => {
  return client.delete(`/api/wardrobe/items/${itemId}`);
};

export const getWardrobeRecommendations = (faceData) => {
  return client.post('/api/wardrobe/recommendations', { faceData });
};

export const generateOutfits = (keepItems, occasion) => {
  return client.post('/api/recommendations/outfits', { keepItems, occasion });
};

export const getStatistics = (wardrobeItems, recommendations) => {
  return client.post('/api/recommendations/statistics', { wardrobeItems, recommendations });
};

export const tryOnCloth = (srcFileUrl, refFileUrl) => {
  return client.post('/api/cloth/try-on', { src_file_url: srcFileUrl, ref_file_url: refFileUrl });
};

export default client;

