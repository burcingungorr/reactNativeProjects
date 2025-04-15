import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "../screens/FavoriteScreen";
import StackNavigation from "../navigation/StackNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator initialRouteName="JobList">
      <Tab.Screen 
        name="JobList" 
        component={StackNavigation} 
        options={{ title: "İş Listesi" }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ title: "Favoriler" }} 
      />
    </Tab.Navigator>
  );
}
