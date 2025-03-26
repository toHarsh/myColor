type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';
type Undertone = 'warm' | 'cool';

export interface ColorResult {
  season: Season;
  undertone: Undertone;
  confidence: number;
  recommendedColors: string[];
}

export function analyzeImageData(imageData: Uint8Array): ColorResult {
  if (!imageData || imageData.length < 4) {
    throw new Error('Invalid image data');
  }

  let r = 0, g = 0, b = 0;
  const pixelCount = imageData.length / 4;

  // Calculate average RGB values, skipping fully transparent pixels
  let validPixels = 0;
  for (let i = 0; i < imageData.length; i += 4) {
    if (imageData[i + 3] > 0) { // Check alpha channel
      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
      validPixels++;
    }
  }

  if (validPixels === 0) {
    throw new Error('No valid pixels found in image');
  }

  r = Math.round(r / validPixels);
  g = Math.round(g / validPixels);
  b = Math.round(b / validPixels);

  // Skin tone specific adjustments
  const isSkinTone = isLikelySkinTone(r, g, b);
  if (isSkinTone) {
    // Adjust for skin tone analysis
    const skinToneAdjustment = 1.2; // Increase sensitivity for skin tones
    r = Math.min(255, Math.round(r * skinToneAdjustment));
    g = Math.min(255, Math.round(g * skinToneAdjustment));
    b = Math.min(255, Math.round(b * skinToneAdjustment));
  }

  // Determine if the color is warm or cool with improved accuracy
  const undertone = determineUndertone(r, g, b);
  
  // Calculate brightness and saturation
  const brightness = (r + g + b) / 3;
  const saturation = calculateSaturation(r, g, b);
  const isBright = brightness > 128;
  const isSaturated = saturation > 0.3;

  // Calculate color characteristics
  const totalColor = r + g + b;
  const blueRatio = b / totalColor;
  const isStrongBlue = blueRatio > 0.4;

  // Determine season with improved logic
  let season: Season = determineSeason(undertone, isBright, isSaturated, isStrongBlue);

  // Calculate confidence with multiple factors
  const confidence = calculateConfidence(r, g, b, undertone, season);

  // Get recommended colors based on season
  const recommendedColors = getRecommendedColors(season);

  return {
    season,
    undertone,
    confidence,
    recommendedColors,
  };
}

function isLikelySkinTone(r: number, g: number, b: number): boolean {
  // Basic skin tone detection
  const redGreenRatio = r / g;
  const redBlueRatio = r / b;
  return redGreenRatio > 1.1 && redGreenRatio < 1.5 && redBlueRatio > 1.2;
}

function determineUndertone(r: number, g: number, b: number): Undertone {
  const redGreenDiff = r - g;
  const redBlueDiff = r - b;
  const greenBlueDiff = g - b;
  
  // More sophisticated undertone detection
  if (redGreenDiff > 20 && redBlueDiff > 20) {
    return 'warm';
  } else if (greenBlueDiff > 20) {
    return 'cool';
  }
  
  return r > b ? 'warm' : 'cool';
}

function calculateSaturation(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

function determineSeason(
  undertone: Undertone,
  isBright: boolean,
  isSaturated: boolean,
  isStrongBlue: boolean
): Season {
  if (undertone === 'warm') {
    return isBright ? 'Spring' : 'Autumn';
  } else {
    if (isStrongBlue && isSaturated) {
      return 'Winter';
    }
    return 'Summer';
  }
}

function calculateConfidence(
  r: number,
  g: number,
  b: number,
  undertone: Undertone,
  season: Season
): number {
  const colorBalance = Math.abs(r - g) + Math.abs(g - b) + Math.abs(r - b);
  const maxPossibleBalance = 765; // 255 * 3
  const balanceRatio = colorBalance / maxPossibleBalance;
  
  // Base confidence on color balance and season-specific factors
  let confidence = Math.round(balanceRatio * 100);
  
  // Adjust confidence based on season-specific characteristics
  if (season === 'Winter' && undertone === 'cool') {
    confidence = Math.min(100, confidence + 10);
  } else if (season === 'Summer' && undertone === 'cool') {
    confidence = Math.min(100, confidence + 5);
  }
  
  return Math.min(100, confidence);
}

function getRecommendedColors(season: Season): string[] {
  const colorPalettes = {
    Spring: ['#FF9900', '#FFE5B4', '#98FF98', '#87CEEB', '#FFB6C1'],
    Summer: ['#ADD8E6', '#E6E6FA', '#F08080', '#98FB98', '#DDA0DD'],
    Autumn: ['#8B4513', '#DAA520', '#CD853F', '#D2691E', '#A0522D'],
    Winter: ['#000080', '#4B0082', '#800000', '#008080', '#483D8B'],
  };

  return colorPalettes[season];
} 