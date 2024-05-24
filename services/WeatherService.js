const API_KEY = '8a03bc9e4aedf3ee5e7b35be34089d15';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?id=524901&appid=8a03bc9e4aedf3ee5e7b35be34089d15';

export const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${BASE_URL}&q=${city}&units=metric`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {

    console.error(error);
  }
};
