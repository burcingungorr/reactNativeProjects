import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Title from '../components/Title';
import ProfileInfo from '../components/ProfileScreenComponents/ProfileInfo';
import ProfileImg from '../components/ProfileScreenComponents/ProfileImg';
import Favorites from '../components/ProfileScreenComponents/Favorites';
import Readed from '../components/ProfileScreenComponents/Readed';
import Logout from '../components/ProfileScreenComponents/Logout';

const ProfileScreen = ({navigate}) => {
  const [selectedTab, setSelectedTab] = useState('favorites');

  return (
    <View style={styles.container}>
      <Title title={'PROFİL'} />
      <Logout navigate={navigate} />
      <ProfileImg />
      <ProfileInfo />
      <View style={styles.downcontainer}>
        <Favorites 
          isSelected={selectedTab === 'favorites'} 
          onPress={() => setSelectedTab('favorites')} 
        />
        <Readed
          isSelected={selectedTab === 'readed'} 
          onPress={() => setSelectedTab('readed')} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  downcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    
  },
});

export default ProfileScreen;
