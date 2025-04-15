import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ZoomControl = ({ region, setRegion }) => {
  const handleZoom = (direction) => {
    const factor = direction === 'in' ? 0.5 : 2;
    setRegion({
      ...region,
      latitudeDelta: region.latitudeDelta * factor,
      longitudeDelta: region.longitudeDelta * factor,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handleZoom('in')}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleZoom('out')}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
    bottom: '48%',
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ZoomControl;