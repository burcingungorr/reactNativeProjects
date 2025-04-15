import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import JobListScreen from "../screens/JobListScreen";
import JobDetailScreen from "../screens/JobDetailScreen";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="JobList">
      <Stack.Screen 
        name="JobList" 
        component={JobListScreen} 
        options={{ title: "İş Listesi" }} 
      />
      <Stack.Screen 
        name="JobDetail" 
        component={JobDetailScreen} 
        options={{ title: "İş Detayı" }} 
      />
    </Stack.Navigator>
  );
}
