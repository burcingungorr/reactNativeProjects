import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MyResult from '../components/ResultScreenComponent/MyResult'
import ResultsInfo from '../components/ResultScreenComponent/ResultsInfo'
import Titles from '../components/Titles'

const ResultScreen = ({route,navigation} ) => {
  return (
     <View style={styles.container}>
      <View style={styles.container_body}>
        <Titles title={'Test Bitti!'}/>
      <MyResult route={route} />
      </View>
         <ResultsInfo navigation={navigation}/>
          </View>

  )
}

const styles=StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_body: {
    backgroundColor: 'mediumorchid',
    position: 'absolute', 
    top: 0, 
    width: '100%', 
    height: '33.33%', 
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    zIndex: -1, 
    justifyContent:'center',
    alignItems:'center'

  },
  container_down:{
    borderColor:'black',
    borderWidth:1,
    padding:60,
    borderRadius:30,
    backgroundColor:'white',
    marginBottom:150,
     width:'80%',
     height:'30%',
     justifyContent: 'center',
    alignItems: 'center',
    },
})
export default ResultScreen