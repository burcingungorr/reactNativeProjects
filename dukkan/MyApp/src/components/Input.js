import React from 'react'
import { TextInput, View ,StyleSheet} from 'react-native'

const Input = (placeholder,onType,value) => {
  return (
    <View style={styles.container}>
        <TextInput style={styles.input}
        placeholder={placeholder} 
        onchangeText={onType} 
        value={value}/>
    </View>
  )
}

export default Input

const styles=StyleSheet.create({
    container:{
     padding:5,
     margin:10,
     backgroundColor:'#e0e0e0',
     borderRadius:5,
    },
    input:{
     flex:1
    }


})