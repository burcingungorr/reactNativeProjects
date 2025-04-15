import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, Platform, PermissionsAndroid, Modal, Linking } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ProfileImg = () => {
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); 

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Kamera İzni',
          message: 'Uygulamanın kamerayı kullanmasına izin verin.',
          buttonNeutral: 'Daha Sonra Sor',
          buttonNegative: 'Reddet',
          buttonPositive: 'İzin Ver',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version <= 28) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Depolama İzni',
            message: 'Uygulamanın fotoğrafları kaydetmesi için depolama izni gerekli.',
            buttonNeutral: 'Daha Sonra Sor',
            buttonNegative: 'Reddet',
            buttonPositive: 'İzin Ver',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };


  const handleButtonPress = () => {

    setModalVisible(true);
  };

  const openCamera = async () => {
    const isCameraPermissionGranted = await requestCameraPermission();
    if (!isCameraPermissionGranted) {
      Alert.alert(
        'Kamera İzni Gerekli',
        'Kamera kullanabilmek için izin vermelisiniz.',
        [{ text: 'Tamam'}],
        { cancelable: false }
      );
      return;
    }

    const isStoragePermissionGranted = await requestStoragePermission();
    if (!isStoragePermissionGranted) {
      Alert.alert(
        'Depolama İzni Gerekli',
        'Fotoğrafları kaydetmek için depolama izni vermelisiniz.',
        [{ text: 'Tamam' }],
        { cancelable: false }
      );
      return;
    }

    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
    });

    if (result.didCancel) {
      console.log('Kamera işlemi iptal edildi.');
    } else if (result.errorCode) {
      console.log('Kamera hatası:', result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
      console.log('Fotoğraf URI:', result.assets[0].uri);
    }
    setModalVisible(false);
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.didCancel) {
      console.log('Galeri işlemi iptal edildi.');
    } else if (result.errorCode) {
      console.log('Galeri hatası:', result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
      console.log('Fotoğraf URI:', result.assets[0].uri);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {photo ? (
        <Image source={{ uri: photo }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text>Fotoğraf yok</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Fotoğraf Seç / Çek</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Bir seçenek belirleyin:</Text>
            <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
              <Text style={styles.modalButtonText}>Kamera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={openGallery}>
              <Text style={styles.modalButtonText}>Galeri</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)} >
              <Text style={styles.modalButtonText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileImg;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#a95e13',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  // Modal styling
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
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#a95e13',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
});
