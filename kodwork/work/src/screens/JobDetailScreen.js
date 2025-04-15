import React from "react";
import { View, Button } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/slices/favoriteSlice";

export default function JobDetailScreen({ route }) {
  const { job } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favoriteJobs);
  const isFavorite = favorites.some(fav => fav.id === job.id);

  return (
    <View style={{ flex: 1 }}>
      <WebView source={{ html: job.contents }} style={{ flex: 1 }} />
      <Button
        title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        onPress={() => {
          if (isFavorite) {
            dispatch(removeFavorite(job.id));
          } else {
            dispatch(addFavorite(job));
          }
        }}
      />
    </View>
  );
}
