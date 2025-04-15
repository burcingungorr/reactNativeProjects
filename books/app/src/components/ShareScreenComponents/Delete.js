import { View, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Delete = ({ share }) => {
  const currentUser = auth().currentUser;

  if (currentUser?.uid !== share.uid) {
    return null; 
  }
  const handleDelete = async () => {
    try {
      await firestore().collection('global_shared').doc(share.id).delete();
      Alert.alert('Başarılı', 'Paylaşım silindi.');
    } catch (error) {
      Alert.alert('Hata', 'Silme işlemi başarısız.');
    }
  };


  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <TouchableOpacity onPress={handleDelete}>
        <Icon name="delete" size={25} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default Delete;
