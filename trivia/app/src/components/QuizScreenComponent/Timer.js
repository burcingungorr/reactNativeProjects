import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const Timer = ({ totalTime = 10, onTimeUp }) => {
  const [remainingTime, setRemainingTime] = useState(totalTime);

  useEffect(() => {
    if (remainingTime === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  const fill = (remainingTime / totalTime) * 100;

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={100}
        width={10}
        fill={fill}
        tintColor="white"
        backgroundColor="#c37fd4"
      >

        {
          () => (
            <Text style={styles.timerText}>{remainingTime}s</Text>
          )
        }
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 15,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Timer;
