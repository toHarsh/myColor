const { analyzeImageData } = require('../colorAnalysis.js');

describe('Color Analysis', () => {
  test('should detect warm undertone', () => {
    const warmImageData = new Uint8Array(400);
    for (let i = 0; i < warmImageData.length; i += 4) {
      warmImageData[i] = 200;     // R
      warmImageData[i + 1] = 180; // G
      warmImageData[i + 2] = 100; // B
      warmImageData[i + 3] = 255; // A
    }
    const result = analyzeImageData(warmImageData);
    expect(result.undertone).toBe('warm');
  });

  test('should detect cool undertone', () => {
    const coolImageData = new Uint8Array(400);
    for (let i = 0; i < coolImageData.length; i += 4) {
      coolImageData[i] = 100;     // R
      coolImageData[i + 1] = 120; // G
      coolImageData[i + 2] = 200; // B
      coolImageData[i + 3] = 255; // A
    }
    const result = analyzeImageData(coolImageData);
    expect(result.undertone).toBe('cool');
  });

  test('should determine Spring season for warm and bright colors', () => {
    const springImageData = new Uint8Array(400);
    for (let i = 0; i < springImageData.length; i += 4) {
      springImageData[i] = 220;     // R
      springImageData[i + 1] = 200; // G
      springImageData[i + 2] = 180; // B
      springImageData[i + 3] = 255; // A
    }
    const result = analyzeImageData(springImageData);
    expect(result.season).toBe('Spring');
  });

  test('should determine Winter season for cool and bright colors', () => {
    const winterImageData = new Uint8Array(400);
    for (let i = 0; i < winterImageData.length; i += 4) {
      winterImageData[i] = 180;     // R
      winterImageData[i + 1] = 200; // G
      winterImageData[i + 2] = 220; // B
      winterImageData[i + 3] = 255; // A
    }
    const result = analyzeImageData(winterImageData);
    expect(result.season).toBe('Winter');
  });

  test('should return recommended colors', () => {
    const imageData = new Uint8Array(400);
    for (let i = 0; i < imageData.length; i += 4) {
      imageData[i] = 200;     // R
      imageData[i + 1] = 180; // G
      imageData[i + 2] = 100; // B
      imageData[i + 3] = 255; // A
    }
    const result = analyzeImageData(imageData);
    expect(result.recommendedColors.length).toBe(5);
    expect(Array.isArray(result.recommendedColors)).toBe(true);
    expect(typeof result.recommendedColors[0]).toBe('string');
  });
});