import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './src/screens/auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Sign from './src/screens/auth/Sign';
import { UserProvider } from './src/components/HomeComponent/UserContext';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
        <Stack.Screen name="Sign" component={Sign}  options={{ headerShown: false }}/>
        <Stack.Screen name="Feed" component={FeedScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer> </UserProvider>    </Provider>

  );
};

function FeedScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#87CEFA',
        tabBarInactiveTintColor: '#808080',
        tabBarStyle: {
          backgroundColor: '#191970',
          borderTopWidth: 1,
          
        },
        
      }
    }
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size || 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" size={size || 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size || 25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
