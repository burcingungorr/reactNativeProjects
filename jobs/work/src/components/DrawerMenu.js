import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesScreen from "../screens/FavoriteScreen";
import StackNavigation from "../navigation/StackNavigator";


const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
  return (
    <Drawer.Navigator initialRouteName="JobList">
      <Drawer.Screen name="JobList" 
      component={StackNavigation} 
      options={{ title: "İş Listesi" }} />

      <Drawer.Screen name="Favorites" 
      component={FavoritesScreen} 
      options={{ title: "Favoriler" }} />
    </Drawer.Navigator>
  );
}
