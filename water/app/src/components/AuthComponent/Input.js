import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Input = ({ placeholder, value, onChangeText, secureTextEntry }) => {
  return (
    <View style={styles.container}> 
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}              
        onChangeText={onChangeText}  
        secureTextEntry={secureTextEntry} 
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    marginBottom: 15,  
    alignItems:'center'

  },
  input: {
    backgroundColor: 'white',
    width: '90%',       
    borderRadius: 5,
    padding: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc', 
    fontSize: 15,
  }
});