import React from 'react'
import { View,Text, StyleSheet } from 'react-native'
import HistoryCalendar from '../components/HistoryComponent/HistoryCalendar'
import Animation from '../components/HistoryComponent/Animation'

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <HistoryCalendar/>
      <Animation/>
    </View>
  )
}



export default HistoryScreen


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191970', 
    flex:1

  },
});