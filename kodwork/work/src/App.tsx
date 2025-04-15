// App.js en üstüne ekleyin
import { enableScreens } from 'react-native-screens';
enableScreens(true); 
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./components/DrawerMenu"; 


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <TabNavigation /> 
      </NavigationContainer>
    </Provider>
  );
}
