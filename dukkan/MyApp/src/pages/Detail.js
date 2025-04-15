import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import useFetch from '../hooks/useFetch'; 

const Detail = ({ route }) => {
  const { id } = route.params;
  const { loading, data: product, error } = useFetch(`https://fakestoreapi.com/products/${id}`);

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text>Hata oluştu: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image }} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Text style={styles.price}>{product.price}$</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});
