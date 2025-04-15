import React from "react";
import { View, FlatList, Button } from "react-native";
import JobItem from "../components/JobItem";

export default function FavoritesScreen({  }) {

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <JobItem job={item} 
            onPress={() => navigation.navigate("JobDetail", { job: item })} />
            <Button title="Favorilerden Çıkar" 
           />
          </View>
        )}
      />
    </View>
  );
}
