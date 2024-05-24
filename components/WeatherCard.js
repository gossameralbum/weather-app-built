import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import WeatherIcon from './WeatherIcon';
import colors from '../theme'; // Import the colors object

const WeatherCard = ({ weatherData }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <Animated.View style={[styles.card, { opacity }]}>
      <Text style={styles.city}>{weatherData.name}</Text>
      <WeatherIcon condition={weatherData.weather[0].main} />
      <Text style={styles.temperature}>{weatherData.main.temp}°C</Text>
      <Text style={styles.description}>{weatherData.weather[0].description}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: colors.secondary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  description: {
    fontSize: 18,
    color: colors.textPrimary,
  },
});

export default WeatherCard;
