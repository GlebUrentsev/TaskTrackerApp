import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <PaperProvider>
      <MainNavigator />
    </PaperProvider>
  );
}

AppRegistry.registerComponent('TaskTrackerApp', () => App);
