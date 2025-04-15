import React from 'react'
import { View ,TouchableOpacity, Text,StyleSheet} from 'react-native'

const Button = (text,onPress) => {
  return (

    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.title}> {text} </Text>
    </TouchableOpacity>



)
}


export default Button

const styles=StyleSheet.create({
    container:{
     padding:5,
     margin:10,
     backgroundColor:'#e0e0e0',
     borderRadius:5,
     alignItems:'center',
    },
    title:{
        fontWeight:'bold',
        fontSize:17,
        color:'white',

    }

})