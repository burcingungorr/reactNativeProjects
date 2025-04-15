import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Categories from '../components/HomeScreenComponents/Categories';
import Books from '../components/HomeScreenComponents/Books';
import Title from '../components/Title';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('animals');

  return (
    <View style={styles.container}>
      <Title title={'KİTAPLAR'} />
      <Categories setSelectedCategory={setSelectedCategory} />
      <Books category={selectedCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
   },
});

export default HomeScreen;
