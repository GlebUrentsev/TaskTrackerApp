/* eslint-disable no-console */
/* eslint-disable global-require */
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainNavigator from './navigation/MainNavigator';

const fetchFonts = () => Font.loadAsync({
  'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
  'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err => console.log(err))}
      />
    );
  }

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('TaskTrackerApp', () => App);
