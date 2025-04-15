import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BestScore = ({ navigation }) => {
  const [easyBest, setEasyBest] = useState(null);
  const [hardBest, setHardBest] = useState(null);

  useEffect(() => {
    const fetchBestScores = async () => {
      try {
        let easyScores = [];
        let hardScores = [];

        const usersSnapshot = await firestore()
          .collection('users')
          .get();

        for (const userDoc of usersSnapshot.docs) {
          const userId = userDoc.id;

          const resultsSnapshot = await firestore()
            .collection('users')
            .doc(userId)
            .collection('results')
            .get();

          resultsSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.difficulty === 'Kolay') {
              const score = parseInt(data.score);
              easyScores.push(score);
            } else if (data.difficulty === 'Zor') {
              const score = parseInt(data.score);
              hardScores.push(score);
            }
          });
        }

        setEasyBest(easyScores.length ? Math.max(...easyScores) : 0);
        setHardBest(hardScores.length ? Math.max(...hardScores) : 0);
      } catch (error) {
        console.error('Skorlar alınırken hata oluştu:', error);
      }
    };

    fetchBestScores();
  }, []);

  return (
    <View style={styles.container}>
       <View style={styles.rowItem}>
        <Icon
          name="trophy"
          size={30}
          color="#000"
          style={styles.icon}
          onPress={() => navigation.navigate('Lead')}
        />
        <Text style={styles.rowText}>Liderlik</Text>
      </View>
      <View style={styles.bottomText}> 
        <Text style={styles.container_text}>En Yüksek Skorlar</Text>
      <Text style={styles.container_text}>
        Kolay: {easyBest !== null ? `${easyBest} /10 🏆` : 'Yükleniyor...'}
      </Text>
      <Text style={styles.container_text}>
        Zor: {hardBest !== null ? `${hardBest} /10 🏆` : 'Yükleniyor...'}
      </Text>
      </View>
      
  
     
    </View>
  );
  
};

const styles = StyleSheet.create({

  container_text: {
    color: 'white',
    fontSize: 18,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 40,
    padding: 7,
    backgroundColor: 'white',
    marginLeft: 8,

  },
  rowText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
    color: 'white',

  },
  bottomText:{
    marginTop:80
  }
});


export default BestScore;
