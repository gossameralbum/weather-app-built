import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import WeatherCard from '../components/WeatherCard';
import { fetchWeather } from '../services/WeatherService';
import Toast from 'react-native-toast-message';
import colors from '../theme';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleFetchWeather = async () => {
    const data = await fetchWeather(city);
    if (data) {
      setWeatherData(data);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'City not found. Please check the spelling and try again.',
        visibilityTime: 3000,
        swipeable: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        placeholderTextColor={colors.textSecondary}
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.button} onPress={handleFetchWeather}>
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
  input: {
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '80%',
    backgroundColor: colors.textPrimary,
    color: colors.textSecondary,
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
