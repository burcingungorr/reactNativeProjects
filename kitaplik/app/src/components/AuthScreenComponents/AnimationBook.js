import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

const AnimationBook = () => {
  let animation;

  useEffect(() => {
    return () => {
      animation?.reset();
    };
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animation => { animation = animation; }}
        source={require('./animation.json')}
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
  },
  animation: {
    width: 200,  
    height: 200, 
  },
});

export default AnimationBook;
