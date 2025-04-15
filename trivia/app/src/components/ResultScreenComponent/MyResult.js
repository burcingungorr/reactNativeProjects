import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const MyResult = ({ route }) => {
  const { correctAnswers, difficulty } = route.params;
  const [username, setUsername] = useState('');

  useEffect(() => {
    const saveResultToFirestore = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);

          await firestore()
            .collection('users')
            .doc(storedUsername)
            .collection('results')
            .add({
              score: `${correctAnswers}`,
              difficulty,
              timestamp: firestore.FieldValue.serverTimestamp(),
            });
        }
      } catch (error) {
        console.error('Firestore’a sonuç kaydedilirken hata oluştu:', error);
      }
    };

    saveResultToFirestore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sonuç</Text>
      <Text style={styles.resultText}>{correctAnswers}/10</Text>
      <Text style={styles.subText}>{difficulty}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    width: 200,
    padding: 8,
    marginTop: 20,
    backgroundColor: '#fff',
    borderColor:'yellow'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'normal',
  },
  subText: {
    marginTop: 5,
    fontSize: 18,
    color: 'gray',
  },
});

export default MyResult;
