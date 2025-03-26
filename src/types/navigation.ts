export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Analysis: { imageUri: string };
  Results: { results: any }; // Replace 'any' with your actual results type
}; 