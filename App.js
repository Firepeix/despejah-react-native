import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { expo } from './app.json';
import MainLayout from './layout/MainLayout';
import ExpenseTypeService from './services/ExpenseTypeService';
import ExpenseService from './services/ExpenseService';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  dark: false,
  mode: 'exact',
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff828b',
    accent: '#ff4a57',
  },
};

class App extends React.Component{
  constructor (props) {
    super(props);
    this.expenseServiceType = new ExpenseTypeService()
    this.expenseService = new ExpenseService()
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar style="auto" />
        <MainLayout expenseService={this.expenseService} expenseTypeService={this.expenseServiceType} style={{flex: 1}} />
      </View>
    )
  }
}

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App style={{flex: 1}} />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => Main);
