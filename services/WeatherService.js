// services/WeatherService.js
import Toast from 'react-native-toast-message';

const API_KEY = '8a03bc9e4aedf3ee5e7b35be34089d15';
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

const handleCityNotFound = (errorMessage) => {
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: errorMessage,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    backgroundColor: '#ff6b6b',
    textColor: '#ffffff',
  });
};

export const fetchWeather = async (city) => {
  const trimmedCity = city.trim();
  const broaderCity = trimmedCity.split(',')[0];

  try {
    const response = await fetch(`${BASE_URL}&q=${encodeURIComponent(trimmedCity)}&units=metric`);
    if (!response.ok) {
      if (response.status === 404) {
        // Try with the broader city name
        const broaderResponse = await fetch(`${BASE_URL}&q=${encodeURIComponent(broaderCity)}&units=metric`);
        if (!broaderResponse.ok) {
          throw new Error('City not found');
        }
        const broaderData = await broaderResponse.json();
        return broaderData;
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else {
        throw new Error('City not found');
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    handleCityNotFound(error.message);
    console.error(error);
    return null;
  }
};
