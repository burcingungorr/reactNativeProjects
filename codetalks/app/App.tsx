import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screen/auth/Login';
import Sign from './src/screen/auth/Sign';
import Rooms from './src/screen/Rooms';
import ChatRoom from './src/screen/ChatRoom';
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplashVisible(false);
    }, 3000);
  }, []);

  const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='LoginPage' component={Login} />
      <Stack.Screen name='SignPage' component={Sign} />
    </Stack.Navigator>
  );

  if (isSplashVisible) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>codetalks</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='AuthStack' component={AuthStack} />
          <Stack.Screen name='TextPage' component={Rooms} />
          <Stack.Screen name='ChatRoom' component={ChatRoom} />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6347',
  },
  splashText: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default App;