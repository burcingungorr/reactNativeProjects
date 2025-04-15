import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';

const users = [
  { id: 1, name: 'Burçin Güngör', profilePicture: 'profile1.jpg' },
  { id: 2, name: 'Emre Önre', profilePicture: 'profile2.jpg' },
  { id: 3, name: 'Başak Köseoğlu', profilePicture: 'profile3.jpg' },
  { id: 4, name: 'Zeynep İmzaoğlu', profilePicture: 'profile4.jpg' },
];

const UserCard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfile = (userName) => {
    console.log(`${userName} profilinde`);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => handleProfile(item.name)}
    >
      <Image source={{ uri: item.profilePicture }} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

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
        keyExtractor={(item) => item.id.toString()}
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
    borderColor: '#ccc',
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
