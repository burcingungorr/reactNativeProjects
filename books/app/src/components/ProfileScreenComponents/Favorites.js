import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import heart from '../../assets/icons/heart.png';

const Favorites = ({ isSelected, onPress }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth().currentUser;

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        console.log('girişi yapılmamış.');
        setLoading(false);
        return;
      }

      try {
        const snapshot = await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('favorites')
          .where('isFavorite', '==', true)
          .get();

        const books = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFavoriteBooks(books);
      } catch (error) {
        console.error('Favori kitaplar getirilirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading) {
    return <ActivityIndicator size="large" color="red" />;
  }

  return ( 
    <View style={styles.container}>
      <View style={[styles.tab, isSelected && styles.selectedTab]}>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={heart}
            style={[
              styles.icon,
              { tintColor: isSelected ? 'red' : 'gray' },
            ]}
          />
        </TouchableOpacity>
        {isSelected && <Text style={styles.label}>Favoriler</Text>}
      </View>

      {isSelected && (
        <FlatList
          data={favoriteBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.coverId ? (
                <Image
                  source={{ uri: `https://covers.openlibrary.org/b/id/${item.coverId}-L.jpg` }}
                  style={styles.coverImage}
                  resizeMode="contain"
                />
              ) : (
                <Text>Kapak Yok</Text>
              )}
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.author}>{item.author}</Text>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Favori kitap bulunamadı.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e7bd92',
    borderRadius: 8,
    marginBottom: 12,
    padding: 5,
  },
  coverImage: {
    width: 50,
    height: 70,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  author: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
});

export default Favorites;
