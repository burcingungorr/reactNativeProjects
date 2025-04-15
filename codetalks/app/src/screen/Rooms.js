import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TextInput, TouchableOpacity } from 'react-native';
import FloattingButton from '../component/FloattingButton';
import RoomCard from '../component/RoomCard';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; 

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [roomName, setRoomName] = useState('');
  const navigation = useNavigation(); 
  const user = auth().currentUser; 

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('rooms')
      .onSnapshot(snapshot => {
        const fetchedRooms = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(fetchedRooms);
      });

    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    setModalVisible(true);
  }; 

  const handleSave = async () => {
    if (roomName.trim().length > 0 && user) {
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      const username = userDoc.exists ? userDoc.data().username : 'Bilinmeyen';

      await firestore().collection('rooms').add({
        name: roomName,
        createdBy: username,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      setRoomName('');
      setModalVisible(false);
    }
  };

  const goRoom = (room) => {
    navigation.navigate('ChatRoom', { roomName: room.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.roomTitle}>Odalar</Text>
      
      <FlatList
        data={rooms}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goRoom(item)}>
            <RoomCard name={item.name} createdBy={item.createdBy} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />

      <FloattingButton onPress={handleAdd} />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Oda Adı Giriniz</Text>
            <TextInput
              style={styles.input}
              placeholder="Oda Adı"
              value={roomName}
              onChangeText={setRoomName}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Kaydet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>İptal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  roomTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
    color: '#FF6347'
  },
});