import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Input from '../../component/Input';
import SignButton from '../../component/SignButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';


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
});

const Sign = ({ navigation }) => {
  const handleSignUp = async (formValues) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        formValues.email,
        formValues.password
      );

      await firestore().collection('users').doc(userCredential.user.uid).set({
        email: formValues.email,
        username: formValues.username,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      showMessage({
        message: 'Kayıt başarılı!',
        type: 'success',
      });

      navigation.goBack();
    } catch (error) {
      console.log('Hata:', error.message);
      showMessage({
        message: `Bir hata oluştu: ${error.message}`,
        type: 'danger',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>codetalks</Text>
      <Text style={styles.container_title}>KAYIT</Text>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <View style={styles.inputContainer}>
            <Input
              placeholder='E-posta'
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <Input
              placeholder='Kullanıcı Adı'
              value={values.username}
              onChangeText={handleChange('username')}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <Input
              placeholder='Şifre'
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <SignButton theme='primary' title='Kayıt' onPress={handleSubmit} />
          </View>
        )}
      </Formik>
      <Text style={styles.container_text}>Hesabın varsa</Text>
      <SignButton theme='secondary' title='Giriş' onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6347',
  },
  inputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 75,
  },
  container_title: {
    color: 'white',
    fontSize: 25,
    margin: 20,
  },
  container_text: {
    color: 'white',
    fontSize: 15,
  },
  errorText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 8,
  },
});
