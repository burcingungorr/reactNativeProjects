import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Title = ({title}) => {
  return (
 <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
</View>    )
}

const styles=StyleSheet.create({
    container:{
    backgroundColor:'#a95e13',
    alignItems:'center'
    },
  title:{
    color:'white',
    fontSize:30,
    fontWeight:'bold',
    margin:15
  
  }
})
export default Title