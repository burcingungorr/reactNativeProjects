import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { GOOGLE_API_KEY } from '../config';
import { fetchRestaurants, setSelectedRestaurant } from '../redux/fetchDataSlice';
import ZoomControl from './ZoomControl';
import InfoWindow from './InfoWindow';
import Input from './Input';
import RestaurantList from './RestaurantList';

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 39.9334,
    longitude: 32.8597,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });


  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { restaurants, selectedRestaurant, loading, error } = useSelector(state => state.restaurants);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchRestaurants({ apiKey: GOOGLE_API_KEY }));
  }, [dispatch]);

  useEffect(() => {
    if (restaurants.length > 0 && region.latitudeDelta === 0.5) {
      const first = restaurants[0];
      setRegion({
        latitude: first.geometry.location.lat,
        longitude: first.geometry.location.lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  }, [restaurants, region]);

  const handleSelectRestaurant = (restaurant) => {
    dispatch(setSelectedRestaurant(restaurant));
    setModalVisible(true);
    setRegion({
      latitude: restaurant.geometry.location.lat,
      longitude: restaurant.geometry.location.lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };
  

  const handleMarkerPress = (restaurant) => {
    handleSelectRestaurant(restaurant);
  };

  const filteredSuggestions = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <Text style={styles.loadingText}>Yükleniyor...</Text>;
  if (error) return <Text style={styles.errorText}>Hata: {error}</Text>;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.place_id}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
            onPress={() => handleMarkerPress(restaurant)}
          />
        ))}
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.title}>Find Restaurants</Text>
        
      </View>

      <ZoomControl region={region} setRegion={setRegion} />

      {selectedRestaurant && (
      <InfoWindow
        visible={modalVisible}
        restaurant={selectedRestaurant}
        onClose={() => {
          dispatch(setSelectedRestaurant(null));
          setModalVisible(false);
        }}
      />
    )}


  <Input
    value={searchQuery}
    onChangeText={setSearchQuery}
    suggestions={filteredSuggestions}
    onSelect={handleMarkerPress}
  />

  <RestaurantList style={styles.restaurantList} 
      onSelect={handleMarkerPress}

  />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  map: {
    height: '45%',
    marginTop:85
  },
  overlay: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  restaurantList: {
    height: '30%',
    backgroundColor: 'white',
  },
  loadingText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 18,
  },
  errorText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    color: 'red',
    fontSize: 18,
  },
  noSelectionText: {
    alignSelf: 'center',
    color: 'white',
    marginTop:15,
    fontSize:18
  },
});

export default Map;