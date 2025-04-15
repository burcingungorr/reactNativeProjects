import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useUser } from './UserContext';  

const Level = ({ navigation }) => {
  const { username } = useUser();
  const [difficulty, setDifficulty] = useState('');

  const handleDifficultySelection = (difficulty) => {
    setDifficulty(difficulty);
    navigation.navigate('Quiz', { difficulty }); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_body}></View>

      <View style={styles.container_down}> 
        <Text style={styles.title}>Seviyeni Seç {username}!</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDifficultySelection('Kolay')}
        >
          <Text style={styles.buttonText}>Kolay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleDifficultySelection('Zor')}
        >
          <Text style={styles.buttonText}>Zor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  container_down:{
    borderColor:'yellow',
    borderWidth:2,
    padding:60,
    borderRadius:30,
    backgroundColor:'white',
    marginBottom:50,
     width:'80%',
     height:'55%',
     justifyContent: 'center',
    alignItems: 'center',
    },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'mediumorchid',
    padding: 15,
    borderRadius: 5,
    width: 200,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'white'
  },
});

export default Level;
