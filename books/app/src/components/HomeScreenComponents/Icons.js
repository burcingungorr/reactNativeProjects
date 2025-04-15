import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import heart from '../../assets/icons/heart.png';
import check from '../../assets/icons/check-bold.png';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Icons = ({ book }) => {
  const [selectedHeart, setSelectedHeart] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState(false);
  const user = auth().currentUser;

  const getBookId = () => {
    if (book.cover_i) return book.cover_i.toString();
    if (book.key) return book.key;
    return null;
  };

  useEffect(() => {
    const fetchStatus = async () => {
      const bookId = getBookId();
      if (!user || !bookId) return;

      try {
        const favDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('favorites')
          .doc(bookId)
          .get();

        if (favDoc.exists && favDoc.data()?.isFavorite) {
          setSelectedHeart(true);
        }

        const readDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('readed')
          .doc(bookId)
          .get();

        if (readDoc.exists && readDoc.data()?.isReaded) {
          setSelectedCheck(true);
        }
      } catch (error) {
        console.error('Durumlar alınırken hata:', error);
      }
    };

    fetchStatus();
  }, []);

  const handleHeartPress = async () => {
    const bookId = getBookId();
    if (!user || !bookId) {
      Alert.alert('Hata', 'Kullanıcı girişi yapılmamış veya kitap ID bulunamadı.');
      return;
    }

    const newState = !selectedHeart;
    setSelectedHeart(newState);

    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('favorites')
        .doc(bookId)
        .set({
          title: book.title,
          author: book.author_name?.join(', ') || '',
          coverId: book.cover_i || null,
          isFavorite: newState,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error('Favori işlemi sırasında hata:', error);
    }
  };

  const handleCheckPress = async () => {
    const bookId = getBookId();
    if (!user || !bookId) {
      Alert.alert('Hata', 'Kullanıcı girişi yapılmamış veya kitap ID bulunamadı.');
      return;
    }

    const newState = !selectedCheck;
    setSelectedCheck(newState);

    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('readed')
        .doc(bookId)
        .set({
          title: book.title,
          author: book.author_name?.join(', ') || '',
          coverId: book.cover_i || null,
          isReaded: newState,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error('Okundu işlemi sırasında hata:', error);
    }
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handleHeartPress}>
        <Image
          source={heart}
          style={[styles.icon, { tintColor: selectedHeart ? 'red' : 'gray' }]}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCheckPress}>
        <Image
          source={check}
          style={[styles.icon, { tintColor: selectedCheck ? 'green' : 'gray' }]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 7,
  },
});

export default Icons;
