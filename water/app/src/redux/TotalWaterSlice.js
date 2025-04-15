import { createSlice } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; 

const initialState = {
  dailyWaterIntakes: {},
  targetWaterIntake: 2000, 
  totalWaterIntake: 0, 
};

const totalWaterSlice = createSlice({
  name: 'totalWater',
  initialState,
  reducers: {
    setTotalWaterIntake: (state, action) => {
      state.totalWaterIntake = action.payload;
    },
    addWater: (state, action) => {
      const today = new Date().toISOString().split('T')[0]; 

      if (!state.dailyWaterIntakes[today]) {
        state.dailyWaterIntakes[today] = 0;
      }

      const waterAmount = parseFloat(action.payload);
      if (isNaN(waterAmount)) {
        console.error("Geçersiz su miktarı:", action.payload);
      } else {
        state.totalWaterIntake += waterAmount;
        state.dailyWaterIntakes[today] += waterAmount;

        const userId = auth().currentUser?.uid;
        if (userId) {
          const userDocRef = firestore().collection('users').doc(userId);

          userDocRef.set({
            [today]: state.dailyWaterIntakes[today], 
          }, { merge: true }).then(() => {
            console.log("Su miktarı Firestore'a kaydedildi.");
          }).catch((error) => {
            console.error("Firestore hatası:", error);
          });
        } else {
          console.error("Kullanıcı kimliği alınamadı.");
        }
      }
    },
    resetWater: (state) => {
      const today = new Date().toISOString().split('T')[0]; 
      state.dailyWaterIntakes[today] = 0;
      state.totalWaterIntake = 0; 

      const userId = auth().currentUser?.uid;
      if (userId) {
        const userDocRef = firestore().collection('users').doc(userId);

        userDocRef.set({
          totalWaterIntake: state.totalWaterIntake, 
          [today]: 0, 
        }, { merge: true }).then(() => {
          console.log("Su miktarı Firestore'a sıfırlandı.");
        }).catch((error) => {
          console.error("Firestore hatası:", error);
        });
      } else {
        console.error("Kullanıcı kimliği alınamadı.");
      }
    },
  },
});

export const fetchTotalWaterIntake = () => async (dispatch) => {
  const userId = auth().currentUser?.uid;
  if (userId) {
    try {
      const userDocRef = firestore().collection('users').doc(userId);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        const data = userDoc.data();
        const today = new Date().toISOString().split('T')[0]; 
        const totalWater = data[today] || 0; 
        dispatch(setTotalWaterIntake(totalWater));
        console.log("Total water intake Firestore'dan alındı:", totalWater);
      } else {
        console.log("Kullanıcı verisi bulunamadı.");
      }
    } catch (error) {
      console.error("Firestore verisi alınırken hata:", error);
    }
  } else {
    console.error("Kullanıcı kimliği alınamadı.");
  }
};

export const { addWater, resetWater, setTotalWaterIntake } = totalWaterSlice.actions;

export default totalWaterSlice.reducer;
