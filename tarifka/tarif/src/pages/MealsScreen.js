import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function MealsScreen({ route, navigation }) {
  const { category } = route.params;
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(response => response.json())
      .then(data => setMeals(data.meals || [])) 
      .catch(error => console.error(error));
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        data={meals}
        keyExtractor={item => item.idMeal}
        numColumns={2} 
        renderItem={({ item }) => (
          <View style={styles.mealWrapper}> 
            <TouchableOpacity
              style={styles.mealItem}
              onPress={() => navigation.navigate('MealDetail', { mealId: item.idMeal })}
            >
              <Text style={styles.mealText}>{item.strMeal}</Text>
              <Image source={{ uri: item.strMealThumb }} style={styles.mealImage} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  mealWrapper: { 
    flex: 1, 
    margin: 5 
  },
  mealItem: { 
    padding: 15, 
    backgroundColor: '#f4a261', 
    borderRadius: 8, 
    alignItems: 'center' ,
    minHeight: 250,
    justifyContent:'center'
  },
  mealText: { 
    fontSize: 18, 
    color: '#fff', 
    textAlign: 'center' 
  },
  mealImage: {
    width: 100, 
    height: 100, 
    marginTop: 10, 
    borderRadius: 8,
  },
});
