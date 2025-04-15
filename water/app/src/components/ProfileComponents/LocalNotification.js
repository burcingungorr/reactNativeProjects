import React, { useEffect, useState } from 'react';
import PushNotification from 'react-native-push-notification';
import { PermissionsAndroid, Platform, Switch, View, Text, StyleSheet } from 'react-native';

const LocalNotification = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const requestNotificationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: 'Bildirim İzni',
              message: 'Uygulama size bildirim gönderebilir.',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Bildirim izni verildi');
          } else {
            console.log('Bildirim izni reddedildi');
          }
        } catch (err) {
          console.warn(err);
        }
      };
      requestNotificationPermission();
    }

    PushNotification.configure({
      onRegister: token => console.log('TOKEN:', token),

      onNotification: notification => {
        console.log('Bildirim Geldi:', notification);
      },

      permissions: { alert: true, badge: true, sound: true },
      popInitialNotification: true,
      requestPermissions: false,
    });

    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', 
        channelName: 'Varsayılan Kanal', 
        channelDescription: 'Varsayılan bildirim kanalı',
        importance: 4,
        vibrate: true,
        soundName: 'default', 
      },
      created => console.log(`Kanal oluşturuldu mu? ${created}`)
    );
  }, []);

  useEffect(() => {
    if (isEnabled) {
      sendInstantNotification();
      scheduleDailyNotification();
    }
  }, [isEnabled]);

  const sendInstantNotification = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id', 
      title: 'Su içmeyi unutma!',
      message: 'Uygulamaya gir ve içtiğin su miktarını ekle.',
    });
  };


  const scheduleDailyNotification = () => {
    const now = new Date();
    const scheduledTime = new Date();

    scheduledTime.setHours(20);
    scheduledTime.setMinutes(0);
    scheduledTime.setSeconds(0);

    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    PushNotification.localNotificationSchedule({
      channelId: 'default-channel-id', 
      title: 'Su içmeyi unutma!',
      message: 'Uygulamaya gir ve içtiğin su miktarını ekle.',
      date: scheduledTime,
      allowWhileIdle: true,
      repeatType: 'day',
    });
  };

  const toggleSwitch = () => setIsEnabled(prev => !prev);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bildirimleri Aç / Kapat:</Text>
      <Switch
        value={isEnabled}
        onValueChange={toggleSwitch}
        trackColor={{ false: 'grey', true: '#87CEFA' }}
        thumbColor={isEnabled ? '#87CEFA' : 'grey'}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    color: 'white',
    marginRight: 25,
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});

export default LocalNotification;
