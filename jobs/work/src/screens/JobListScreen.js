import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import JobItem from "../components/JobItem";

export default function JobListScreen({ navigation }) {
 



  return (
    <View>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobItem job={item} 
         />
        )}
      />
    </View>
  );
}
