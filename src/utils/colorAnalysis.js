function analyzeImageData(imageData) {
  let r = 0, g = 0, b = 0;
  const pixelCount = imageData.length / 4;

  // Calculate average RGB values
  for (let i = 0; i < imageData.length; i += 4) {
    r += imageData[i];
    g += imageData[i + 1];
    b += imageData[i + 2];
  }

  r = Math.round(r / pixelCount);
  g = Math.round(g / pixelCount);
  b = Math.round(b / pixelCount);

  // Determine if the color is warm or cool
  const undertone = r > b ? 'warm' : 'cool';

  // Calculate brightness
  const brightness = (r + g + b) / 3;
  const isBright = brightness > 128;

  // Determine season based on undertone and brightness
  let season;
  if (undertone === 'warm') {
    season = isBright ? 'Spring' : 'Autumn';
  } else {
    season = isBright ? 'Summer' : 'Winter';
  }

  // Calculate confidence based on how strong the undertone difference is
  const undertoneStrength = Math.abs(r - b) / 255;
  const confidence = Math.min(Math.round(undertoneStrength * 100), 100);

  // Recommended colors based on season
  const recommendedColors = getRecommendedColors(season);

  return {
    season,
    undertone,
    confidence,
    recommendedColors,
  };
}

function getRecommendedColors(season) {
  const colorPalettes = {
    Spring: ['#FF9900', '#FFE5B4', '#98FF98', '#87CEEB', '#FFB6C1'],
    Summer: ['#ADD8E6', '#E6E6FA', '#F08080', '#98FB98', '#DDA0DD'],
    Autumn: ['#8B4513', '#DAA520', '#CD853F', '#D2691E', '#A0522D'],
    Winter: ['#000080', '#4B0082', '#800000', '#008080', '#483D8B'],
  };

  return colorPalettes[season];
}

module.exports = {
  analyzeImageData,
};