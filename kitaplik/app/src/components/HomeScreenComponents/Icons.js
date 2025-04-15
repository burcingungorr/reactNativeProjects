import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import heart from '../../assets/icons/heart.png'; 
import check from '../../assets/icons/check-bold.png'; 

const Icons = () => {
  const [selectedHeart, setSelectedHeart] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState(false);

  const handleHeartPress = () => {
    setSelectedHeart(!selectedHeart); 
  };

  const handleCheckPress = () => {
    setSelectedCheck(!selectedCheck); 
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handleHeartPress}>
        <Image
          source={heart}
          style={[
            styles.icon,
            { tintColor: selectedHeart ? 'red' : 'gray' },  
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCheckPress}>
        <Image
          source={check}
          style={[
            styles.icon,
            { tintColor: selectedCheck ? 'green' : 'gray' }, 
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center', 
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 7,
  },
});

export default Icons;
