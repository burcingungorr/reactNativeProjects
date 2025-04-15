import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RoomCard = ({ name, createdBy }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.roomName}>{name}</Text>
      <Text style={styles.createdBy}>Oluşturan: {createdBy}</Text>
    </View>
  );
};

export default RoomCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FF6347',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: 150,
    height: 130,
    justifyContent: 'space-between',
  },
  roomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  createdBy: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'flex-end',
  },
});
