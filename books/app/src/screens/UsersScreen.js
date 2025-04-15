import React from 'react'
import { StyleSheet, View } from 'react-native'
import Title from '../components/Title'
import UserCard from '../components/UsersScreenComponents/UserCard'

const UsersScreen = ({navigation}) => {
  return (

  <View style={styles.container}>
  <Title title={'KULLANICILAR'} navigation={navigation}/>
  <UserCard/>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default UsersScreen