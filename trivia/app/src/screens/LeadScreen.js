import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EasyScreen from '../components/LeadScreenComponent/EasyScreen';
import HardScreen from '../components/LeadScreenComponent/HardScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const LeadScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'mediumorchid',
        tabBarInactiveTintColor: 'gray', 
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Easy') {
            iconName = 'emoticon-happy-outline'; 
          } else if (route.name === 'Hard') {
            iconName = 'emoticon-devil-outline'; 
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Easy" component={EasyScreen} />
      <Tab.Screen name="Hard" component={HardScreen} />
    </Tab.Navigator>
  );
};

export default LeadScreen;
