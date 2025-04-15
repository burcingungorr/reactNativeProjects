import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const App = () => {
  useEffect(() => {
    const init = async () => {
//izin
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Bildirim izni reddedildi');
          return;
        }
      }

   // token
      const token = await messaging().getToken();
      console.log('FCM TOKEN:', token);


    //kanal oluştur 
      PushNotification.createChannel(
        {
          channelId: 'default-channel-id',
          channelName: 'Genel Bildirim Kanalı',
        },
        created => console.log(`Kanal oluşturuldu: ${created}`),
      );

     
      // Uygulama açıkken gelen mesaj
      const unsubscribe = messaging().onMessage(async remoteMessage => {

        PushNotification.localNotification({
          channelId: 'default-channel-id',
          title: remoteMessage.notification?.title,
          message: remoteMessage.notification?.body,
        });
      });

  
      return unsubscribe;
    };

    init();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 18, marginBottom: 20}}>
        Firebase Push Bildirim Test
      </Text>

    </View>
  );
};

export default App;


//fbxVoZ2RTRmizWnvRTh-Z8:APA91bHVRaSjOW4fshthCBBg6IkK9kv-UqhfY1BSuMLMDjh7eF4NyxaokYx7RHZve-MoKfjnq24Mhy_Oj63C7m4R3GezBjrSwJe2uTCU5GTjtCIJzi351TI