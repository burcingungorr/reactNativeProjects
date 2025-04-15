import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'; 
import Likes from './Likes';
import Delete from './Delete';

const ShareCard = () => {
  const shares = useSelector((state) => state.shares.shares); 

  return (
    <View style={styles.container}>
      {shares.map((share, index) => (
        <View key={index} style={styles.card}>
        <Text style={styles.bookName}>{share.bookName}</Text>
        <Delete share={share} />
        <Text style={styles.authorName}>Yazar: {share.authorName}</Text>
        <Text style={styles.text}>{share.text}</Text>
        <Text style={styles.username}>@{share.userName}</Text>
        <Likes shareId={share.id} />
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
  },
  authorName: {
    fontSize: 14,
    color: '#555',
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
  username: {
    fontStyle: 'italic',
    color: '#888',
    marginTop: 10,
  },
  
});

export default ShareCard;
