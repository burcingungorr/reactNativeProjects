import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const SignButton = ({theme = 'primary',title,onPress}) => {
    const styles = theme === 'secondary' ? secondary : primary;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.button_text}> {title} </Text>
    </TouchableOpacity>
  )
}

export default SignButton


const base_styles = {
    button: {
        backgroundColor: '#FFD700', 
        width: '40%',               
        borderRadius: 7,
        borderWidth: 2,             
        alignItems: 'center',       
        justifyContent: 'center',   
        paddingVertical: 10,   
        margin:10     
      },
      button_text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      }
  };
  
  const primary = StyleSheet.create({
    button: {
      ...base_styles.button,
      backgroundColor: '#FFD700',
      borderColor: '#fff',     
 
    },
    button_text: {
      ...base_styles.button_text,
      color: 'white',
    },
  });
  
  const secondary = StyleSheet.create({
    button: {
      ...base_styles.button,
      backgroundColor: 'white',
      borderColor: '#FFD700',     

    },
    button_text: {
      ...base_styles.button_text,
      color: '#FFD700',
    },
  });