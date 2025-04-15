import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addWater } from '../../redux/TotalWaterSlice';

const AddWater = () => {
  const dispatch = useDispatch(); 
  const totalWaterIntake = useSelector(state => state.totalWater.totalWaterIntake);  
  const targetWaterIntake = useSelector(state => state.totalWater.targetWaterIntake); 
  const [amount, setAmount] = useState('');  

  const handleAddWater = () => {
    if (amount) {
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        dispatch(addWater(parsedAmount));  
        setAmount(''); 
      } else {
        console.error("Geçersiz su miktarı:", amount);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => dispatch(addWater(-200))}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>

        <Icon name="cup" size={40} color="#87CEFA" style={styles.icon} />

        <TouchableOpacity onPress={() => dispatch(addWater(200))}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.volumeContainer}>
        <Text style={styles.volume}>{totalWaterIntake}ml</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Hızlı Ekle'
          placeholderTextColor='#DCDCDC'
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddWater}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.total}>Bugün toplam {totalWaterIntake}/{targetWaterIntake}ml su içtin!</Text>
        {totalWaterIntake >= targetWaterIntake && <Text style={styles.total}>Tebrikler!</Text>}
      </View>
    </>
  );
};

export default AddWater;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
  },
  text: {
    fontSize: 30,
    color: '#808080',
    marginHorizontal: 20,
    color: 'white',
  },
  icon: {
    marginHorizontal: 10,
  },
  volumeContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  volume: {
    fontSize: 20,
    color: 'white',
  },
  totalContainer: {
    marginTop: 35,
    alignItems: 'center',
  },
  total: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    height: 50,
    flex: 1,
    borderColor: '#87CEFA',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    color: 'white',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#87CEFA',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginLeft: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
