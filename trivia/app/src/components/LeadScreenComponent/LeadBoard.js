import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Titles from '../Titles';
import LottieView from 'lottie-react-native';

const LeaderboardScreen = ({ difficulty }) => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = [];
      const usersSnapshot = await firestore().collection('users').get();

      if (usersSnapshot.empty) {
        console.log('Kullanıcı bulunamadı.');
        setIsLoading(false);
        return;
      }

      for (const userDoc of usersSnapshot.docs) {
        const resultsSnapshot = await firestore()
          .collection('users')
          .doc(userDoc.id)
          .collection('results')
          .where('difficulty', '==', difficulty)
          .orderBy('score', 'desc')
          .limit(1)
          .get();

        if (!resultsSnapshot.empty) {
          resultsSnapshot.forEach(resultDoc => {
            const resultData = resultDoc.data();
            const score = parseInt(resultData.score.split('/')[0], 10);
            data.push({ username: userDoc.id, score });
          });
        }
      }

      data.sort((a, b) => b.score - a.score);
      setLeaderboardData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Veri çekme hatası: ', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Liderlik tablosu yükleniyor...</Text>
      </View>
    );
  }

  if (leaderboardData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Henüz liderlik tablosu verisi bulunmamaktadır.</Text>
      </View>
    );
  }

  const firstPlace = leaderboardData[0];
  const otherPlaces = leaderboardData.slice(1);

  return (
    <View style={styles.container}>
      <Titles title={'Liderlik Tablosu'} />

      <View style={styles.firstPlaceContainer}>
        <Text style={styles.firstPlaceText}>
          1. {firstPlace.username}: {firstPlace.score}/10
        </Text>
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>

      <View style={styles.container_down}>
        <FlatList
          data={otherPlaces}
          keyExtractor={(item, index) => item.username + index}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.score_text}>{index + 2}. {item.username}</Text>
              <Text style={styles.username_text}>{item.score}/10</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'mediumorchid',
    alignItems: 'center',
  },
  firstPlaceContainer: {
    backgroundColor: 'mediumorchid',
    width: '100%',
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  animation: {
    width: 200,
    height: 150,
  },
  firstPlaceText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginTop: 80,
  },
  container_down: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 40,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  score_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  username_text: {
    fontSize: 16,
    color: '#666',
  },
});

export default LeaderboardScreen;
