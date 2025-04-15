import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { addShare } from '../../redux/shareSlice';

const AddShare = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');

  const dispatch = useDispatch(); 

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleImagePick = () => {
    console.log('görsel seç')
  };

  const handlePost = () => {
    if (!bookName || !authorName || !text ) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const newShare = { bookName, authorName, text, image };
    dispatch(addShare(newShare));
    setText('')
    setBookName('')
    setAuthorName('')
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.openButton} onPress={toggleModal}>
        <Text style={styles.openButtonText}>Kitap Yorumlarını Paylaş</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleModal}
      >
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
              style={styles.textInput}
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
   
  },
  openButton: {
    backgroundColor: '#e7bd92',
    padding: 10,
    borderRadius: 50,
    width:'50%',
    marginHorizontal:100,
    marginVertical:20,
    borderWidth:1,
    borderColor:'#a95e13'
    
  },
  openButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight:'bold'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagePickerButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: 'white',
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  textInput: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  sendBtn: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  closeBtn: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AddShare;