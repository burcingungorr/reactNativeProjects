import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'; 
import Likes from './Likes';

const ShareCard = () => {
  const shares = useSelector((state) => state.shares.shares); 

  return (
    <View style={styles.container}>
      {shares.map((share, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.bookName}>{share.bookName}</Text>
          <Text style={styles.authorName}>Yazar: {share.authorName}</Text>
          <Image source={{ uri: share.image }} style={styles.image} />
          <Text style={styles.text}>{share.text}</Text>
          <Likes/>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
  },
  bookName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  authorName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default ShareCard;
