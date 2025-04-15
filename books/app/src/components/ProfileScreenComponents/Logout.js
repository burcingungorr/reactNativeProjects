import React from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';  
import { useNavigation } from '@react-navigation/native'; 

const Logout = () => {
  const navigation = useNavigation();  

  const handleLogout = async () => {
    try {
      await auth().signOut(); 
      navigation.navigate('Login'); 
    } catch (error) {
      Alert.alert('Çıkış Hatası', 'Çıkış yaparken bir hata oluştu.');
    }
  };

  return (
    <View style={styles.iconContainer}>
      <Icon
        name='logout'
        size={30}
        color='black'
        onPress={handleLogout}  
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    padding:10
  },
});

export default Logout;
