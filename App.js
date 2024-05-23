// App.js
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import colors from './theme';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
