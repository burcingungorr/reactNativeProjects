import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, setSelectedRestaurant } from '../redux/fetchDataSlice';
import { GOOGLE_API_KEY } from '../config';

const RestaurantList = ({ style ,onSelect}) => {
  const dispatch = useDispatch();
  const { restaurants, loading, error, nextPageToken } = useSelector(
    (state) => state.restaurants
  );

  const uniqueRestaurants = Array.from(
    new Map(restaurants.map((item) => [item.place_id, item])).values()
  );

  const handleLoadMore = () => {
    if (nextPageToken && !loading) {
      dispatch(fetchRestaurants({ apiKey: GOOGLE_API_KEY, nextPageToken }));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        onSelect(item);
      }}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.address}>{item.formatted_address}</Text>
      {item.rating && <Text style={styles.rating}>⭐ {item.rating}</Text>}
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!nextPageToken) return null;
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={handleLoadMore}
          >
            <Text style={styles.loadMoreText}>Daha Fazla Yükle</Text>
          </TouchableOpacity>
        )}
      </View> 
    );
  };

  if (error)
    return <Text style={styles.error}>Hata: {error}</Text>;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Restoran Listesi</Text>
      <FlatList
        data={uniqueRestaurants}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.place_id}_${item.name}`}
                 ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 10,
    textAlign: 'center',
  },
  listContent: {
    padding: 2,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: '#ffa500',
    marginTop: 5,
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  loadMoreText: {
    color: '#333',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    padding: 20,
  },
});

export default RestaurantList;
