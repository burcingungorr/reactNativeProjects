import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useUser } from './UserContext';

const Username = () => {
  const { username } = useUser(); 

  return (
    <View style={styles.user_container}>
      <Text style={styles.user_container_text}>Merhaba {username}!</Text>
    </View>
  );
};


export default Username;


const size = Dimensions.get('window'); 

const styles = StyleSheet.create({

user_container: {
    backgroundColor: '#87CEFA',
    marginTop: 25,
    height: size.height / 16, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  user_container_text:{
    fontSize:17,
    color:'white'
  }});
