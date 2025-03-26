export type ColorResult = {
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  undertone: 'warm' | 'cool';
  confidence: number;
  recommendedColors: string[];
};

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Results: { results: ColorResult };
}; 