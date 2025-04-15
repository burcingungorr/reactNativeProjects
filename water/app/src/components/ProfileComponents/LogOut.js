import React from 'react';
import { TouchableOpacity, StyleSheet, Alert, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LogOut = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut(); 
      navigation.navigate('Login'); 
    } catch (error) {
      console.error("Logout error: ", error);
      Alert.alert("Çıkış Yapılamadı", "Bir hata oluştu. Tekrar deneyin.");
    }
  };

  return (
    <View  style={styles.logout_container}>
   <Text style={styles.text}>Çıkış Yap:</Text>
    <TouchableOpacity style={styles.container} onPress={handleLogout}>
      <Icon name="logout" size={30} color="#fff" />
    </TouchableOpacity>  
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
  text:{
    fontSize: 18,
    color:'white',
    marginLeft:15,
  },
  logout_container:{
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom:20

  }
});

export default LogOut;
