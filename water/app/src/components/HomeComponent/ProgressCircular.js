import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSelector } from 'react-redux';

const ProgressCircular = () => {
  const [fill, setFill] = useState(0); 
  const totalWaterIntake = useSelector(state => state.totalWater.totalWaterIntake);  
  const targetWaterIntake = useSelector(state => state.totalWater.targetWaterIntake);

  useEffect(() => {
    if (targetWaterIntake > 0) {
      setFill((totalWaterIntake / targetWaterIntake) * 100);
    }
  }, [totalWaterIntake, targetWaterIntake]);


  return (
    <View style={styles.progress_container}>
        <Text style={styles.progress_container_text}>GÜNLÜK SU TAKİBİ</Text>
      <AnimatedCircularProgress
        size={200}
        width={18}
        fill={fill}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
      >
        {
          () => (
            <Text style={styles.text}>
              {Math.round(fill)}% 
            </Text>
          )
        }
      </AnimatedCircularProgress>
    </View>
  );
};

export default ProgressCircular;

const styles = StyleSheet.create({
  progress_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  progress_container_text:{
    fontSize:25,
    color:'white',
    fontWeight:'bold',
    marginBottom:20
  }
});
