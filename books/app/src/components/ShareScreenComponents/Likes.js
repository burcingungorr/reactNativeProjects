import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import like from '../../assets/icons/thumb-up.png'; 
import dislike from '../../assets/icons/thumb-down.png'; 
import auth from '@react-native-firebase/auth';

const Likes = ({ shareId }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [userReaction, setUserReaction] = useState(null); 
  const currentUser = auth().currentUser;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('global_shared')
      .doc(shareId)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setLikeCount(data.likeCount || 0);
          setDislikeCount(data.dislikeCount || 0);
        }
      });

    return () => unsubscribe();
  }, [shareId]);

  const handleReaction = async (type) => {
    if (!currentUser) return;

    const docRef = firestore().collection('global_shared').doc(shareId);
    const userReactionRef = docRef.collection('reactions').doc(currentUser.uid);
    const docSnapshot = await userReactionRef.get();

    if (!docSnapshot.exists) {

      await userReactionRef.set({ type });
      await docRef.update({
        [`${type}Count`]: firestore.FieldValue.increment(1),
      });
      setUserReaction(type);
    } else {
      const previousType = docSnapshot.data().type;
      if (previousType === type) {

        await userReactionRef.delete();
        await docRef.update({
          [`${type}Count`]: firestore.FieldValue.increment(-1),
        });
        setUserReaction(null);
      } else {

        await userReactionRef.set({ type });
        await docRef.update({
          [`${previousType}Count`]: firestore.FieldValue.increment(-1),
          [`${type}Count`]: firestore.FieldValue.increment(1),
        });
        setUserReaction(type);
      }
    }
  };

  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity onPress={() => handleReaction('like')}>
        <Image
          source={like}
          style={[
            styles.icon,
            { tintColor: userReaction === 'like' ? 'green' : 'gray' },
          ]}
        />
      </TouchableOpacity>
      <Text style={styles.count}>{likeCount}</Text>

      <TouchableOpacity onPress={() => handleReaction('dislike')}>
        <Image
          source={dislike}
          style={[
            styles.icon,
            { tintColor: userReaction === 'dislike' ? 'red' : 'gray' },
          ]}
        />
      </TouchableOpacity>
      <Text style={styles.count}>{dislikeCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
  count: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default Likes;
