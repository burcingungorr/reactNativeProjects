import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icons from './HomeScreenComponents/Icons';

const BooksCard = ({ book }) => {
  const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {book.cover_i && (
          <Image 
            source={{ uri: coverImageUrl }} 
            style={styles.coverImage} 
            resizeMode="contain" 
          />
        )}

        <View style={styles.textContainer}>
          <Text style={styles.title}>{book.title}</Text>
          {book.author_name && book.author_name.length > 0 && (
            <Text style={styles.author}>{book.author_name.join(', ')}</Text>
          )}
        </View>


        <View style={styles.icon}>
          <Icons />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#e7bd92',
    borderRadius: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 12,  
    flexShrink: 1,
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  author: {
    fontSize: 15,
    color: 'white',
    marginTop: 4,
  },
  icon: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
  }
});

export default BooksCard;
