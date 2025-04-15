import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import heart from '../../assets/icons/heart.png'; 

const Favorites = ({ isSelected, onPress }) => {
    const [selectedHeart, setSelectedHeart] = useState(false);
    const [selectedCheck, setSelectedCheck] = useState(false);
  
  return (
    <View style={styles.container}>
    <View style={[styles.tab, isSelected && styles.selectedTab]}>
      <TouchableOpacity onPress={onPress}>
              <Image
                source={heart}
                style={[
                  styles.icon,
                  { tintColor: selectedHeart ? 'red' : 'gray' },  
                ]}
              />
            </TouchableOpacity>
     {isSelected && <Text style={styles.label}>Favoriler</Text>}
           </View>
           
           {isSelected && (
             <View style={styles.content}>
               <Text>Favoriler Boş</Text>
             </View>
           )}</View>
  );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
      },
  tab: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  selectedTab: {
    borderBottomWidth: 1,
    borderBottomColor: 'red', 
  },
  icon: {
    marginBottom: 5,
    width: 30,
    height: 30,
  },
  label: {
    fontSize: 12,
    color: 'red',
  },
  content: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default Favorites;
