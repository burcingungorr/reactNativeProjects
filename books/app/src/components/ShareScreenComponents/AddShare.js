import React, { useState, useEffect } from 'react';
import {
  View, Text, Modal, StyleSheet, TextInput, Image, TouchableOpacity, Alert
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addShare, setShares } from '../../redux/shareSlice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import uuid from 'react-native-uuid';

const AddShare = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');

  const dispatch = useDispatch();
  const shares = useSelector(state => state.shares.shares);

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Hata', 'Görsel seçilemedi.');
        return;
      }
      const uri = response.assets?.[0]?.uri;
      setImage(uri);
    });
  };

  const handlePost = async () => {
    if (!bookName || !authorName || !text) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Hata', 'Lütfen giriş yapınız.');
      return;
    }

    try {
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      const userData = userDoc.data();
      const userName = userData?.username || 'Anonim';

      const shareId = uuid.v4();
      const newShare = {
        bookName,
        authorName,
        text,
        image,
        userName,
        uid: user.uid,
        timestamp: firestore.FieldValue.serverTimestamp(),
      };

      await firestore().collection('global_shared').doc(shareId).set(newShare);
      dispatch(addShare({ ...newShare, id: shareId }));

      setText('');
      setBookName('');
      setAuthorName('');
      setImage(null);
      toggleModal();
    } catch (error) {
      Alert.alert('Hata', 'Paylaşım kaydedilemedi.');
    }
  };

  const fetchShares = async () => {
    try {
      const snapshot = await firestore()
        .collection('global_shared')
        .orderBy('timestamp', 'desc')
        .get();

      const shareList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setShares(shareList));
    } catch (error) {
      Alert.alert('Hata', 'Veriler yüklenemedi.');
    }
  };

  useEffect(() => {
    fetchShares();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.openButton} onPress={toggleModal}>
        <Text style={styles.openButtonText}>Kitap Yorumlarını Paylaş</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide" transparent onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Paylaşım Yap</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Kitap Adını Yazın..."
              value={bookName}
              onChangeText={setBookName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Yazar Adını Yazın..."
              value={authorName}
              onChangeText={setAuthorName}
            />

            <TouchableOpacity onPress={handleImagePick} style={styles.imagePickerButton}>
              <Text style={styles.imagePickerButtonText}>Görsel Yükle</Text>
            </TouchableOpacity>

            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

            <TextInput
              style={[styles.textInput, { height: 100 }]}
              placeholder="Yorumunuzu yazın..."
              multiline
              value={text}
              onChangeText={setText}
            />

            <View style={styles.btnGroup}>
              <TouchableOpacity onPress={handlePost} style={styles.sendBtn}>
                <Text style={styles.btnText}>Gönder</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal} style={styles.closeBtn}>
                <Text style={styles.btnText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#f8f8f8', 
    flex: 1, 
    padding: 20 },
  openButton: {
    backgroundColor: '#e7bd92', 
    padding: 10, 
    borderRadius: 50,
    width: '60%', 
    alignSelf: 'center',
    marginVertical: 20,
    borderWidth: 1, 
    borderColor: '#a95e13',
  },
  openButtonText: { 
    color: 'white', 
    fontSize: 15, 
    fontWeight: 'bold', 
    textAlign: 'center' },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 10, 
    width: '80%', 
    alignItems: 'center' },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 20 },
  imagePickerButton: { 
    backgroundColor: '#a95e13', 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 20 },
  imagePickerButtonText: { 
    color: 'white', 
    fontSize: 16 },
  imagePreview: {
     width: 100, 
     height: 100, 
     borderRadius: 10,
      marginBottom: 20 },
  textInput: { 
    width: '100%', 
    borderColor: '#ccc', 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 20, 
    borderRadius: 5, 
    textAlignVertical: 'top' },
  btnGroup: { 
    flexDirection: 'row', 
    justifyContent: 'space-around',
     width: '100%' },
  sendBtn: { 
    backgroundColor: '#4CAF50',
     padding: 10, 
     borderRadius: 5, 
     flex: 1, 
     marginRight: 10 },
  closeBtn: { 
    backgroundColor: '#f44336', 
    padding: 10, 
    borderRadius: 5, 
    flex: 1, 
    marginLeft: 10 },
  btnText: { 
    color: 'white', 
    textAlign: 'center', 
    fontSize: 16 },
  shareCard: { 
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 5, 
    marginBottom: 10,
     borderWidth: 1, 
     borderColor: '#ddd' },
});

export default AddShare;
