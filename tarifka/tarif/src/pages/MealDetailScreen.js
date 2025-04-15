import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Image, ScrollView } from 'react-native';

export default function MealDetailScreen({ route }) {
  const { mealId } = route.params;
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => setMeal(data.meals[0]))
      .catch(error => console.error(error));
  }, [mealId]);

  if (!meal) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Image source={{ uri: meal.strMealThumb }} style={styles.mealImage} />
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
      <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(meal.strYoutube)}>
        <Text style={styles.buttonText}> YouTube'da İzle</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:20,
    textAlign:'center' 
  },
  instructions: { 
    fontSize: 16, 
    marginBottom: 20 ,
    padding:20
  },
  button: {
    backgroundColor: 'red', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center' ,
    marginBottom:10
  },
  buttonText: { 
    fontSize: 18, 
    color: '#fff' 
  },
  loadingText: { 
    fontSize: 20, 
    textAlign: 'center', 
    marginTop: 20 
  },
  mealImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 20,
  },
});
