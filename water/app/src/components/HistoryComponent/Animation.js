import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Animation() {
  return (
    <View style={styles.container}>
      <LottieView 
        source={require('../../assets/animation.json')} 
        autoPlay 
        loop 
        style={styles.animation} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation:{
     width: 200, 
     height: 150,
     marginTop:100
     }
});
