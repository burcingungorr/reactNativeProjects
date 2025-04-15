import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native'; 
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';  

const { width } = Dimensions.get('window');

const ChatRoom = () => {
  const route = useRoute();
  const { roomName } = route.params; 
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [username, setUsername] = useState('Bilinmeyen'); 

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;  
      if (user) {
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          setUsername(userDoc.data().username || 'Bilinmeyen'); 
        }
      }
    };

    fetchUserData();

    const unsubscribe = firestore()
      .collection('rooms')
      .doc(roomName)
      .collection('messages')
      .orderBy('createdAt')
      .onSnapshot(snapshot => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

    return () => unsubscribe();
  }, [roomName]);

  const handleAddMessage = async () => {
    if (messageText.trim().length > 0) {
      await firestore()
        .collection('rooms')
        .doc(roomName)
        .collection('messages')
        .add({
          text: messageText,
          createdBy: username,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      setMessageText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.roomTitle}>{roomName}</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{item.text}</Text>
            <Text style={styles.createdBy}>Gönderen: {item.createdBy}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mesajınızı yazın..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity onPress={handleAddMessage} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
    color: '#FF6347',
  },
  listContainer: {
    paddingTop: 20,
    width: '100%',
  },
  messageContainer: {
    width: width * 0.9,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 5,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: 16,
    textAlign: 'left',
    color: '#ffffff',
    backgroundColor: '#FF6347',
    padding: 8, 
    borderRadius: 8,
    fontSize: 18,
  },
  createdBy: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    margin: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  addBtn: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  addBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
