import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Title from '../components/Title';
import AddShare from '../components/ShareScreenComponents/AddShare';
import ShareCard from '../components/ShareScreenComponents/ShareCard';

const ShareScreen = () => {
  return (
    <View style={styles.container}>
      <Title title={'PAYLAŞ'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <AddShare />
        <ShareCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20, 
  },
});

export default ShareScreen;
