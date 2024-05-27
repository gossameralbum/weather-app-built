// components/CityAutocomplete.js
import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import colors from '../theme';

const API_KEY = '62cf2d671emshabab2d5d9d992c2p10b410jsna23737a3d3ab';
const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

const CityAutocomplete = ({ onSelectCity }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchCities = async (input) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(BASE_URL, {
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
        params: {
          namePrefix: input,
          limit: 5,
          sort: '-population',
        },
      });
      const cityData = response.data.data.map(city => ({
        id: city.id,
        name: city.city,
        region: city.region,
        country: city.country,
      }));
      setSuggestions(cityData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectCity = (city) => {
    setQuery(city);
    setSuggestions([]);
    onSelectCity(city);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    onSelectCity('');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            fetchCities(text);
          }}
        />
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      {suggestions.length > 0 && (
        <View style={styles.dropdownWrapper}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id.toString()}
            style={styles.dropdown}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelectCity(`${item.name}, ${item.region}, ${item.country}`)}>
                <Text style={styles.suggestion}>
                  {item.name}, {item.region}, {item.country}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: colors.secondary,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    width: '80%',
    backgroundColor: colors.textPrimary,
    color: colors.textSecondary,
    fontSize: 16,
  },
  clearButton: {
    marginLeft: 10,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  clearButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  dropdown: {
    width: '100%',
    maxHeight: 150,
    backgroundColor: colors.primary,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 1,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    color: colors.textPrimary,
  },
});

export default CityAutocomplete;
