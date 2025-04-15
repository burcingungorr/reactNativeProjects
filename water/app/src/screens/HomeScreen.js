import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Username from '../components/HomeComponent/Username';
import ProgressCircular from '../components/HomeComponent/ProgressCircular';
import AddWater from '../components/HomeComponent/AddWater';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Username/>
      <ProgressCircular/>
      <AddWater/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191970',
    flex: 1,
  },

});
