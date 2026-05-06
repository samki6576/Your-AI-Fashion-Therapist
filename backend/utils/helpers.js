export const generateUniqueId = () => {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateColor = (color) => {
  const validColors = [
    'warm red', 'golden yellow', 'burnt orange', 'chocolate brown', 'cream', 'rust', 'terracotta', 'olive',
    'cool pink', 'icy blue', 'cool purple', 'silver', 'gray-blue', 'jewel tones', 'dusty rose',
    'black', 'white', 'gray', 'beige', 'navy', 'tan', 'off-white'
  ];
  return validColors.includes(color.toLowerCase());
};

export const logRequest = (req) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
};
