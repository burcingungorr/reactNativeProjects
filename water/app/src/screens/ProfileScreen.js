import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import User from '../components/ProfileComponents/User';
import LocalNotification from '../components/ProfileComponents/LocalNotification';
import PushNotification from 'react-native-push-notification';
import LogOut from '../components/ProfileComponents/LogOut';

const ProfileScreen = () => {


  return (
    <View style={styles.container}>
      <User/>
      <LocalNotification /> 
      <LogOut/>

    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191970', 
    flex: 1
  },
});
