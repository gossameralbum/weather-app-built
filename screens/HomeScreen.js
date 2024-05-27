
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WeatherCard from '../components/WeatherCard';
import { fetchWeather } from '../services/WeatherService';
import CityAutocomplete from '../components/CityAutocomplete';
import colors from '../theme'; // Import the colors object

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleFetchWeather = async (selectedCity) => {
    const data = await fetchWeather(selectedCity);
    if (data) {
      setWeatherData(data);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather</Text>
      <CityAutocomplete onSelectCity={(selectedCity) => setCity(selectedCity)} />
      <TouchableOpacity style={styles.button} onPress={() => handleFetchWeather(city)}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    color: colors.primary,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
