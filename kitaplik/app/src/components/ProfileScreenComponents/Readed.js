import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import check from '../../assets/icons/check-bold.png'; 

const Readed = ({ isSelected, onPress }) => {
    const [selectedHeart, setSelectedHeart] = useState(false);
    const [selectedCheck, setSelectedCheck] = useState(false);
  
  return (
    <View style={styles.container}>
      <View style={[styles.tab, isSelected && styles.selectedTab]}>
        <TouchableOpacity onPress={onPress}>
               <Image
                 source={check}
                 style={[
                   styles.icon,
                   { tintColor: selectedCheck ? 'green' : 'gray' }, 
                 ]}
               />
             </TouchableOpacity>
        {isSelected && <Text style={styles.label}>Okunanlar</Text>}
      </View>
      
      {isSelected && (
        <View style={styles.content}>
          <Text>Okunanlar Boş</Text>
        </View>
      )}
    </View>
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
    borderBottomColor: 'green', 
  },
  icon: {
    marginBottom: 5,
    width: 30,
    height: 30,
  },
  label: {
    fontSize: 12,
    color: 'green',
  },
  content: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default Readed;
