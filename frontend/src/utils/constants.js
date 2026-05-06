export const COLORS = {
  warm: ['warm red', 'golden yellow', 'burnt orange', 'chocolate brown', 'cream', 'rust', 'terracotta', 'olive'],
  cool: ['cool pink', 'icy blue', 'cool purple', 'silver', 'gray-blue', 'jewel tones', 'dusty rose'],
  neutral: ['black', 'white', 'gray', 'beige', 'navy', 'tan', 'off-white']
};

export const FACE_SHAPES = ['oval', 'round', 'square', 'heart', 'oblong'];

export const SKIN_TONES = ['warm', 'cool', 'neutral'];

export const CONTRAST_LEVELS = ['high', 'medium', 'low'];

export const CLOTHING_CATEGORIES = [
  'top',
  'bottom',
  'dress',
  'jacket',
  'shoes',
  'accessories',
  'outwear'
];

export const CLOTHING_STYLES = [
  'casual',
  'formal',
  'business',
  'athletic',
  'bohemian',
  'vintage',
  'minimalist',
  'edgy'
];

export const ITEM_CONDITIONS = [
  'excellent',
  'good',
  'fair',
  'worn'
];

export const OCCASIONS = [
  'casual',
  'work',
  'date',
  'party',
  'weekend',
  'formal'
];

export const RECOMMENDATION_CATEGORIES = {
  keep: { label: 'Keep', color: '#10B981', icon: '✓' },
  donate: { label: 'Donate', color: '#3B82F6', icon: '→' },
  sell: { label: 'Sell', color: '#F59E0B', icon: '$' }
};

export const FACE_SHAPE_STYLES = {
  oval: {
    styles: ['tailored', 'fitted', 'flowing', 'structured'],
    necklines: ['V-neck', 'scoop neck', 'boat neck']
  },
  round: {
    styles: ['structured', 'tailored', 'angular'],
    necklines: ['V-neck', 'deep V-neck', 'mock neck']
  },
  square: {
    styles: ['soft', 'flowing', 'draped'],
    necklines: ['round neck', 'boat neck', 'halter']
  },
  heart: {
    styles: ['fitted', 'peplum', 'A-line'],
    necklines: ['V-neck', 'empire waist', 'off-shoulder']
  },
  oblong: {
    styles: ['cropped', 'peplum', 'gathered'],
    necklines: ['boat neck', 'bateau', 'wide scoop']
  }
};
