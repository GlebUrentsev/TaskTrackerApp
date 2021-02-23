import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <MainNavigator />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent('TaskTrackerApp', () => App);
