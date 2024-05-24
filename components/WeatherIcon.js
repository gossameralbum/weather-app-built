import React from 'react';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../theme';

const WeatherIcon = ({ condition }) => {
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Rain':
        return { name: 'cloud-rain', type: 'font-awesome-5' };
      case 'Clear':
        return { name: 'sun', type: 'font-awesome-5' };
      case 'Clouds':
        return { name: 'cloud', type: 'font-awesome-5' };
      case 'Snow':
        return { name: 'snowflake', type: 'font-awesome-5' };
      case 'Thunderstorm':
        return { name: 'bolt', type: 'font-awesome-5' };
      case 'Drizzle':
        return { name: 'cloud-sun-rain', type: 'font-awesome-5' };
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Dust':
      case 'Fog':
      case 'Sand':
      case 'Ash':
      case 'Squall':
      case 'Tornado':
        return { name: 'smog', type: 'font-awesome-5' };
      default:
        return { name: 'question', type: 'font-awesome-5' };
    }
  };

  const { name, type } = getWeatherIcon(condition);

  return (
    <Icon
      name={name}
      type={type}
      size={60}
      color={colors.primary}
    />
  );
};

WeatherIcon.propTypes = {
  condition: PropTypes.string.isRequired,
};

export default WeatherIcon;
