import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ResultsInfo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>

        <Icon 
          name="replay" 
          size={30} 
          color="#000" 
          style={styles.icon} 
          onPress={() => navigation.navigate('Quiz')}  
        />
        <Text style={styles.text}>Tekrar Oyna</Text>
      </View>
      <View style={styles.item}>

        <Icon 
          name="home" 
          size={30} 
          color="#000" 
          style={styles.icon} 
          onPress={() => navigation.navigate('Home')} 
        />
        <Text style={styles.text}>Anasayfa</Text>
      </View>
      <View style={styles.item}>

        <Icon 
          name="trophy" 
          size={30} 
          color="#000" 
          style={styles.icon} 
          onPress={() => navigation.navigate('Lead')}  
        />
        <Text style={styles.text}>Liderlik</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 25,
    marginTop: 250
  },
  item: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 5
  },
  icon: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 22,
    borderRadius: 40,
    padding: 10,
    backgroundColor: '#ccc'
  }
});

export default ResultsInfo;
