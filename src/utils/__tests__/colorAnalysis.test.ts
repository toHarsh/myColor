/// <reference types="jest" />
import { analyzeImageData } from '../colorAnalysis';

describe('Color Analysis', () => {
  test('should correctly identify Winter season for strong blue presence', () => {
    // Create a test image data with strong blue presence
    const imageData = new Uint8Array(400); // 100 pixels
    for (let i = 0; i < imageData.length; i += 4) {
      imageData[i] = 50;     // R
      imageData[i + 1] = 50; // G
      imageData[i + 2] = 200; // B (strong blue)
      imageData[i + 3] = 255; // A
    }

    const result = analyzeImageData(imageData);
    expect(result.season).toBe('Winter');
    expect(result.undertone).toBe('cool');
  });

  test('should correctly identify Summer season for balanced cool colors', () => {
    // Create a test image data with balanced cool colors
    const imageData = new Uint8Array(400); // 100 pixels
    for (let i = 0; i < imageData.length; i += 4) {
      imageData[i] = 100;     // R
      imageData[i + 1] = 150; // G
      imageData[i + 2] = 150; // B (balanced cool)
      imageData[i + 3] = 255; // A
    }

    const result = analyzeImageData(imageData);
    expect(result.season).toBe('Summer');
    expect(result.undertone).toBe('cool');
  });

  test('should correctly identify Spring season for warm and bright colors', () => {
    // Create a test image data with warm and bright colors
    const imageData = new Uint8Array(400); // 100 pixels
    for (let i = 0; i < imageData.length; i += 4) {
      imageData[i] = 200;     // R
      imageData[i + 1] = 150; // G
      imageData[i + 2] = 50;  // B (warm and bright)
      imageData[i + 3] = 255; // A
    }

    const result = analyzeImageData(imageData);
    expect(result.season).toBe('Spring');
    expect(result.undertone).toBe('warm');
  });

  test('should correctly identify Autumn season for warm and muted colors', () => {
    // Create a test image data with warm and muted colors
    const imageData = new Uint8Array(400); // 100 pixels
    for (let i = 0; i < imageData.length; i += 4) {
      imageData[i] = 150;     // R
      imageData[i + 1] = 100; // G
      imageData[i + 2] = 50;  // B (warm and muted)
      imageData[i + 3] = 255; // A
    }

    const result = analyzeImageData(imageData);
    expect(result.season).toBe('Autumn');
    expect(result.undertone).toBe('warm');
  });

  test('should return correct number of recommended colors', () => {
    const imageData = new Uint8Array(400);
    for (let i = 0; i < imageData.length; i += 4) {
      imageData[i] = 200;
      imageData[i + 1] = 180;
      imageData[i + 2] = 100;
      imageData[i + 3] = 255;
    }

    const result = analyzeImageData(imageData);
    expect(result.recommendedColors.length).toBe(4);
  });
}); 