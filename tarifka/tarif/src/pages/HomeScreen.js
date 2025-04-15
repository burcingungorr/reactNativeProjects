import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => response.json())
      .then(data => setCategories(data.categories))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yemek Kategorileri</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.idCategory}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => navigation.navigate('Meals', { category: item.strCategory })}
          >
            <Text style={styles.categoryText}>{item.strCategory}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1, 
     padding: 20, 
     backgroundColor: '#f4a261', },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
color:'white' },
  categoryItem: { 
    padding: 15, 
    marginBottom: 10, 
    backgroundColor: '#fff', 
    borderRadius: 4,
    borderBottomLeftRadius:70,
    borderTopLeftRadius:70
    
 },
  categoryText: { 
    fontSize: 18, 
    color: '#f4a261', 
    textAlign: 'center' },
});
