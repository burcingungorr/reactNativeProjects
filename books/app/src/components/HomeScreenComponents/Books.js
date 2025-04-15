import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooksByCategory } from '../../redux/fetchBooksSlice';
import BooksCard from '../../components/BooksCard';  

const Books = ({ category }) => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (category) {
      dispatch(fetchBooksByCategory(category)); 
    }
  }, [category, dispatch]);

  const renderItem = ({ item }) => <BooksCard book={item} />;  

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => item.key || index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 16 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  errorText: { 
    color: 'red' 
  },
  list: { 
    paddingBottom: 16 
  },
});

export default Books;
