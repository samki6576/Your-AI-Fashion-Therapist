// Color database
const COLOR_DATABASE = {
  warm: ['warm red', 'golden yellow', 'burnt orange', 'chocolate brown', 'cream', 'rust', 'terracotta', 'olive'],
  cool: ['cool pink', 'icy blue', 'cool purple', 'silver', 'gray-blue', 'jewel tones', 'dusty rose'],
  neutral: ['black', 'white', 'gray', 'beige', 'navy', 'tan', 'off-white']
};

// Face shape style recommendations
const FACE_SHAPE_STYLES = {
  oval: {
    recommended_styles: ['tailored', 'fitted', 'flowing', 'structured'],
    necklines: ['V-neck', 'scoop neck', 'boat neck'],
    patterns: ['subtle patterns', 'horizontal stripes', 'color blocking']
  },
  round: {
    recommended_styles: ['structured', 'tailored', 'angular'],
    necklines: ['V-neck', 'deep V-neck', 'mock neck'],
    patterns: ['vertical stripes', 'minimal patterns']
  },
  square: {
    recommended_styles: ['soft', 'flowing', 'draped'],
    necklines: ['round neck', 'boat neck', 'halter'],
    patterns: ['curved patterns', 'floral', 'soft patterns']
  },
  heart: {
    recommended_styles: ['fitted', 'peplum', 'A-line'],
    necklines: ['V-neck', 'empire waist', 'off-shoulder'],
    patterns: ['lower body patterns', 'bottom-heavy designs']
  },
  oblong: {
    recommended_styles: ['cropped', 'peplum', 'gathered'],
    necklines: ['boat neck', 'bateau', 'wide scoop'],
    patterns: ['horizontal stripes', 'ruffles']
  }
};

export const analyzeWardrobeItem = (item, faceData) => {
  let confidence = 0;
  let recommendation = 'donate';
  const reasoning = [];

  // 1. Color matching (90% weight if match)
  if (faceData.recommended_colors && faceData.recommended_colors.length > 0) {
    const itemColor = item.color.toLowerCase();
    const matchesColor = faceData.recommended_colors.some(color => 
      itemColor.includes(color.toLowerCase()) || color.toLowerCase().includes(itemColor)
    );

    if (matchesColor) {
      confidence += 90;
      recommendation = 'keep';
      reasoning.push('Color matches your color palette');
    }
  }

  // 2. Color avoidance (85% weight if should avoid)
  if (faceData.colors_to_avoid && faceData.colors_to_avoid.length > 0) {
    const itemColor = item.color.toLowerCase();
    const shouldAvoid = faceData.colors_to_avoid.some(color => 
      itemColor.includes(color.toLowerCase()) || color.toLowerCase().includes(itemColor)
    );

    if (shouldAvoid) {
      confidence = 85;
      recommendation = 'donate';
      reasoning.push('This color is not flattering for your complexion');
    }
  }

  // 3. Style matching based on face shape (75% weight)
  if (faceData.face_shape && FACE_SHAPE_STYLES[faceData.face_shape]) {
    const styles = FACE_SHAPE_STYLES[faceData.face_shape].recommended_styles;
    const itemStyle = item.style.toLowerCase();
    
    const matchesStyle = styles.some(style => 
      itemStyle.includes(style.toLowerCase()) || style.toLowerCase().includes(itemStyle)
    );

    if (matchesStyle && confidence < 75) {
      confidence = Math.max(confidence, 75);
      recommendation = 'keep';
      reasoning.push(`${item.style} style flatters your ${faceData.face_shape} face shape`);
    }
  }

  // 4. Condition and brand (70% weight for selling)
  if (item.condition === 'excellent' && item.brand && item.brand.trim().length > 0) {
    const knownBrands = ['prada', 'gucci', 'dior', 'chanel', 'louis vuitton', 'hermes', 'burberry', 'versace'];
    const isKnownBrand = knownBrands.some(brand => item.brand.toLowerCase().includes(brand));

    if (isKnownBrand && confidence < 70) {
      confidence = 70;
      recommendation = 'sell';
      reasoning.push(`${item.brand} in excellent condition - resale value`);
    }
  }

  // 5. Default if no strong match
  if (confidence < 60) {
    confidence = 60;
    recommendation = 'donate';
    reasoning.push('Consider donating this item');
  }

  return {
    recommendation,
    confidence: Math.min(confidence, 100),
    reasoning: reasoning.length > 0 ? reasoning : ['Processed with wardrobe AI analysis']
  };
};

export const generateOutfitCombinations = (keepItems, occasion = 'casual') => {
  if (keepItems.length === 0) {
    return [];
  }

  const outfits = [];
  const maxOutfits = Math.min(5, Math.floor(keepItems.length / 2));

  for (let i = 0; i < maxOutfits; i++) {
    const randomIdx1 = Math.floor(Math.random() * keepItems.length);
    let randomIdx2 = Math.floor(Math.random() * keepItems.length);
    
    // Ensure different items
    while (randomIdx2 === randomIdx1 && keepItems.length > 1) {
      randomIdx2 = Math.floor(Math.random() * keepItems.length);
    }

    const item1 = keepItems[randomIdx1];
    const item2 = keepItems[randomIdx2];

    // Create outfit combination (top + bottom prioritization)
    const isItem1Top = item1.category === 'top' || item1.category === 'jacket';
    const isItem2Bottom = item2.category === 'bottom' || item2.category === 'skirt';

    const outfit = {
      id: `outfit_${Date.now()}_${i}`,
      items: [item1, item2],
      occasion: occasion,
      compatibility_score: Math.floor(Math.random() * 40 + 60), // 60-100
      season: determineSeason(item1, item2),
      colors: [item1.color, item2.color],
      createdAt: new Date().toISOString()
    };

    outfits.push(outfit);
  }

  return outfits;
};

const determineSeason = (item1, item2) => {
  const lightColors = ['cream', 'white', 'light blue', 'light pink'];
  const darkColors = ['black', 'navy', 'dark brown', 'burgundy'];

  const avgLightness = (
    (lightColors.includes(item1.color.toLowerCase()) ? 1 : 0) +
    (lightColors.includes(item2.color.toLowerCase()) ? 1 : 0)
  ) / 2;

  if (avgLightness > 0.5) return 'spring/summer';
  if (darkColors.includes(item1.color.toLowerCase()) || darkColors.includes(item2.color.toLowerCase())) return 'fall/winter';
  return 'all-season';
};

export const calculateStatistics = (wardrobeItems, recommendations) => {
  const keep = recommendations.filter(r => r.recommendation === 'keep').length;
  const donate = recommendations.filter(r => r.recommendation === 'donate').length;
  const sell = recommendations.filter(r => r.recommendation === 'sell').length;

  return {
    totalItems: wardrobeItems.length,
    keep,
    donate,
    sell,
    keepPercentage: Math.round((keep / wardrobeItems.length) * 100),
    donatePercentage: Math.round((donate / wardrobeItems.length) * 100),
    sellPercentage: Math.round((sell / wardrobeItems.length) * 100)
  };
};
