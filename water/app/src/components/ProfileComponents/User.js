import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AvatarSelector from './AvatarSelector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '../HomeComponent/UserContext';

const User = () => {
  const { username, setUsername } = useUser();  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;

      if (!user) {
        console.log("Kullanıcı giriş yapmamış.");
        setLoading(false);
        return;
      }

      try {
        const userDoc = await firestore().collection('users').doc(user.uid).get();

        if (userDoc.exists) {
          setUserData(userDoc.data());
          setUsername(userDoc.data().username); 
        } else {
          console.log('Kullanıcı verisi bulunamadı.');
        }
      } catch (error) {
        console.error('Veri alınırken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'white' }}>Kullanıcı verisi bulunamadı</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PROFİL</Text>
      <AvatarSelector />

      <View style={styles.user_container}>
        <View style={styles.user_info_container}>
          <Icon name="account" size={24} color="white" style={styles.icon} />
          <Text style={styles.user_info}>AD : {username?.toUpperCase()}</Text> 
        </View>
        <View style={styles.user_info_container}>
          <Icon name="calendar" size={24} color="white" style={styles.icon} />
          <Text style={styles.user_info}>YAŞ : {userData.age}</Text>
        </View>
        <View style={styles.user_info_container}>
          <Icon name="ruler" size={24} color="white" style={styles.icon} />
          <Text style={styles.user_info}>BOY/KİLO : {userData.height}/{userData.weight}</Text>
        </View>
        <View style={styles.user_info_container}>
          <Icon name="gender-male-female" size={24} color="white" style={styles.icon} />
          <Text style={styles.user_info}>CİNSİYET : {userData.gender?.toUpperCase()}</Text>
        </View>
        <View style={styles.user_info_container}>
          <Icon name="water" size={24} color="white" style={styles.icon} />
          <Text style={styles.user_info}>HEDEF ML : {userData.targetMl} ML</Text>
        </View>
      </View>
    </View>
  );
};

export default User;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
    padding: 10,
  },
  header: {
    fontSize: 24,
    margin: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  user_container: {
    padding: 15,
    marginTop: 10,
  },
  user_info_container: {
    backgroundColor: '#87CEFA',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#191970',
    padding: 10,
    borderRadius: 8,
  },
  user_info: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    lineHeight: 25,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
