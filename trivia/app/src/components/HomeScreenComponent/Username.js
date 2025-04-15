import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useUser } from '../SettingsScreenComponent/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Username = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [savedUsername, setSavedUsername] = useState(null); 
  const { setUsername: setContextUsername } = useUser();

  const handleSave = async () => {
    if (username.trim()) {
      try {
        await AsyncStorage.setItem('username', username);
        setContextUsername(username);

        await firestore()
          .collection('users')
          .doc(username)
          .set({
            username: username,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });

        setSavedUsername(username); 
      } catch (error) {
        console.error('Firestore hatası:', error);
      }
    } else {
      console.log('Uyarı', 'Kullanıcı adı giriniz.');
    }
  };

  const handleContinue = () => {
    if (username.trim()) {
      navigation.navigate('Settings', { username });
    } else {
      console.log('Uyarı', 'Kullanıcı adı giriniz.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı Adı"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.button_text}>KAYDET</Text>
        </TouchableOpacity>
      </View>

      {savedUsername && (
        <Text style={styles.savedText}>Kullanıcı Adı: {savedUsername}</Text>
      )}

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
      <Icon name="arrow-right-thick" size={35} color="black" style={styles.icon} />
        <Text style={styles.continueButtonText}>DEVAM ET</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    marginRight: 10,
    padding: 15,
    color: 'white',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'black',
    width: 70,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  savedText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  continueButton: {
    marginTop: 60,
    backgroundColor: 'mediumorchid',
    paddingTop: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center'
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 40,
    padding: 5,
    backgroundColor: 'white',
    marginHorizontal:10,
  },
});

export default Username;
