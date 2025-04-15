import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const FloattingButton = ({ onPress }) => {
  return (
    
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

export default FloattingButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,           
    right: 20,            
    borderRadius: 50,     
    width: 60,          
    height: 60,           
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: '#FF6347', 
  },
  plus: {
    color: 'white',
    fontSize: 30
  }
});
