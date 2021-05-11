import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { expo } from './app.json';
import MainLayout from './layout/MainLayout';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  dark: false,
  background: '#0086ff',
  mode: 'exact'
};

function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar style="auto" />
      <MainLayout style={{flex: 1}} />
    </View>
  );
}

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App style={{flex: 1}} />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);
