import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ShareScreen from '../screens/ShareScreen';
import UsersScreen from '../screens/UsersScreen';

import { NavigationContainer } from '@react-navigation/native';
import home from '../assets/icons/home.png'; 
import users from '../assets/icons/account-group.png'; 
import profile from '../assets/icons/account-circle.png'; 
import share from '../assets/icons/share.png'; 
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
// import Login from '../screens/auth/Login';
 import ProfileScreen from '../screens/ProfileScreen';
// import Sign from '../screens/auth/Sign';
import SplashScreen from '../screens/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#a95e13', 
        },
        tabBarItemStyle: {
          activeBackgroundColor: '#d4873a', 
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity >
              <Image source={home} style={[styles.icon, { tintColor: 'white' }]} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Share"
        component={ShareScreen}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity >
              <Image source={share} style={[styles.icon, { tintColor: 'white' }]} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity >
              <Image source={users} style={[styles.icon, { tintColor: 'white' }]} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity >
              <Image source={profile} style={[styles.icon, { tintColor: 'white' }]} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="Sign" component={Sign} /> */}
        <Stack.Screen name="AppTabs" component={AppTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
});

export default AppNavigator;
