import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultScreen from '../screens/ResultScreen';
import { UserProvider } from '../components/SettingsScreenComponent/UserContext';
import Questions from '../components/QuizScreenComponent/Questions';
import LeadScreen from '../screens/LeadScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Lead" component={LeadScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  </UserProvider>
);

export default AppNavigator;
