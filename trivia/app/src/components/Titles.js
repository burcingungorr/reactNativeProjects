import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Titles = ({title}) => {
  return (
 <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
</View>    )
}

const styles=StyleSheet.create({
  title:{
    color:'white',
    fontSize:30,
    fontWeight:'bold',
    marginTop:40
  
  }
})
export default Titles