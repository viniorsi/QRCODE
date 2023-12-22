import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/routes/stackNavigator';
import { NativeBaseProvider } from 'native-base';
import TabNavigator from './src/routes/tabNavigator';
import Routes from './src/routes';

export default function App() {
  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  );
}

