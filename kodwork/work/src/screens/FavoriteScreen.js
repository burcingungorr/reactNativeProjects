import React from "react";
import { View, FlatList, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import JobItem from "../components/JobItem";
import { removeFavorite } from "../redux/slices/favoriteSlice";

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favoriteJobs);

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
            onPress={() => dispatch(removeFavorite(item.id))} />
          </View>
        )}
      />
    </View>
  );
}
