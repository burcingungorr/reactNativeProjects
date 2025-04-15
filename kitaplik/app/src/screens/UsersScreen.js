import React from 'react'
import { StyleSheet, View } from 'react-native'
import Title from '../components/Title'
import UserCard from '../components/UsersScreenComponents/UserCard'

const UsersScreen = () => {
  return (

  <View style={styles.container}>
  <Title title={'KULLANICILAR'} />
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