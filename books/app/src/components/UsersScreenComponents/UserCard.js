import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UserCard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await firestore().collection('users').get();
  
        if (snapshot.empty) {
          console.log('kullanici bulunamadi!');
        } else {
          const userList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setUsers(userList);
        }
  
        setLoading(false); 
      } catch (error) {
        console.error('hata oluştu:', error);
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  

  const handleProfile = (userName) => {
    console.log(`${userName} profilinde`);
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleProfile(item.username)} 
    >
      <Image
        source={
          item.profilePicture
            ? { uri: item.profilePicture }
            : require('../../assets/pp/user.png')
        }
        style={styles.profileImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.username}</Text> 
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#a95e13" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Kullanıcı Ara"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  searchInput: {
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 16,
    fontSize: 16,
    borderColor: '#a95e13',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#a95e13',
    marginVertical: 7,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#a95e13',
  },
  textContainer: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserCard;
