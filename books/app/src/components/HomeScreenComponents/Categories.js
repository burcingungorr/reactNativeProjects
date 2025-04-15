import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const CATEGORIES = [
  { name: 'Animals', key: 'animals' },
  { name: 'Fiction', key: 'fiction' },
  { name: 'Science & Mathematics', key: 'science_mathematics' },
  { name: 'Business & Finance', key: 'business_finance' },
  { name: 'Children\'s', key: 'childrens' },
  { name: 'History', key: 'history' },
  { name: 'Health & Wellness', key: 'health_wellness' },
  { name: 'Biography', key: 'biography' },
  { name: 'Social Sciences', key: 'social_sciences' },
  { name: 'Places', key: 'places' },
];


const Categories = ({ setSelectedCategory }) => {
  const [selectedCategory, setLocalSelectedCategory] = useState(null);

  const handleCategoryPress = (categoryKey) => {
    setLocalSelectedCategory(categoryKey); 
    setSelectedCategory(categoryKey); 
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[styles.button, selectedCategory === cat.key && styles.selectedButton]}
            onPress={() => handleCategoryPress(cat.key)}
          >
            <Text style={styles.buttonText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    paddingVertical: 15, 
    backgroundColor: '#fff' 
  },
  scrollContainer: {
     paddingHorizontal: 10, 
    },
  button: {
    marginRight: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#a95e13',
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: '#e7bd92',
    borderWidth:2,
    borderColor:'#a95e13'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Categories;
