import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Results'>;
  route: RouteProp<RootStackParamList, 'Results'>;
};

const ResultsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { results } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Results</Text>
      
      <View style={styles.resultCard}>
        <Text style={styles.seasonText}>Your Season: {results.season}</Text>
        <Text style={styles.undertoneText}>Undertone: {results.undertone}</Text>
        <Text style={styles.confidenceText}>
          Confidence: {(results.confidence * 100).toFixed(0)}%
        </Text>
      </View>

      <View style={styles.colorPalette}>
        <Text style={styles.paletteTitle}>Recommended Colors:</Text>
        <View style={styles.colorGrid}>
          {results.recommendedColors.map((color, index) => (
            <View
              key={index}
              style={[styles.colorSquare, { backgroundColor: color }]}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  resultCard: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  seasonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  undertoneText: {
    fontSize: 18,
    marginBottom: 5,
  },
  confidenceText: {
    fontSize: 16,
    color: '#666',
  },
  colorPalette: {
    marginTop: 20,
  },
  paletteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  colorSquare: {
    width: 70,
    height: 70,
    margin: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ResultsScreen; 