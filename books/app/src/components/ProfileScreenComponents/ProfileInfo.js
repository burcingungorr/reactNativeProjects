import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ProfileInfo = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
          if (userDoc.exists) {
            const data = userDoc.data();
            setUserName(data.username); 
          } else {
            console.warn('Kullanıcı verisi bulunamadı.');
            setUserName('Kullanıcı bulunamadı');
          }
        }
      } catch (error) {
        console.error('Kullanıcı adı çekilirken hata oluştu:', error);
        setUserName('Hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="small" color="#a95e13" />
      ) : (
        <Text style={styles.name}>{userName}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default ProfileInfo;
