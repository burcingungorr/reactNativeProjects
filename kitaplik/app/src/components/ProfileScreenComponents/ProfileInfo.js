import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProfileInfo = () => {
  return (
    <View>
        <Text style={styles.name} >Burçin Güngör</Text>
    </View>
  )
}

const styles=StyleSheet.create({
    name:{
        fontSize:18, 
        textAlign:'center',
        marginVertical:20
    }
})

export default ProfileInfo