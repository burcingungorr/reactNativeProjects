import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation => { animation = animation; }}
        source={require('../assets/animations/splash.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a95e13',
    
  },
  animation: {
    width: 200,  
    height: 200, 
  },
});

export default SplashScreen;
