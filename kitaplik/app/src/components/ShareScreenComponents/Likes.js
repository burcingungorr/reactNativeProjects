import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import like from '../../assets/icons/thumb-up.png'; 
import dislike from '../../assets/icons/thumb-down.png'; 

const Likes = () => {
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
          source={like}
          style={[
            styles.icon,
            { tintColor: selectedHeart ? 'green' : 'gray' },  
          ]}
        />
      </TouchableOpacity>
      <Text>5</Text>

      <TouchableOpacity onPress={handleCheckPress}>
        <Image
          source={dislike}
          style={[
            styles.icon,
            { tintColor: selectedCheck ? 'red' : 'gray' }, 
          ]}
        />
      </TouchableOpacity>
      <Text>5</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    alignItems: 'center', 
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
});

export default Likes;
