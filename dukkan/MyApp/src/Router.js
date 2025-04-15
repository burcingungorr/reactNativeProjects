import React from 'react'
import {View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import Products from './pages/Products';
import Detail from './pages/Detail';
import Login from './pages/Login';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
  <Stack.Navigator>
  <Stack.Screen name='LoginPage' component={Login} 
  options={{
  title:'Giriş',
  headerStyle:{backgroundColor:'#90caf9'},
  headerTitleStyle:{color:'white'}
}}/>
  <Stack.Screen name='ProductsPage' component={Products} 
  options={{
  title:'Dükkan',
  headerStyle:{backgroundColor:'#90caf9'},
  headerTitleStyle:{color:'white'}
}}/>
<Stack.Screen name='DetailPage' component={Detail} 
 options={{
  title:'Detay',
  headerStyle:{backgroundColor:'#90caf9'},
  headerTitleStyle:{color:'white'}
}}/>

  </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router