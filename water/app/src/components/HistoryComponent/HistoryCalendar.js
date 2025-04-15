import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ],
  monthNamesShort: [
    'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'
  ],
  dayNames: [
    'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'
  ],
  dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
  today: 'Bugün'
};

LocaleConfig.defaultLocale = 'tr';

const HistoryCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [waterIntake, setWaterIntake] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const userId = auth().currentUser?.uid;
      if (userId) {
        const dateRef = firestore()
          .collection('users')
          .doc(userId)
          .get();

        dateRef.then((userDoc) => {
          if (userDoc.exists) {
            const data = userDoc.data();
            const intake = data?.[selectedDate];
            setWaterIntake(intake !== undefined ? intake : null);
          } else {
            setWaterIntake(null);
          }
        });
      }
    }
  }, [selectedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TAKİP GEÇMİŞİ</Text>

      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#87CEFA',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#dd99ee',
        }}
        monthFormat={'yyyy MMMM'}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#87CEFA' },
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
      />

      {selectedDate ? (
        <>
          <Text style={styles.Date}>{selectedDate}</Text>
          {waterIntake !== null ? (
            <Text style={styles.selectedDate}>
              Bu tarihte {waterIntake}ml su içtin!
            </Text>
          ) : (
            <Text style={styles.selectedDate}>Bu tarihte veri bulunmamaktadır.</Text>
          )}
        </>
      ) : (
        <Text style={styles.selectedDate}>Bir Tarih Seçin...</Text> 
      )}
    </View>
  );
};

export default HistoryCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
    padding: 10,
  },
  header: {
    fontSize: 24,
    margin: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  Date: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
  selectedDate: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: '#87CEFA',
    padding: 20,
    margin: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
