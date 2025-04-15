import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import check from '../../assets/icons/check-bold.png'; 
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const Readed = ({ isSelected, onPress }) => {
  const [readedBooks, SetReadedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth().currentUser;
  

    useEffect(() => {
      const fetchReaded = async () => {
        if (!user) {
          console.log('Kullanıcı girişi yapılmamış.');
          setLoading(false);
          return;
        }

        try {
          const snapshot = await firestore()
            .collection('users')
            .doc(user.uid)
            .collection('readed')
            .where('isReaded', '==', true)
            .get();
  
          const books = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          SetReadedBooks(books);
        } catch (error) {
          console.error('Okunan kitaplar getirilirken hata:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchReaded();
  }, [user]);


  if (loading) {
    return <ActivityIndicator size="large" color="red" />;
  }

  return (
    <View style={styles.container}> 
      <View style={[styles.tab, isSelected && styles.selectedTab]}>
        <TouchableOpacity onPress={onPress}>
               <Image
                 source={check}
                 style={[
                   styles.icon,
                   { tintColor: isSelected ? 'green' : 'gray' }, 
                 ]}
               />
             </TouchableOpacity>
        {isSelected && <Text style={styles.label}>Okunanlar</Text>}
      </View>
      
   {isSelected && (
           <FlatList
             data={readedBooks}
             keyExtractor={(item) => item.id}
             renderItem={({ item }) => (
               <View style={styles.card}>
                 {item.coverId ? (
                   <Image
                     source={{ uri: `https://covers.openlibrary.org/b/id/${item.coverId}-L.jpg` }}
                     style={styles.coverImage}
                     resizeMode="contain"
                   />
                 ) : (
                   <Text>Kapak Yok</Text>
                 )}
                 <View style={styles.info}>
                   <Text style={styles.title}>{item.title}</Text>
                   <Text style={styles.author}>{item.author}</Text>
                 </View>
               </View>
             )}
             ListEmptyComponent={<Text style={styles.emptyText}>Okunan kitap bulunamadı.</Text>}
           />
         )}
       </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'green',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: 'green',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'gray',
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e7bd92',
    borderRadius: 8,
    marginBottom: 12,
    padding: 5,
  },
  coverImage: {
    width: 50,
    height: 70,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  author: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
  },
});

export default Readed;
