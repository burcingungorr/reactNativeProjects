import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { GOOGLE_API_KEY } from '../config';

const InfoWindow = ({ visible, onClose, restaurant }) => {
  const isOpen = restaurant?.opening_hours?.open_now;


  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
          
          <ScrollView>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>

            {restaurant.photos && restaurant.photos.length > 0 && (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`,
                }}
                style={styles.restaurantImage}
              />
            )}

            <Text style={styles.restaurantAddress}>
              {restaurant.formatted_address}
            </Text>

            <Text style={styles.restaurantRating}>
              Puan: {restaurant.rating} ({restaurant.user_ratings_total} yorum)
            </Text>

            {restaurant.opening_hours && (
              <Text style={[styles.openNow, { color: isOpen ? 'green' : 'red' }]}>
                Şu an {isOpen ? 'açık' : 'kapalı'}
              </Text>
            )}

        
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  restaurantAddress: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  restaurantRating: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  openNow: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  types: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
    color: '#555',
  },
});

export default InfoWindow;
