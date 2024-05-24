// App.js
import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import colors from './theme';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} />
      <HomeScreen />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
