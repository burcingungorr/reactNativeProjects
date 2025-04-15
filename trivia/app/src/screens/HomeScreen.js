import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Titles from '../components/Titles'
import Username from '../components/HomeScreenComponent/Username'
import BestScore from '../components/HomeScreenComponent/BestScore'

const HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
     <Titles title={'TRIVIA'} />
     <Username navigation={navigation}/>

     <BestScore navigation={navigation}/>
     </SafeAreaView>

 )
}

const styles=StyleSheet.create({
  container:{
    flex:1,    
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'mediumorchid',
  },

})

export default HomeScreen