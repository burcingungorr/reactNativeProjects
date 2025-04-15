import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import Input from '../../components/AuthComponent/Input';
import SignButton from '../../components/AuthComponent/SignButton';
import { RadioButton } from 'react-native-paper';
import Slider from '@react-native-community/slider';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Geçersiz e-posta adresi')
    .required('E-posta alanı boş bırakılamaz'),
  username: Yup.string()
    .min(3, 'Kullanıcı adı en az 3 karakter olmalıdır')
    .required('Kullanıcı adı alanı boş bırakılamaz'),
  password: Yup.string()
    .min(6, 'Şifre en az 6 karakter olmalıdır')
    .required('Şifre alanı boş bırakılamaz'),
  age: Yup.number()
  .min(18, 'Yaş 18 veya daha büyük olmalıdır')
  .required('Yaş alanı boş bırakılamaz')
  .positive('Yaş pozitif olmalıdır')
  .integer('Yaş bir tam sayı olmalıdır'),
  height: Yup.number()
    .min(50, 'Boy 50 cm veya daha büyük olmalıdır')
    .required('Boy alanı boş bırakılamaz')
    .positive('Boy pozitif olmalıdır')
    .integer('Boy bir tam sayı olmalıdır'),
  weight: Yup.number()
    .min(10, 'Kilo 10 kg veya daha büyük olmalıdır')
    .required('Kilo alanı boş bırakılamaz')
    .positive('Kilo pozitif olmalıdır'),
  targetMl: Yup.number()
    .required('Hedef ml alanı boş bırakılamaz'),
});

const Sign = ({ navigation }) => {
  const [gender, setGender] = useState('male');
  const [targetMl, setTargetMl] = useState(2000);

  const handleSignUp = async (formValues) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        formValues.email,
        formValues.password
      );

      await firestore().collection('users').doc(userCredential.user.uid).set({
        email: formValues.email,
        username: formValues.username,
        gender,
        age: formValues.age,
        height: formValues.height,
        weight: formValues.weight,
        targetMl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      showMessage({
        message: 'Kayıt başarılı!',
        type: 'success',
      });

      navigation.goBack();
    } catch (error) {
      showMessage({
        message: `Bir hata oluştu: ${error.message}`,
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
        <Text style={styles.title}>WATER </Text>
        <Text style={styles.title}> REMINDER</Text>           
         <Text style={styles.subtitle}>KAYIT OL</Text>
          </View>

          <Formik
            initialValues={{ 
              email: '', 
              username: '', 
              password: '', 
              age: '', 
              height: '', 
              weight: '', 
              targetMl: 2000 
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                <Input
                  placeholder="E-posta"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <Input
                  placeholder="Kullanıcı Adı"
                  value={values.username}
                  onChangeText={handleChange('username')}
                />
                {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

                <Input
                  placeholder="Şifre"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <Text style={styles.label}>Cinsiyet</Text>
                <View style={styles.radioGroup}>
                  <View style={styles.radioOption}>
                    <RadioButton
                      value="male"
                      status={gender === 'male' ? 'checked' : 'unchecked'}
                      onPress={() => setGender('male')}
                      color="#4A90E2"
                    />
                    <Text style={styles.radioLabel}>Erkek</Text>
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton
                      value="female"
                      status={gender === 'female' ? 'checked' : 'unchecked'}
                      onPress={() => setGender('female')}
                      color="#4A90E2"
                    />
                    <Text style={styles.radioLabel}>Kadın</Text>
                  </View>
                </View>

                <Input
                  placeholder="Yaş"
                  keyboardType="numeric"
                  value={values.age}
                  onChangeText={handleChange('age')}
                />
                {touched.age && errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

                <Input
                  placeholder="Boy (cm)"
                  keyboardType="numeric"
                  value={values.height.toString()}
                  onChangeText={handleChange('height')}
                />
                {touched.height && errors.height && <Text style={styles.errorText}>{errors.height}</Text>}

                <Input
                  placeholder="Kilo (kg)"
                  keyboardType="numeric"
                  value={values.weight}
                  onChangeText={handleChange('weight')}
                />
                {touched.weight && errors.weight && <Text style={styles.errorText}>{errors.weight}</Text>}

                <Text style={styles.label}>Günlük Hedef: {targetMl} ML</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={100}
                  maximumValue={5000}
                  step={100}
                  value={targetMl}
                  onValueChange={setTargetMl}
                  minimumTrackTintColor="#4A90E2"
                  maximumTrackTintColor="#d3d3d3"
                  thumbTintColor="#4A90E2"
                />

             

                <View style={styles.loginContainer}>
                <SignButton 
                  theme="primary" 
                  title="Kayıt Ol" 
                  onPress={handleSubmit} 
                  style={styles.signButton}
                />
                  <Text style={styles.loginText}>Hesabınız var mı?</Text>
                  <SignButton 
                    theme="secondary" 
                    title="Giriş Yap" 
                    onPress={() => navigation.goBack()} 
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    backgroundColor:'#87CEFA',
    padding:10,
    borderRadius:30

  },
  subtitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    margin:20
  },
  formContainer: {
    width: '100%',
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    justifyContent:'center',
    textAlign:'center',

  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 15,
  alignItems:'center',
    textAlign:'center',
    justifyContent:'center'
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    
  },
  radioLabel: {
    color: 'white',
    marginLeft: 5,
  

  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginBottom: 10,
  },
  signButton: {

    marginTop: 20,
  },
  loginContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    marginBottom: 15,
    marginTop: 15,

  },
});

export default Sign;